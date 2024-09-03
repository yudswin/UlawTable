import React from 'react';

interface WeekTableProp {
    numbers: number[]
}

const WeekTable: React.FC<WeekTableProp> = ({ numbers }) => {
    const weekNumbers = Array.from({ length: 22 }, (_, index) => index + 1);

    return (
        <table>
            <tbody>
                <tr>
                    {weekNumbers.map((weekNumber) => (
                        <td
                            key={weekNumber}
                            style={{
                                backgroundColor: numbers.includes(weekNumber) ? '#333333' : 'white',
                                color: numbers.includes(weekNumber) ? 'white' : '',
                                padding: '2px',
                                textAlign: 'center',
                                fontSize: '8px',
                                fontVariantNumeric: 'tabular-nums'
                            }}
                        >
                            {weekNumber}
                        </td>
                    ))}
                </tr>
            </tbody>
        </table>
    );
};

export default WeekTable;