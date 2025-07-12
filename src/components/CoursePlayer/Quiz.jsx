import React, { useState } from "react";
import PropTypes from "prop-types";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";

const Quiz = ({
  questions,
  isLoading,
  onComplete,
  error,
}) => {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);

  if (isLoading) {
    return (
      <Card className="w-full max-w-3xl mx-auto my-6">
        <CardContent>
          <Skeleton className="h-6 w-1/2 mb-2" />
          <Skeleton className="h-4 w-3/4 mb-2" />
          <Skeleton className="h-10 w-24" />
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="w-full max-w-3xl mx-auto my-6">
        <CardContent>
          <span className="text-red-600" role="alert">
            {error}
          </span>
        </CardContent>
      </Card>
    );
  }

  if (current >= questions.length) {
    return (
      <Card className="w-full max-w-3xl mx-auto my-6">
        <CardContent>
          <h2 className="text-xl font-semibold mb-2">Quiz Complete!</h2>
          <p className="mb-4">
            You scored {score} out of {questions.length}.
          </p>
          <Button onClick={onComplete}>Finish</Button>
        </CardContent>
      </Card>
    );
  }

  const q = questions[current];
  const handleSelect = (idx) => setSelected(idx);

  const handleSubmit = () => {
    setShowFeedback(true);
    if (selected === q.answer) setScore(score + 1);
  };

  const handleNext = () => {
    setShowFeedback(false);
    setSelected(null);
    setCurrent(current + 1);
  };

  return (
    <Card className="w-full max-w-3xl mx-auto my-6">
      <CardContent>
        <div>
          <h3 className="text-lg font-semibold mb-2">
            Question {current + 1} of {questions.length}
          </h3>
          <p className="mb-4">{q.prompt}</p>
          <ul className="mb-4">
            {q.options.map((opt, idx) => (
              <li key={idx} className="mb-2">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name={`question-${current}`}
                    checked={selected === idx}
                    onChange={() => handleSelect(idx)}
                    disabled={showFeedback}
                    aria-checked={selected === idx}
                  />
                  {opt}
                </label>
              </li>
            ))}
          </ul>
          {!showFeedback ? (
            <Button
              onClick={handleSubmit}
              disabled={selected === null}
              aria-label="Submit answer"
            >
              Submit
            </Button>
          ) : (
            <div>
              <span
                className={
                  selected === q.answer
                    ? "text-green-600 font-semibold"
                    : "text-red-600 font-semibold"
                }
                role="status"
              >
                {selected === q.answer ? "Correct!" : "Incorrect."}
              </span>
              <Button className="ml-4" onClick={handleNext} aria-label="Next question">
                Next
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

Quiz.propTypes = {
  questions: PropTypes.arrayOf(
    PropTypes.shape({
      prompt: PropTypes.string.isRequired,
      options: PropTypes.arrayOf(PropTypes.string).isRequired,
      answer: PropTypes.number.isRequired,
    })
  ).isRequired,
  isLoading: PropTypes.bool,
  onComplete: PropTypes.func,
  error: PropTypes.string,
};

Quiz.defaultProps = {
  isLoading: false,
  onComplete: () => {},
  error: "",
};

export default Quiz;
