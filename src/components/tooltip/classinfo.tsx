import { CourseSchedule } from '@/lib/schedule'
import { Tooltip } from 'antd'

interface ClassInfoProps {
    course: CourseSchedule
}

const ClassInfo: React.FC<ClassInfoProps> = ({ course }) => {
    return (
        <div style={{
            width: '100%',
            height: '100%'
        }}>

            <Tooltip title="hi" style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                justifyContent: 'flex'
            }}>
                <div style={{
                    fontSize: '10px',
                    fontWeight: 'bold'
                }}>
                    {course.courseInfo.courseName}
                </div>
                <div>
                    hi
                </div>
            </Tooltip>
        </div>
    )
}

export default ClassInfo