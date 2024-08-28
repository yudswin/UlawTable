import { useEffect, useState } from 'react';
import { CourseTimetable, CourseInput, CourseList } from '@/components/home';
import { ConfigProvider } from 'antd';
import { Course, mergeCourse, parseCourse } from '@/lib/course';
import { InputHandler } from '@/components/home/course-input';

export const Home = () => {
  const [courseList, setCourseList] = useState<Course[]>([]);
  const [hasDuplicates, setHasDuplicates] = useState(false);

  const handleSubmit: InputHandler = (rawInputString: string) => {
    if (!rawInputString) return;
    try {
      const newCourses: Course[] = parseCourse(rawInputString);
      const updatedCourseList = [...courseList];
      let hasDuplicates = false;

      newCourses.forEach(newCourse => {
        const existingCourseIndex = updatedCourseList.findIndex(
          course => course.courseID === newCourse.courseID
        );

        if (existingCourseIndex !== -1) {
          const existingCourse = updatedCourseList[existingCourseIndex];
          const isDuplicate = newCourse.infos.some(newInfo =>
            existingCourse.infos.some(existingInfo =>
              existingInfo.date.some(date => newInfo.date.includes(date)) &&
              existingInfo.startPeriod.some(period => newInfo.startPeriod.includes(period)) &&
              existingInfo.startWeek.some(week => newInfo.startWeek.includes(week)) &&
              existingInfo.category === newInfo.category &&
              existingInfo.location.some(loc => newInfo.location.includes(loc))
            )
          );

          if (isDuplicate) {
            hasDuplicates = true;
          } else {
            updatedCourseList[existingCourseIndex] = mergeCourse(existingCourse, newCourse);
          }
        } else {
          updatedCourseList.push(newCourse);
        }
      });

      setCourseList(updatedCourseList);
      setHasDuplicates(hasDuplicates);
    } catch (error) {
      console.error('Error parsing courses:', error);
    }
  };

  const handleDeleteCourse = (courseID: string) => {
    setCourseList(courseList.filter(course => course.courseID !== courseID));
  };

  const handleDeleteAll = () => {
    setCourseList([]);
  };

  const [deleteAllVisible, setDeleteAllVisible] = useState(false);

  useEffect(() => {
    if (courseList.length > 0) {
      setDeleteAllVisible(true)
    } else setDeleteAllVisible(false)
  }, [courseList])


  return (
    <div className='container'>
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
        <CourseInput inputHandler={handleSubmit} onDeleteAll={handleDeleteAll} isDeleteVisible={deleteAllVisible} />
        {hasDuplicates && <p style={{ color: 'red' }}>Warning: Duplicate course IDs found.</p>}
        <CourseList
          courses={courseList}
          onDeleteCourse={handleDeleteCourse}
          style={{ overflowX: 'auto' }}
        />
        <CourseTimetable />
      </ConfigProvider>
    </div>
  );
};