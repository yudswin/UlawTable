import { Fragment, useEffect, useState } from 'react';
import { TimeTable, CourseInput, CourseList } from '@/components/home';
import { ConfigProvider } from 'antd';
import { Course, generateCourseMap, mergeCourse, parseCourse } from '@/lib/course';
import { InputHandler } from '@/components/home/course-input';
import { CourseSchedule, getColor, getSecondaryColor } from '@/lib/schedule';
import Header from '@/components/layout/header'
import Footer from '@/components/layout/footer';
import { customJSONStringify } from '@/utilities/alert-utils';
import WeekSelection from '@/components/home/week-selection';

export const Home = () => {
  const [courseList, setCourseList] = useState<Course[]>([]);
  const [weekList, setWeekList] = useState<CourseSchedule[][]>([]);
  const [hasDuplicates, setHasDuplicates] = useState(false);
  const [selectedWeek, setSelectedWeek] = useState<string | null>("1");

  const weekOptions = Array.from({ length: 22 }, (_, i) => ({
    value: `week-${i + 1}`,
    label: `Tuần ${i + 1}`,
  }));

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
              existingInfo.date === newInfo.date &&
              existingInfo.startPeriod.some(period => newInfo.startPeriod.includes(period)) &&
              existingInfo.startWeek.some(week => newInfo.startWeek.includes(week)) &&
              existingInfo.category === newInfo.category &&
              existingInfo.location == newInfo.location
            )
          );

          if (isDuplicate) {
            hasDuplicates = true;
          } else {
            updatedCourseList[existingCourseIndex] = mergeCourse(existingCourse, newCourse);
          }
        } else {
          newCourse.color = getColor(updatedCourseList.length);
          newCourse.colorSecondary = getSecondaryColor(updatedCourseList.length)
          updatedCourseList.push(newCourse);
        }
      });

      setCourseList(updatedCourseList);
      setHasDuplicates(hasDuplicates);
    } catch (error) {
      console.error('Error parsing courses:', error);
    }
  };

  // Test function
  const handleMapWeek = () => {
    setWeekList(generateCourseMap(courseList))
    // alert(customJSONStringify(weekList[0]))
    console.log(weekList)
  }


  const handleDeleteCourse = (courseID: string) => {
    setCourseList(courseList.filter(course => course.courseID !== courseID));
  };

  const handleDeleteAll = () => {
    setCourseList([]);
  };

  const [functionVisible, setFunctionVisible] = useState(false);

  useEffect(() => {
    if (courseList.length > 0) {
      setFunctionVisible(true)
    } else setFunctionVisible(false)
  }, [courseList])

  const handleWeekChange = (value: string) => {
    setSelectedWeek(value);
  };

  return (
    <>
      <Header />
      <div className='container'>
        <ConfigProvider
          wave={{ disabled: true }}
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
          <CourseInput inputHandler={handleSubmit} onDeleteAll={handleDeleteAll} onHandleWeek={handleMapWeek} isFunctionVisible={functionVisible} />
          {hasDuplicates && <p style={{ color: 'red' }}>Warning: Duplicate course IDs found.</p>}
          <CourseList
            courses={courseList}
            onDeleteCourse={handleDeleteCourse}
            style={{
              overflowX: 'auto',
            }}
          />
          <WeekSelection options={weekOptions} onChange={handleWeekChange} />
          {selectedWeek && <TimeTable courses={weekList[parseInt(selectedWeek.split('-')[1], 10) - 1]} />}
        </ConfigProvider>
      </div>
      <Footer />
    </>
  );
};