import { useState, useCallback } from "react";
import { updateProgress } from "../api";

export default function useCourseProgress(initialProgress = []) {
  const [progress, setProgress] = useState(initialProgress);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const update = useCallback(async (courseId, newProgress) => {
    setLoading(true);
    setError("");
    try {
      await updateProgress(courseId, newProgress);
      setProgress(newProgress);
    } catch (e) {
      setError("Failed to update progress.");
    } finally {
      setLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setProgress([]);
    setError("");
  }, []);

  return {
    progress,
    setProgress,
    update,
    reset,
    loading,
    error,
  };
}
