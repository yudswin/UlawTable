import { Tooltip } from 'antd';

interface TimeInfoProps {
    index: number
}

function indexToTime(index: number): string {
    const morningStartHour = 8;
    const afternoonStartHour = 13;
    const sessionDurationMinutes = 50;

    let startHour, startMinute, period;

    if (index >= 1 && index <= 6) {
        period = "Sáng";
        startHour = morningStartHour + Math.floor((index - 1) * sessionDurationMinutes / 60);
        startMinute = ((index - 1) * sessionDurationMinutes) % 60;
    } else if (index >= 7 && index <= 16) {
        period = "Chiều";
        startHour = afternoonStartHour + Math.floor((index - 7) * sessionDurationMinutes / 60);
        startMinute = ((index - 7) * sessionDurationMinutes) % 60;
    } else {
        return "Invalid index";
    }

    const endHour = startHour + Math.floor((startMinute + sessionDurationMinutes) / 60);
    const endMinute = (startMinute + sessionDurationMinutes) % 60;

    const formatTime = (hour: number, minute: number) =>
        `${hour.toString().padStart(2, '0')}h${minute.toString().padStart(2, '0')}`;

    const startTime = formatTime(startHour, startMinute);
    const endTime = formatTime(endHour, endMinute);

    return `${period} ${startTime} - ${endTime}`;
}

const TimeInfo: React.FC<TimeInfoProps> = ({ index }) => {
    return (
        <Tooltip arrow={false} placement='right' title={indexToTime(index)}>
            <div style={{
                // background: 'red'
                
            }}>{index}</div>
        </Tooltip>
    )
}

export default TimeInfo
