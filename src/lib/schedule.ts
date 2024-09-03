export type WeekDate = "Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat" | "Sun";

export type ClassType = "Lý thuyết" | "Practical" | "General"

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
