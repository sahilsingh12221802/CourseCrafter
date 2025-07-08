import { CoursePlayer } from "@/components/CoursePlayer/CoursePlayer";
import { mockCourse } from "./lib/mockCourses";
import { useState } from "react";
import { TopicInput } from "./components/CourseGenerator/TopicInput";
import CourseNavigation from "./components/CoursePlayer/CourseNavigation";

function App() {
  const [course, setCourse] = useState(null);

  return (
    <div className="container max-w-6xl mx-auto p-4">
      {!course ? (
        <TopicInput onGenerate={setCourse} />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <CourseNavigation
              modules={course.modules} 
              currentModuleId={course.currentModuleId}
            />
          </div>
          <div className="lg:col-span-3">
            <CoursePlayer 
              currentModule={course.modules.find(
                m => m.id === course.currentModuleId
              )} 
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;