import React, { useState } from "react";
import PropTypes from "prop-types";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";

const difficulties = ["Beginner", "Intermediate", "Advanced"];
const times = ["1 week", "2 weeks", "1 month", "Flexible"];

const TopicInput = ({
  onSubmit,
  isLoading,
  error,
  initialValues,
}) => {
  const [topic, setTopic] = useState(initialValues.topic || "");
  const [difficulty, setDifficulty] = useState(initialValues.difficulty || "");
  const [time, setTime] = useState(initialValues.time || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ topic, difficulty, time });
  };

  return (
    <Card className="w-full max-w-lg mx-auto my-8">
      <CardContent>
        <form onSubmit={handleSubmit} aria-label="Course Generation Form">
          <h2 className="text-xl font-semibold mb-4">Create Your Course</h2>
          <div className="mb-4">
            <label htmlFor="topic" className="block font-medium mb-1">
              Topic
            </label>
            <input
              id="topic"
              type="text"
              className="w-full border border-gray-300 rounded p-2 focus:ring-2 focus:ring-blue-500"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g. React, Python, Data Structures"
              required
              disabled={isLoading}
            />
          </div>
          <div className="mb-4">
            <label className="block font-medium mb-1">Difficulty</label>
            <div className="flex flex-wrap gap-2">
              {difficulties.map((d) => (
                <Button
                  key={d}
                  type="button"
                  variant={difficulty === d ? "default" : "outline"}
                  onClick={() => setDifficulty(d)}
                  aria-pressed={difficulty === d}
                  disabled={isLoading}
                >
                  {d}
                </Button>
              ))}
            </div>
          </div>
          <div className="mb-4">
            <label className="block font-medium mb-1">Time Commitment</label>
            <div className="flex flex-wrap gap-2">
              {times.map((t) => (
                <Button
                  key={t}
                  type="button"
                  variant={time === t ? "default" : "outline"}
                  onClick={() => setTime(t)}
                  aria-pressed={time === t}
                  disabled={isLoading}
                >
                  {t}
                </Button>
              ))}
            </div>
          </div>
          {error && (
            <div className="text-red-600 text-sm mb-2" role="alert">
              {error}
            </div>
          )}
          <Button
            type="submit"
            className="w-full mt-2"
            disabled={
              isLoading ||
              !topic.trim() ||
              !difficulty ||
              !time
            }
            aria-label="Generate Course"
          >
            {isLoading ? "Generating..." : "Generate Course"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

TopicInput.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  error: PropTypes.string,
  initialValues: PropTypes.shape({
    topic: PropTypes.string,
    difficulty: PropTypes.string,
    time: PropTypes.string,
  }),
};

TopicInput.defaultProps = {
  isLoading: false,
  error: "",
  initialValues: {},
};

export default TopicInput;