import React from "react";
import PropTypes from "prop-types";
import { Card, CardContent } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

const ProgressChart = ({
  progress,
  isLoading,
  error,
}) => {
  if (isLoading) {
    return (
      <Card className="w-full max-w-3xl mx-auto my-6">
        <CardContent>
          <Skeleton className="h-6 w-1/2 mb-4" />
          <Skeleton className="h-48 w-full" />
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

  if (!progress || progress.length === 0) {
    return (
      <Card className="w-full max-w-3xl mx-auto my-6">
        <CardContent>
          <p className="text-gray-600">No progress data available.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-3xl mx-auto my-6">
      <CardContent>
        <h2 className="text-xl font-semibold mb-4">Your Progress</h2>
        <ul className="space-y-4">
          {progress.map((item, idx) => (
            <li key={idx}>
              <div className="flex justify-between mb-1">
                <span className="font-medium">{item.label}</span>
                <span className="text-sm text-gray-500">{item.value}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded h-4">
                <div
                  className="bg-blue-600 h-4 rounded"
                  style={{ width: `${item.value}%` }}
                  aria-valuenow={item.value}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  role="progressbar"
                />
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

ProgressChart.propTypes = {
  progress: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired,
    })
  ),
  isLoading: PropTypes.bool,
  error: PropTypes.string,
};

ProgressChart.defaultProps = {
  progress: [],
  isLoading: false,
  error: "",
};

export default ProgressChart;
