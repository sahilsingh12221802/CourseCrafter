import { useState, useCallback } from "react";
import { generateCourse } from "../api";

export default function useAIGenerator() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);
  const [step, setStep] = useState(0);

  const run = useCallback(async (params) => {
    setLoading(true);
    setError("");
    setResult(null);
    setStep(0);

    try {
      setStep(0);
      await new Promise((r) => setTimeout(r, 700));
      setStep(1);
      await new Promise((r) => setTimeout(r, 700));
      setStep(2);
      await new Promise((r) => setTimeout(r, 700));
      setStep(3);

      const course = await generateCourse(params);
      setResult(course);
    } catch (e) {
      setError("Failed to generate course.");
    } finally {
      setLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setLoading(false);
    setError("");
    setResult(null);
    setStep(0);
  }, []);

  return {
    loading,
    error,
    result,
    step,
    run,
    reset,
  };
}
