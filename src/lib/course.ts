import { ClassType, WeekDate } from "./schedule";

export interface CourseInfo {
    id: number;
    periodsCount: number;
    category: ClassType;
    date: WeekDate[];
    startPeriod: number[];
    startWeek: number[];
    location: string[];
    isActive: boolean;
}

export interface Course {
    courseID: string;
    courseName: string;
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
        const date = [parseData[4 + offset] as WeekDate];
        const startPeriodString = parseData[5 + offset];
        const location = [parseData[6 + offset]];
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
            id: offset / step, // Assign id using the index
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
            info.date.some(date => newInfo.date.includes(date)) &&
            info.startPeriod.some(period => newInfo.startPeriod.includes(period)) &&
            info.startWeek.some(week => newInfo.startWeek.includes(week)) &&
            info.category === newInfo.category &&
            info.location.some(loc => newInfo.location.includes(loc))
        );

        if (existingInfoIndex !== -1) {
            const existingInfo = mergedInfos[existingInfoIndex];
            mergedInfos[existingInfoIndex] = {
                ...existingInfo,
                periodsCount: newInfo.periodsCount || existingInfo.periodsCount,
                date: [...new Set([...existingInfo.date, ...newInfo.date])],
                startPeriod: [...new Set([...existingInfo.startPeriod, ...newInfo.startPeriod])],
                startWeek: [...new Set([...existingInfo.startWeek, ...newInfo.startWeek])],
                location: [...new Set([...existingInfo.location, ...newInfo.location])],
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