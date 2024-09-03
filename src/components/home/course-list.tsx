import React from 'react';
import { Table, Button, ConfigProvider, TableProps } from 'antd';
import { Course, CourseInfo } from '@/lib/course';
import { getColor, getSecondaryColor } from '@/lib/schedule';

interface CourseListProps {
    courses: Course[];
    onDeleteCourse: (courseID: string) => void;
    style?: React.CSSProperties; // Add style prop
}

// const antdTableProp = (record: Course, index: number): row => {
//     let 
// }

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

        // function getRandomInt(max: number) {
        //     return Math.floor(Math.random() * max);
        // }

        return <ConfigProvider
            theme={{
                components: {
                    Table: {
                        headerBorderRadius: 0,
                        colorBgContainer: record.colorSecondary
                    }
                },
            }}
        >
            <Table
                showHeader={false}
                columns={expandedColumns}
                dataSource={record.infos}
                pagination={false}
                rowKey={(info: CourseInfo) => info.id}
            />
        </ConfigProvider>
    };


    return (
        <ConfigProvider
            theme={{
                components: {
                    Table: {
                        headerBg: '#333333',
                        headerColor: '#ffffff',
                        // rowExpandedBg: '#333333',
                        headerSplitColor: '#333333',
                        colorSplit: '#red',
                    }
                },
            }}
        >
            <Table
                dataSource={courses}
                columns={columns}
                rowKey="courseID"
                pagination={false}
                expandable={{ expandedRowRender }}
                style={style}
                onRow={(record) => ({
                    style: {
                        backgroundColor: record.color || 'transparent',
                    },
                })}
            />
        </ConfigProvider>
    );
};

export default CourseList;