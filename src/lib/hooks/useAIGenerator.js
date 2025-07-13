// src/lib/hooks/useAIGenerator.js
import { useState } from 'react';
import { generateCourse } from '../api';

/**
 * useAIGenerator - Hook for AI course generation
 * Handles loading states and errors during generation
 */
export const useAIGenerator = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState(null);
  const [progress, setProgress] = useState(0);

  const generate = async (formData) => {
    setIsGenerating(true);
    setError(null);
    setProgress(0);

    try {
      // Simulate progress (in real app, this would come from API)
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 90) {
            clearInterval(interval);
            return prev;
          }
          return prev + 10;
        });
      }, 300);

      const course = await generateCourse(formData);
      setProgress(100);
      return course;
    } catch (err) {
      setError(err.message || 'Failed to generate course');
      throw err;
    } finally {
      setIsGenerating(false);
    }
  };

  return { generate, isGenerating, progress, error };
};