import React, { useState } from "react";
import CourseNavigation from "../components/CoursePlayer/CourseNavigation";
import CoursePlayer from "../components/CoursePlayer/CoursePlayer";
import ProgressChart from "../components/CourseDashboard/ProgressChart";
import AchievementBadge from "../components/CourseDashboard/AchievementBadge";
import mockCourses from "../lib/mockCourses";

const CoursePage = () => {
  const course = mockCourses[0]; 
  const [activeModule, setActiveModule] = useState(0);

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50">
      {/* Sidebar Navigation */}
      <aside className="md:w-64 w-full border-r bg-white">
        <CourseNavigation
          modules={course.modules}
          activeModule={activeModule}
          onSelectModule={setActiveModule}
        />
        <div className="hidden md:block mt-8 px-4">
          <ProgressChart progress={course.progress} />
          <AchievementBadge
            type="completion"
            title="Module Complete"
            description="You finished this module!"
            date="July 12, 2025"
          />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 flex flex-col items-center">
        <CoursePlayer
          module={course.modules[activeModule]}
        />
        {/* For mobile, show progress and badge below */}
        <div className="md:hidden w-full mt-8">
          <ProgressChart progress={course.progress} />
          <AchievementBadge
            type="completion"
            title="Module Complete"
            description="You finished this module!"
            date="July 12, 2025"
          />
        </div>
      </main>
    </div>
  );
};

export default CoursePage;
