import { CourseSchedule } from '@/lib/schedule'
import { Col, Divider, Row, Tooltip } from 'antd'

interface ClassInfoProps {
    course: CourseSchedule
}

const ClassInfo: React.FC<ClassInfoProps> = ({ course }) => {
    return (
        <div style={{
            padding: '10px',
            color: 'black',
        }}>

            <div style={{
                fontWeight: 'bold',
                paddingBottom: '10px',
            }}>
                {course.courseInfo.courseName}
            </div>
            <div style={{
                display: 'flex',
                flexDirection: 'column'
            }}>
                <Row gutter={0} style={{ borderTop: '1px solid' }}>
                    <Col span={12} style={{ fontWeight: 'bold', whiteSpace: 'nowrap' }}>Lớp học phần:</Col>
                    <Col span={12}>{course.courseInfo.courseID}</Col>
                </Row>
                <Row gutter={0} key={course.courseInfo.infos[0].id} >
                    <Col span={12} style={{ fontWeight: 'bold', whiteSpace: 'nowrap' }}>Tín chỉ:</Col>
                    <Col span={12}>{course.courseInfo.infos[0].periodsCount}</Col>
                    <Col span={12} style={{ fontWeight: 'bold', whiteSpace: 'nowrap' }}>Loại HP:</Col>
                    <Col span={12}>{course.courseInfo.infos[0].category}</Col>
                    <Col span={12} style={{ fontWeight: 'bold', whiteSpace: 'nowrap' }}>Phòng:</Col>
                    <Col span={12}>{course.courseInfo.infos[0].location}</Col>
                    <Col span={12} style={{ fontWeight: 'bold', whiteSpace: 'nowrap' }}>Số tiết:</Col>
                    <Col span={12}>{course.courseInfo.infos[0].startPeriod.length}</Col>
                </Row>
                {course.courseInfo.infos.map((info, index) => (
                    <Row gutter={0} key={index} style={{ borderTop: '1px solid', paddingTop: '5px'}}>
                        <Col span={12} style={{ fontWeight: 'bold', whiteSpace: 'nowrap' }}>Thứ:</Col>
                        <Col span={12}>{info.date}</Col>
                        <Col span={12} style={{ fontWeight: 'bold', whiteSpace: 'nowrap' }}>Tuần học:</Col>
                        <Col span={12}>{info.startWeek.join(', ')}</Col>
                    </Row>
                ))}

            </div>
        </div>
    )
}

export default ClassInfo