import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, BookOpen, Code2, ClipboardCheck, ChevronDown, ChevronRight } from 'lucide-react';
import PropTypes from 'prop-types';


/**
 * CourseNavigation - Sidebar component for navigating between course modules
 * @param {Object} props
 * @param {Array} props.modules - List of course modules
 * @param {string} props.currentModule - Currently active module ID
 * @param {Function} props.onModuleChange - Callback when module changes
 */
export const CourseNavigation = ({ modules = [], currentModule, onModuleChange }) => {
  const [expandedModules, setExpandedModules] = useState({});
  const location = useLocation();

  const toggleModule = (moduleId) => {
    setExpandedModules(prev => ({
      ...prev,
      [moduleId]: !prev[moduleId]
    }));
  };

  // Default to expanded if no state exists
  const isModuleExpanded = (moduleId) => expandedModules[moduleId] ?? true;

  return (
    <div className="w-64 h-full border-r bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 flex flex-col">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Course Modules</h2>
      </div>
      
      <nav className="flex-1 overflow-y-auto p-2">
        <ul className="space-y-1">
          <li>
            <Link
              to={`${location.pathname.replace(/\/[^/]*$/, '')}/dashboard`}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-gray-900 dark:text-gray-100 transition-all ${location.pathname.endsWith('dashboard') ? 'bg-gray-100 dark:bg-gray-800' : 'hover:bg-gray-100 dark:hover:bg-gray-800'}`}
            >
              <LayoutDashboard className="h-4 w-4" />
              Course Overview
            </Link>
          </li>
          
          {modules.map((module) => (
            <li key={module.id}>
              <button
                onClick={() => toggleModule(module.id)}
                className="flex items-center justify-between w-full rounded-lg px-3 py-2 text-left text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
              >
                <div className="flex items-center gap-3">
                  <BookOpen className="h-4 w-4" />
                  <span>{module.title}</span>
                </div>
                {isModuleExpanded(module.id) ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
              </button>
              
              {isModuleExpanded(module.id) && (
                <ul className="ml-8 mt-1 space-y-1">
                  {module.lessons.map((lesson) => (
                    <li key={lesson.id}>
                      <Link
                        to={`${location.pathname.replace(/\/[^/]*$/, '')}/lesson/${lesson.id}`}
                        onClick={() => onModuleChange(module.id)}
                        className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm ${currentModule === module.id ? 'text-primary font-medium' : 'text-gray-700 dark:text-gray-300'} hover:bg-gray-100 dark:hover:bg-gray-800 transition-all`}
                      >
                        {lesson.type === 'video' && (
                          <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                          </svg>
                        )}
                        {lesson.type === 'coding' && <Code2 className="h-3 w-3" />}
                        {lesson.type === 'quiz' && <ClipboardCheck className="h-3 w-3" />}
                        {lesson.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <div className="text-sm text-gray-500 dark:text-gray-400">
          Progress: <span className="font-medium text-primary">25%</span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-2">
          <div className="bg-primary h-2 rounded-full" style={{ width: '25%' }}></div>
        </div>
      </div>
    </div>
  );
};

CourseNavigation.propTypes = {
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
  ).isRequired,
  currentModule: PropTypes.string,
  onModuleChange: PropTypes.func
};

export default CourseNavigation;