import React, { useState } from 'react';
import { CourseTimetable, CourseInput, CourseList } from '@/components/home';
import { ConfigProvider } from 'antd';
import { Course, parseCourse } from '@/lib/course';
import { InputHandler } from '@/components/home/course-input';

export const Home = () => {
  const [courseList, setCourseList] = useState<Course[]>([]);
  const [hasDuplicates, setHasDuplicates] = useState(false);

  const handleSubmit: InputHandler = (rawInputString: string) => {
    if (!rawInputString) return;
    try {
      const newCourse = parseCourse(rawInputString);
      const isDuplicate = courseList.some(course => course.courseID === newCourse.courseID);
      if (isDuplicate) {
        setHasDuplicates(true);
      } else {
        setCourseList((prevCourseList) => [...prevCourseList, newCourse]);
        setHasDuplicates(false); // Reset the duplicate warning if a new course is added successfully
      }
    } catch (error) {
      console.error('Failed to add course:', error);
    }
  };

  const handleDeleteCourse = (courseID: string) => {
    setCourseList(courseList.filter(course => course.courseID !== courseID));
  };

  return (
    <div>
      <ConfigProvider
        theme={{
          components: {
            Button: {
              colorPrimary: '#333333',
              colorPrimaryHover: '#595959',
              colorPrimaryActive: '595959'
            },
            Input: {
              colorPrimary: '#333333',
              colorPrimaryHover: '#595959',
              colorPrimaryActive: '#595959'
            }
          },
        }}
      >
        <CourseInput inputHandler={handleSubmit} /> {/* Pass loading state */}
        {hasDuplicates && <p style={{ color: 'red' }}>Warning: Duplicate course IDs found.</p>}
        <CourseList courses={courseList} onDeleteCourse={handleDeleteCourse} />
        <CourseTimetable />
      </ConfigProvider>
    </div>
  );
};