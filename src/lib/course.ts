import { ClassType, WeekDate } from "./schedule";

export interface Course {
    courseID: string;
    courseName: string;
    periodsCount: number;
    category: ClassType;
    date: WeekDate[];
    startPeriod: number[];
    startWeek: number[];
    location: string[];
    lecturer: string[];
    isActive: boolean;
}

function mapObject(parseData: string[]): Course {
    const step = 20; // Correct step value
    if (parseData.length % step !== 0) throw Error("Missing data");

    const courseID = parseData[0];
    const courseName = parseData[2];
    const periodsCount = parseInt(parseData[6]);
    const category = parseData[7] as ClassType;
    const date = [parseData[8] as WeekDate];
    const startPeriodString = parseData[9];
    const location = [parseData[14]];
    const startWeekString = parseData[19];
    const lecturer = [parseData[10]];
    const isActive = parseData[11] === 'true';

    const startPeriod = startPeriodString.split('').map((char, index) => char === '-' ? 0 : index + 1).filter(num => num !== 0);
    const startWeek = startWeekString.split('').map((char, index) => char === '_' ? 0 : index + 1).filter(num => num !== 0);

    return {
        courseID,
        courseName,
        periodsCount,
        category,
        date,
        startPeriod,
        startWeek,
        location,
        lecturer,
        isActive
    };
}

export function parseCourse(rawInput: string): Course {
    const parseData = rawInput
        .trim()
        .replaceAll(/[\u00a0]/g, " ") // replace invisible characters (U+00a0) with spaces
        .replaceAll(/[ "]{3,}/g, "___") // replace 3 adjacent spaces and double quotes with _
        .split(/[ "]*\t[ "]*/);

    console.log(parseData); // Log parseData to debug

    return mapObject(parseData);
}