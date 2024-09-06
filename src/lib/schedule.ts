import { Course } from "./course";

export const vietnameseDays = [
    "Chủ Nhật",
    "Thứ Hai",
    "Thứ Ba",
    "Thứ Tư",
    "Thứ Năm",
    "Thứ Sáu",
    "Thứ Bảy"
]


export function getCourseLocation(course: Course, dateByIndex: number): string{
    const location = course.infos.find(c => c.date == vietnameseDays[dateByIndex])?.location
    if (location === undefined) throw new Error("not found location")
    return location
}

export function getIndexOfWeek(date: string): number {
    const index = vietnameseDays.indexOf(date);
    // alert(index)
    if (index == -1) throw new Error("Error string (date): " + date)
    return index + 1
}

export type ClassType = "Lý thuyết" | "Practical" | "General";

export interface CourseSchedule {
    courseInfo: Course;
    date: number;
    location: string;
    periods: number[];
}

const pastelColors: string[] = [
    "#fbf8cb",
    "#fde4ce",
    "#ffcfd2",
    "#f0c0e8",
    "#cebaef",
    "#a3c3f2",
    "#8fdbf3",
    '#8eecf4',
    '#98f5e2',
    '#bafbc1'
]

const secondaryPastelColors: string[] = [
    '#fbf8cb',
    '#ffeccf',
    '#ffcfcf',
    '#ffccef',
    '#e3c6ff',
    '#abc2ff',
    '#96d7ff',
    '#94e8ff',
    '#9efff8',
    '#bcffcc'
];

export function getColor(index: number): string {
    const wrappedIndex = index % pastelColors.length;
    return pastelColors[wrappedIndex];
}

export function getSecondaryColor(index: number): string {
    const wrappedIndex = index % secondaryPastelColors.length;
    return secondaryPastelColors[wrappedIndex];
}

