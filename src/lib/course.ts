import { ClassType, CourseSchedule, getIndexOfWeek } from "./schedule";

export interface CourseInfo {
    id: number;
    periodsCount: number;
    category: ClassType;
    date: string;
    startPeriod: number[];
    startWeek: number[];
    location: string;
    isActive: boolean;
}

export interface Course {
    courseID: string;
    courseName: string;
    color?: string;
    colorSecondary?: string;
    infos: CourseInfo[];
}


function mapObject(parseData: string[]): Course[] {
    let courses: Course[] = [];
    const step = 8; // Correct step for each 
    if (parseData.length % step !== 0) throw Error("Missing data");
    let totalCourse: number = parseData.length / step;
    alert(totalCourse + ' môn sẽ được thêm vào!');
    let offset = 0;

    while (!(offset / step == totalCourse)) {
        const courseID = parseData[0 + offset];
        const courseName = parseData[1 + offset];
        const periodsCount = parseInt(parseData[2 + offset]);
        const category = parseData[3 + offset] as ClassType;
        const date = parseData[4 + offset];
        const startPeriodString = parseData[5 + offset];
        const location = parseData[6 + offset];
        const startWeekString = parseData[7 + offset];
        const isActive = false;
        const startPeriod: number[] = [];
        for (let i = 0; i < startPeriodString.length; i++) {
            if (startPeriodString[i] !== '-') {
                startPeriod.push(i + 1);
            }
        }

        const startWeek: number[] = [];
        for (let i = 0; i < startWeekString.length; i++) {
            if (startWeekString[i] !== '_') {
                startWeek.push(i + 1);
            }
        }

        const courseInfo: CourseInfo = {
            id: offset / step,
            periodsCount,
            category,
            date,
            startPeriod,
            location,
            startWeek,
            isActive
        };

        courses.push({
            courseID,
            courseName,
            infos: [courseInfo]
        });
        offset += 8;
    }

    return courses;
}

export function parseCourse(rawInput: string): Course[] {
    let parseData = rawInput
        .trim()
        .replaceAll(/[\u00a0]/g, " ")       // replace invisible characters (U+00a0) with spaces
        .replaceAll(/[ "]{3,}/g, "___")     // replace 3 adjacent spaces and double quotes with _
        .split(/[ "]*\t[ "]*/);
    parseData = parseData.filter(item => item !== "" && item !== undefined);

    return mapObject(parseData);
}

export const mergeCourse = (existingCourse: Course, newCourse: Course): Course => {
    const mergedInfos = [...existingCourse.infos];

    newCourse.infos.forEach(newInfo => {
        const existingInfoIndex = mergedInfos.findIndex(info =>
            info.date === newInfo.date &&
            info.startPeriod.some(period => newInfo.startPeriod.includes(period)) &&
            info.startWeek.some(week => newInfo.startWeek.includes(week)) &&
            info.category === newInfo.category &&
            info.location === newInfo.location
        );

        if (existingInfoIndex !== -1) {
            const existingInfo = mergedInfos[existingInfoIndex];
            mergedInfos[existingInfoIndex] = {
                ...existingInfo,
                periodsCount: newInfo.periodsCount || existingInfo.periodsCount,
                date: newInfo.date || existingInfo.date,
                startPeriod: [...new Set([...existingInfo.startPeriod, ...newInfo.startPeriod])],
                startWeek: [...new Set([...existingInfo.startWeek, ...newInfo.startWeek])],
                location: newInfo.location || existingInfo.location,
                isActive: newInfo.isActive || existingInfo.isActive
            };
        } else {
            mergedInfos.push(newInfo);
        }
    });

    return {
        ...existingCourse,
        courseName: newCourse.courseName || existingCourse.courseName,
        infos: mergedInfos
    };
};


export function generateCourseMap(courseList: Course[]): CourseSchedule[][] {
    let weekCourses: CourseSchedule[][] = Array.from({ length: 22 }, () => []);

    courseList.forEach(course => {
        course.infos.forEach(info => {
            info.startWeek.forEach(week => {
                if (week >= 1 && week <= 22) {
                    const courseSchedule: CourseSchedule = {
                        courseInfo: course,
                        location: info.location,
                        date: getIndexOfWeek(info.date),
                        periods: info.startPeriod
                    };
                    weekCourses[week - 1].push(courseSchedule);
                }
            });
        });
    });

    return weekCourses;
}
