import { Course } from "@/lib/course";

interface TimeTableProps {
    courses?: Course[];
}

const TimeTable: React.FC<TimeTableProps> = ({ courses }) => {
    const periods = 16;
    const daysOfWeek = 7;

    // Create a 2D array to represent the time table
    const timeTable: Course[][] = [];
    for (let i = 0; i < periods; i++) {
        timeTable.push([]);
        for (let j = 0; j < daysOfWeek; j++) {
            timeTable[i].push(null);
        }
    }


    courses?.forEach((course) => {
        timeTable[course.period - 1][course.day - 1] = course;
    });

    return (
        <table>
            <thead>
                <tr>
                    <th>Period</th>
                    <th>Mon</th>
                    <th>Tue</th>
                    <th>Wed</th>
                    <th>Thu</th>
                    <th>Fri</th>
                    <th>Sat</th>
                    <th>Sun</th>
                </tr>
            </thead>
            <tbody>
                {timeTable.map((period, index) => (
                    <tr key={index}>
                        <td>{index + 1}</td>
                        {period.map((course, dayIndex) => (
                            <td key={dayIndex}>
                                {course ? course.name : ''}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default TimeTable;