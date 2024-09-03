import React, { useState } from 'react';

const Timetable = () => {
    // Mock data
    const [classes] = useState([
        { name: 'Math', date: 1, periods: [3, 4, 5] },
        { name: 'English', date: 2, periods: [3, 4, 5] },
        { name: 'Science', date: 3, periods: [6, 7] },
    ]);

    const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const periods = Array.from({ length: 16 }, (_, index) => index + 1);

    const renderCell = (row: any, col: any) => {
        const classForPeriod = classes.find(c => c.date === col && c.periods.includes(row));

        if (classForPeriod && classForPeriod.periods[0] === row) {
            return (
                <td key={`${row}-${col}`} rowSpan={classForPeriod.periods.length}>
                    {classForPeriod.name}
                </td>
            );
        } else if (classForPeriod) {
            return null; // Skip the rendering of this cell as it's covered by rowspan
        } else {
            return <td key={`${row}-${col}`}></td>;
        }
    };

    const renderRow = (period: any) => {
        return (
            <tr key={period}>
                <td>{period}</td>
                {daysOfWeek.map((_, index) => renderCell(period, index + 1))}
            </tr>
        );
    };

    return (
        <div style={{ margin: '5% 6%' }}>
            <table border={1} cellPadding={5} style={{
                width: '100%',
                textAlign: 'center',
                tableLayout: 'fixed' // Ensure all columns have the same width
            }}>
                <thead>
                    <tr>
                        <th style={{ width: '50px' }}>Period</th> {/* Fixed width for the Period column */}
                        {daysOfWeek.map((day, index) => (
                            <th key={index} style={{ width: `${100 / daysOfWeek.length}%` }}>{day}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {periods.map(period => renderRow(period))}
                </tbody>
            </table>
        </div>
    );
};

export default Timetable;
