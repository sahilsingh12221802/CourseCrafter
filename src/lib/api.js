import { GoogleGenAI } from "@google/genai";

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
if (!GEMINI_API_KEY) {
  throw new Error("Gemini API key is missing. Set VITE_GEMINI_API_KEY in your environment.");
}
const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

export async function generateCourse(params) {
  const prompt = `
    Create a personalized learning course as a JSON object.
    Requirements:
    - Topic: ${params.topic}
    - Difficulty: ${params.difficulty}
    - Time commitment: ${params.time}
    Structure:
    {
      "id": "string",
      "title": "string",
      "description": "string",
      "progress": [ { "label": "string", "value": number } ],
      "modules": [
        {
          "id": "string",
          "title": "string",
          "lessons": [
            {
              "id": "string",
              "type": "video|quiz|code",
              "title": "string",
              "description": "string",
              "videoUrl"?: "string",
              "captionsUrl"?: "string",
              "prompt"?: "string",
              "options"?: [ "string" ],
              "answer"?: number,
              "language"?: "string",
              "initialCode"?: "string",
              "placeholder"?: "string"
            }
          ],
          "resources": [
            {
              "title": "string",
              "url": "string",
              "type": "pdf|link",
              "description": "string"
            }
          ]
        }
      ]
    }
    Only output valid JSON.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    let course;
    try {
      course = JSON.parse(response.text);
    } catch (err) {
      throw new Error("Failed to parse Gemini response as JSON.");
    }
    return course;
  } catch (error) {
    console.error("Error generating course:", error);
    throw error;
  }
}

export async function updateProgress(courseId, progressData) {
  await new Promise((resolve) => setTimeout(resolve, 800));
  return true;
}

export async function fetchCourse(courseId) {
  await new Promise((resolve) => setTimeout(resolve, 900));
  return null;
}
