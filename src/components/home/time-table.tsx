import { CourseSchedule, getCourseLocation, vietnameseDays } from '@/lib/schedule';
import TimeInfo from '../tooltip/time';
import { Tooltip } from 'antd';

interface TimetableProps {
    courses?: CourseSchedule[]
}

const Timetable: React.FC<TimetableProps> = ({ courses }) => {
    const periods = Array.from({ length: 16 }, (_, index) => index + 1);

    const renderCell = (coursePeriod: number, weekDate: number) => {
        const courseForPeriod = courses?.find(c => c.date === weekDate && c.periods.includes(coursePeriod));
        if (courseForPeriod && courseForPeriod.periods[0] === coursePeriod) {
            return (
                //{<div style={{ background: courseForPeriod.courseInfo.color }}></div>}
                <Tooltip color={courseForPeriod.courseInfo.color} title="">
                    <td key={`${coursePeriod}-${weekDate}`} rowSpan={courseForPeriod.periods.length} style={{
                        background: courseForPeriod.courseInfo.colorSecondary,
                        // border: `1px solid ${courseForPeriod.courseInfo.color}`
                    }}>
                        <div style={{
                            fontSize: '10px',
                            fontWeight: 'bold'
                        }}>
                            {courseForPeriod.courseInfo.courseName}
                        </div>
                        <div style={{
                            fontSize: '10px',
                            marginTop: '5px'
                        }}>
                            {courseForPeriod.location}
                        </div>
                    </td>
                </Tooltip>
            );
        } else if (courseForPeriod) {
            return null;
        } else {
            return <td key={`${coursePeriod}-${weekDate}`} style={{
            }}></td>;
        }
    };

    const renderRow = (period: any) => {
        const dayMapping = [2, 3, 4, 5, 6, 7, 1];
        return (
            <tr key={period}>
                <td style={{ background: '#fafafa', }}>{<TimeInfo index={period} />}</td>
                {dayMapping.map((date) => renderCell(period, date))}
                <td style={{ background: '#fafafa', }}>{<TimeInfo index={period} />}</td>
            </tr>
        );
    };

    return (
        <div style={{ margin: '5% 0', overflowX: 'auto' }}>
            <table border={1} cellPadding={3} style={{
                width: '100%',
                textAlign: 'center',
                borderColor: '#949494',
            }}>
                <thead>
                    <tr>
                        <th style={{ width: '50px', padding: '0 15px', background: '#949494', color: 'white' }}>Tiết</th>
                        {vietnameseDays.slice(1).concat(vietnameseDays[0]).map((day, index) => (
                            <th key={index} style={{ width: `${100 / vietnameseDays.length}%`, whiteSpace: 'nowrap', background: '#949494', color: 'white' }}>{day}</th>
                        ))}
                        <th style={{ width: '50px', padding: '0 15px', background: '#949494', color: 'white' }}>Tiết</th>
                    </tr>
                </thead>
                <tbody>
                    {periods.map(period => renderRow(period))}
                </tbody>
                <tfoot>
                    <tr>
                        <th style={{ width: '50px', padding: '0 15px', background: '#949494', color: 'white' }}></th>
                        {vietnameseDays.slice(1).concat(vietnameseDays[0]).map((day, index) => (
                            <th key={index} style={{ width: `${100 / vietnameseDays.length}%`, background: '#949494', color: 'white' }}>{day}</th>
                        ))}
                        <th style={{ width: '50px', padding: '0 15px', background: '#949494', color: 'white' }}></th>
                    </tr>
                </tfoot>
            </table>
            <span style={{
                fontFamily: 'Arial',
                color: '#333333',
                display: 'flex',
                justifyContent: 'center',
                whiteSpace: 'nowrap'
            }}>
                (1 tiết = 50 phút | Môn 4 tiết: học 2 tiết, nghỉ 15 phút | Môn 5 tiết: học 3 tiết, nghỉ 15 phút)
            </span>
        </div>
    );
};

export default Timetable;