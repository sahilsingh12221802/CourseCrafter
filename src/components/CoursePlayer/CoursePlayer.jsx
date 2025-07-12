import React, { useState } from "react";
import PropTypes from "prop-types";
import VideoLesson from "./VideoLesson";
import CodeEditor from "./CodeEditor";
import Quiz from "./Quiz";
import ResourcePanel from "./ResourcePanel";
import { Button } from "../ui/button";

const TABS = [
  { key: "lesson", label: "Lesson" },
  { key: "code", label: "Code" },
  { key: "quiz", label: "Quiz" },
  { key: "resources", label: "Resources" },
];

const CoursePlayer = ({ module }) => {
  const [tab, setTab] = useState("lesson");
  // Find first lesson of each type
  const video = module.lessons.find(l => l.type === "video");
  const code = module.lessons.find(l => l.type === "code");
  const quiz = module.lessons.find(l => l.type === "quiz");

  return (
    <div className="w-full max-w-3xl mx-auto my-4">
      <div className="flex gap-2 mb-4">
        {TABS.map(t => (
          <Button
            key={t.key}
            variant={tab === t.key ? "default" : "outline"}
            onClick={() => setTab(t.key)}
            aria-pressed={tab === t.key}
          >
            {t.label}
          </Button>
        ))}
      </div>
      <div>
        {tab === "lesson" && video && (
          <VideoLesson
            videoUrl={video.videoUrl}
            title={video.title}
            description={video.description}
            captionsUrl={video.captionsUrl}
          />
        )}
        {tab === "code" && code && (
          <CodeEditor
            initialCode={code.initialCode}
            language={code.language}
            placeholder={code.placeholder}
          />
        )}
        {tab === "quiz" && quiz && (
          <Quiz
            questions={[
              {
                prompt: quiz.prompt,
                options: quiz.options,
                answer: quiz.answer,
              },
            ]}
            onComplete={() => {}}
          />
        )}
        {tab === "resources" && (
          <ResourcePanel resources={module.resources} />
        )}
        {/* Empty state if no content */}
        {tab === "lesson" && !video && (
          <div className="text-gray-500 text-center p-8">No video lesson available.</div>
        )}
        {tab === "code" && !code && (
          <div className="text-gray-500 text-center p-8">No coding exercise available.</div>
        )}
        {tab === "quiz" && !quiz && (
          <div className="text-gray-500 text-center p-8">No quiz available.</div>
        )}
        {tab === "resources" && (!module.resources || module.resources.length === 0) && (
          <div className="text-gray-500 text-center p-8">No resources available.</div>
        )}
      </div>
    </div>
  );
};

CoursePlayer.propTypes = {
  module: PropTypes.shape({
    lessons: PropTypes.array.isRequired,
    resources: PropTypes.array,
  }).isRequired,
};

export default CoursePlayer;
