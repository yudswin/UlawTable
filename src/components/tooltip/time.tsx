import { indexToTime } from '@/lib/schedule';
import { Tooltip } from 'antd';

interface TimeInfoProps {
    index: number
}

const TimeInfo: React.FC<TimeInfoProps> = ({ index }) => {
    return (
        <Tooltip arrow={false} placement='right' title={indexToTime(index)}>
            <div style={{
            }}>{index}</div>
        </Tooltip>
    )
}

export default TimeInfo
