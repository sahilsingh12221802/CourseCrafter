import React, { useState, useEffect } from 'react';
import { useParams, Outlet, useNavigate } from 'react-router-dom';
import { CourseNavigation } from './CourseNavigation';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../ui/tabs';
import { Button } from '../ui/button';
import { ChevronLeft, ChevronRight, Bookmark, Loader2 } from 'lucide-react';
import useCourseProgress from '../../lib/hooks/useCourseProgress';
import PropTypes from 'prop-types';


/**
 * CoursePlayer - Main wrapper component for the learning interface
 * @param {Object} props
 * @param {Array} props.courseData - The complete course data
 */
export const CoursePlayer = ({ courseData }) => {
  const { courseId, moduleId, lessonId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('lesson');
  const [isLoading, setIsLoading] = useState(true);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const { updateProgress } = useCourseProgress(courseId);

  // Find current module and lesson
  const currentModule = courseData.modules.find(m => m.id === moduleId) || courseData.modules[0];
  const currentLesson = currentModule?.lessons.find(l => l.id === lessonId) || currentModule?.lessons[0];

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, [lessonId]);

  useEffect(() => {
    // Reset tab when lesson changes
    setActiveTab(currentLesson?.type === 'quiz' ? 'quiz' : 'lesson');
  }, [currentLesson]);

  const handleNavigation = (direction) => {
    if (!currentModule || !currentLesson) return;

    const currentModuleIndex = courseData.modules.findIndex(m => m.id === currentModule.id);
    const currentLessonIndex = currentModule.lessons.findIndex(l => l.id === currentLesson.id);

    if (direction === 'next') {
      // Check if there's a next lesson in current module
      if (currentLessonIndex < currentModule.lessons.length - 1) {
        const nextLesson = currentModule.lessons[currentLessonIndex + 1];
        navigate(`/course/${courseId}/module/${currentModule.id}/lesson/${nextLesson.id}`);
      } 
      // Otherwise move to next module's first lesson
      else if (currentModuleIndex < courseData.modules.length - 1) {
        const nextModule = courseData.modules[currentModuleIndex + 1];
        navigate(`/course/${courseId}/module/${nextModule.id}/lesson/${nextModule.lessons[0].id}`);
      }
    } else if (direction === 'prev') {
      // Check if there's a previous lesson in current module
      if (currentLessonIndex > 0) {
        const prevLesson = currentModule.lessons[currentLessonIndex - 1];
        navigate(`/course/${courseId}/module/${currentModule.id}/lesson/${prevLesson.id}`);
      } 
      // Otherwise move to previous module's last lesson
      else if (currentModuleIndex > 0) {
        const prevModule = courseData.modules[currentModuleIndex - 1];
        navigate(`/course/${courseId}/module/${prevModule.id}/lesson/${prevModule.lessons[prevModule.lessons.length - 1].id}`);
      }
    }

    // Update progress when navigating
    updateProgress(currentModule.id, currentLesson.id);
  };

  const handleModuleChange = (newModuleId) => {
    const module = courseData.modules.find(m => m.id === newModuleId);
    if (module) {
      navigate(`/course/${courseId}/module/${newModuleId}/lesson/${module.lessons[0].id}`);
    }
  };

  if (!courseData || !currentModule || !currentLesson) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      {/* Navigation Sidebar */}
      <CourseNavigation 
        modules={courseData.modules} 
        currentModule={currentModule.id} 
        onModuleChange={handleModuleChange} 
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
              {currentModule.title}: <span className="text-primary">{currentLesson.title}</span>
            </h1>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setIsBookmarked(!isBookmarked)}
              className="text-gray-500 hover:text-primary"
            >
              <Bookmark className={`h-5 w-5 ${isBookmarked ? 'fill-primary text-primary' : ''}`} />
            </Button>
          </div>
        </header>

        {/* Content Tabs */}
        <main className="flex-1 overflow-y-auto p-6">
          {isLoading ? (
            <div className="flex items-center justify-center h-full">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : (
            <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full">
              <TabsList className="grid grid-cols-3 w-full max-w-md mb-6">
                <TabsTrigger value="lesson" disabled={currentLesson.type === 'quiz'}>
                  Lesson
                </TabsTrigger>
                <TabsTrigger value="practice" disabled={currentLesson.type !== 'coding'}>
                  Practice
                </TabsTrigger>
                <TabsTrigger value="quiz" disabled={currentLesson.type !== 'quiz'}>
                  Quiz
                </TabsTrigger>
              </TabsList>

              <TabsContent value="lesson" className="h-full">
                <Outlet context={{ lesson: currentLesson, courseId }} />
              </TabsContent>
              <TabsContent value="practice" className="h-full">
                <Outlet context={{ lesson: currentLesson, courseId }} />
              </TabsContent>
              <TabsContent value="quiz" className="h-full">
                <Outlet context={{ lesson: currentLesson, courseId }} />
              </TabsContent>
            </Tabs>
          )}
        </main>

        {/* Footer Navigation */}
        <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-4">
          <div className="flex justify-between items-center">
            <Button 
              variant="outline" 
              onClick={() => handleNavigation('prev')}
              disabled={!currentModule || !currentLesson || 
                (currentLesson === currentModule.lessons[0] && 
                 courseData.modules[0] === currentModule)}
            >
              <ChevronLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>
            
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Lesson {currentModule.lessons.findIndex(l => l.id === currentLesson.id) + 1} of {currentModule.lessons.length}
            </div>
            
            <Button 
              variant="default" 
              onClick={() => handleNavigation('next')}
              disabled={!currentModule || !currentLesson || 
                (currentLesson === currentModule.lessons[currentModule.lessons.length - 1] && 
                 courseData.modules[courseData.modules.length - 1] === currentModule)}
            >
              Next
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </footer>
      </div>
    </div>
  );
};

CoursePlayer.propTypes = {
  courseData: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    modules: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        lessons: PropTypes.arrayOf(
          PropTypes.shape({
            id: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
            type: PropTypes.oneOf(['video', 'coding', 'quiz']).isRequired
          })
        ).isRequired
      })
    ).isRequired
  }).isRequired
};

export default CoursePlayer;