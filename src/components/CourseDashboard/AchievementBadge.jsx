import React from "react";
import PropTypes from "prop-types";
import { Card, CardContent } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

const badgeIcons = {
  completion: "🎓",
  streak: "🔥",
  mastery: "🏅",
  custom: "⭐",
};

const AchievementBadge = ({
  type,
  title,
  description,
  date,
  isLoading,
}) => {
  if (isLoading) {
    return (
      <Card className="w-full max-w-xs mx-auto my-4">
        <CardContent className="flex flex-col items-center">
          <Skeleton className="h-16 w-16 rounded-full mb-2" />
          <Skeleton className="h-6 w-24 mb-1" />
          <Skeleton className="h-4 w-32" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-xs mx-auto my-4 shadow-lg border-2 border-yellow-300">
      <CardContent className="flex flex-col items-center">
        <div
          className="text-4xl mb-2"
          aria-label={type + " badge"}
          role="img"
        >
          {badgeIcons[type] || badgeIcons["custom"]}
        </div>
        <h3 className="text-lg font-semibold text-yellow-700 text-center">{title}</h3>
        <p className="text-gray-600 text-center text-sm mb-1">{description}</p>
        {date && (
          <span className="text-xs text-gray-400">{date}</span>
        )}
      </CardContent>
    </Card>
  );
};

AchievementBadge.propTypes = {
  type: PropTypes.oneOf(["completion", "streak", "mastery", "custom"]),
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  date: PropTypes.string,
  isLoading: PropTypes.bool,
};

AchievementBadge.defaultProps = {
  type: "custom",
  description: "",
  date: "",
  isLoading: false,
};

export default AchievementBadge;
