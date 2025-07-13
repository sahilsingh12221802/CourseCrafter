import { useState } from 'react';

export const useCourseProgress = (courseId) => {
  const [progress, setProgress] = useState(() => {
    const saved = localStorage.getItem(`courseProgress-${courseId}`);
    return saved ? JSON.parse(saved) : {};
  });

  const updateProgress = (moduleId, lessonId) => {
    setProgress(prev => {
      const newProgress = {
        ...prev,
        [moduleId]: {
          ...prev[moduleId],
          [lessonId]: true,
          lastAccessed: new Date().toISOString()
        }
      };
      localStorage.setItem(`courseProgress-${courseId}`, JSON.stringify(newProgress));
      return newProgress;
    });
  };

  return { progress, updateProgress };
};