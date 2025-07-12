import React from "react";
import PropTypes from "prop-types";
import { Card, CardContent } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

const messages = [
  "Analyzing your learning goals...",
  "Selecting the best resources...",
  "Designing your personalized curriculum...",
  "Almost ready! Putting it all together...",
];

const AIProgress = ({ step }) => {
  const safeStep = Math.min(messages.length - 1, Math.max(0, step));
  return (
    <Card className="w-full max-w-lg mx-auto my-8">
      <CardContent className="flex flex-col items-center justify-center py-8">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-solid mb-4" />
        <h2 className="text-lg font-semibold mb-2 text-center">
          Generating your course...
        </h2>
        <p className="text-gray-600 text-center mb-4">
          {messages[safeStep]}
        </p>
        <Skeleton className="h-4 w-3/4 mb-1" />
        <Skeleton className="h-4 w-2/3" />
      </CardContent>
    </Card>
  );
};

AIProgress.propTypes = {
  step: PropTypes.number,
};

AIProgress.defaultProps = {
  step: 0,
};

export default AIProgress;
