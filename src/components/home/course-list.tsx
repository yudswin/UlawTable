import React from 'react';
import { Table, Button } from 'antd';
import { Course, CourseInfo } from '@/lib/course';

interface CourseListProps {
    courses: Course[];
    onDeleteCourse: (courseID: string) => void;
    style?: React.CSSProperties; // Add style prop
}

const getRandomHexColor = (): string => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
};


const CourseList: React.FC<CourseListProps> = ({ courses, onDeleteCourse, style }) => {
    const columns = [
        {
            title: 'Index',
            key: 'index',
            render: (text: any, record: Course, index: number) => index + 1,
        },
        {
            title: 'Course ID',
            dataIndex: 'courseID',
            key: 'courseID',
        },
        {
            title: 'Course Name',
            dataIndex: 'courseName',
            key: 'courseName',
        },
        {
            title: 'Action',
            key: 'action',
            render: (text: any, record: Course) => (
                <Button type="link" onClick={() => onDeleteCourse(record.courseID)}>
                    Delete
                </Button>
            ),
        },
    ];

    const expandedRowRender = (record: Course) => {
        const expandedColumns = [
            {
                title: 'Date',
                key: 'date',
                render: (text: any, record: CourseInfo) => record.date.join(', '),
            },
            {
                title: 'Start Period',
                key: 'startPeriod',
                render: (text: any, record: CourseInfo) => record.startPeriod.join(', '),
            },
            {
                title: 'Start Week',
                key: 'startWeek',
                render: (text: any, record: CourseInfo) => record.startWeek.join(', '),
            },
            {
                title: 'Category',
                key: 'category',
                dataIndex: 'category',
            },
            {
                title: 'Location',
                key: 'location',
                render: (text: any, record: CourseInfo) => record.location.join(', '),
            },
            {
                title: 'View',
                key: 'view',
                render: (text: any, record: CourseInfo) => (
                    <Button type="link" onClick={() => console.log(record)}>
                        View
                    </Button>
                ),
            },
        ];

        return <Table columns={expandedColumns} dataSource={record.infos} pagination={false} rowKey={(info: CourseInfo) => info.id} />;
    };

    const rowColors = courses.map(() => getRandomHexColor());

    return (
        <Table
            dataSource={courses}
            columns={columns}
            rowKey="courseID"
            pagination={false}
            expandable={{ expandedRowRender }}
            style={style} // Apply the style prop here
            rowClassName={(record, index) => `row-${index}`}
        />
    );
};

export default CourseList;