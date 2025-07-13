import React from 'react';
import { Outlet } from 'react-router-dom';
import CourseNavigation from '../components/CoursePlayer/CourseNavigation';
import { useCourseProgress } from '../lib/hooks/useCourseProgress';

/**
 * CoursePage - Main layout for the learning environment
 * Wraps all course player components
 */
export const CoursePage = () => {
  const { currentCourse, isLoading, error } = useCourseProgress();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center p-6 max-w-md">
          <h2 className="text-xl font-semibold mb-2">Course Loading Error</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-primary text-white rounded-md"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <CourseNavigation course={currentCourse} />
      <div className="flex-1 overflow-hidden">
        <Outlet />
      </div>
    </div>
  );
};

export default CoursePage;