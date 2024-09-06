import React from 'react';
import { Table, Button, ConfigProvider } from 'antd';
import { Course, CourseInfo } from '@/lib/course';
import { WeekTable } from '@/components/home';


interface CourseListProps {
    courses: Course[];
    onDeleteCourse: (courseID: string) => void;
    style?: React.CSSProperties; // Add style prop
}

const weekRender = (record: number[]) => {
    return <WeekTable numbers={record}/>
};

const CourseList: React.FC<CourseListProps> = ({ courses, onDeleteCourse, style }) => {


    const columns = [
        {
            title: <span style={{ whiteSpace: 'nowrap' }}>Số thứ tự</span>,
            key: 'index',
            render: (text: any, record: Course, index: number) => index + 1,
        },
        {
            title: <span style={{ whiteSpace: 'nowrap' }}>Mã môn học</span>,
            dataIndex: 'courseID',
            key: 'courseID',
        },
        {
            title: <span style={{ whiteSpace: 'nowrap' }}>Tên môn học</span>,
            dataIndex: 'courseName',
            key: 'courseName',
        },
        // {
        //     title: 'View',
        //     key: 'view',
        //     render: (text: any, record: CourseInfo) => (
        //         <Button type="link" onClick={() => console.log(record)}>
        //             View
        //         </Button>
        //     ),
        // },
        {
            title: 'Chức năng',
            key: 'action',
            render: (text: any, record: Course) => (
                <Button type="link" onClick={() => onDeleteCourse(record.courseID)}>
                    Xoá môn
                </Button>
            ),
        },
    ];

    const expandedRowRender = (record: Course) => {
        const expandedColumns = [
            {
                title: 'Ngày',
                key: 'date',
                render: (text: any, record: CourseInfo) => <span style={{ whiteSpace: 'nowrap' }}>{record.date}</span>
            },
            {
                title: 'Tiết học',
                key: 'startPeriod',
                render: (text: any, record: CourseInfo) => <span style={{ whiteSpace: 'nowrap' }}>{record.startPeriod[0] + ' → ' + record.startPeriod[record.startPeriod.length - 1]}</span>,
            },
            {
                title: 'Tuần học',
                key: 'startWeek',
                render: (text: any, record: CourseInfo) => weekRender(record.startWeek),
            },
            {
                title: 'Loại',
                key: 'category',
                dataIndex: 'category',
            },
            {
                title: 'Phòng học',
                key: 'location',
                render: (text: any, record: CourseInfo) => record.location,
            },
            // {
            //     title: 'View',
            //     key: 'view',
            //     render: (text: any, record: CourseInfo) => (
            //         <Button type="link" onClick={() => console.log(record)}>
            //             View
            //         </Button>
            //     ),
            // },
        ];

        // function getRandomInt(max: number) {
        //     return Math.floor(Math.random() * max);
        // }

        return <ConfigProvider
            theme={{
                components: {
                    Table: {
                        headerBorderRadius: 0,
                        colorBgContainer: record.colorSecondary,
                        headerSplitColor: '#595959'
                    }
                },
            }}
        >
            <Table
                showHeader={true}
                columns={expandedColumns}
                dataSource={record.infos}
                pagination={false}
                rowKey={(info: CourseInfo) => info.id}
                rowHoverable={false}
            />
        </ConfigProvider>
    };


    return (
        <ConfigProvider
            theme={{
                components: {
                    Table: {
                        // headerBg: '#333333',
                        // headerColor: '#ffffff',
                        // rowExpandedBg: '#333333',
                        padding: 7,
                        // headerSplitColor: '#333333',
                    }
                },
            }}
        >
            <Table
                dataSource={courses}
                columns={columns}
                rowKey="courseID"
                pagination={false}
                expandable={{
                    expandedRowRender,
                    // defaultExpandedRowKeys: courses.map(course => course.courseID),  // Automatically expand all rows
                    // expandIconColumnIndex: -1,
                }}
                style={style}
                onRow={(record) => ({
                    style: {
                        backgroundColor: record.color || 'transparent',
                        whiteSpace: 'nowrap'
                    },
                })}
                rowHoverable={false}
            />
        </ConfigProvider>
    );
};

export default CourseList;