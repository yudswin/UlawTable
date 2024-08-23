import React from 'react';
import { Table, Button } from 'antd';
import { Course } from '@/lib/course';

interface CourseListProps {
    courses: Course[];
    onDeleteCourse: (courseID: string) => void;
}

const CourseList: React.FC<CourseListProps> = ({ courses, onDeleteCourse }) => {
    const columns = [
        { title: 'Course ID', dataIndex: 'courseID', key: 'courseID' },
        { title: 'Course Name', dataIndex: 'courseName', key: 'courseName' },
        { title: 'Periods Count', dataIndex: 'periodsCount', key: 'periodsCount' },
        { title: 'Category', dataIndex: 'category', key: 'category' },
        { title: 'Date', dataIndex: 'date', key: 'date' },
        { title: 'Start Period', dataIndex: 'startPeriod', key: 'startPeriod' },
        { title: 'Start Week', dataIndex: 'startWeek', key: 'startWeek' },
        { 
            title: 'Location', 
            dataIndex: 'location', 
            key: 'location', 
            render: (locations: string[]) => locations.join(', ') 
        },
        { 
            title: 'Lecturer', 
            dataIndex: 'lecturer', 
            key: 'lecturer', 
            render: (lecturers: string[]) => lecturers.join(', ') 
        },
        { 
            title: 'Active', 
            dataIndex: 'isActive', 
            key: 'isActive', 
            render: (isActive: boolean) => (isActive ? 'Yes' : 'No') 
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

    return <Table dataSource={courses} columns={columns} rowKey="courseID" />;
};

export default CourseList;