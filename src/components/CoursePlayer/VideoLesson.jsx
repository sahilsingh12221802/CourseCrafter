import React from "react";
import PropTypes from "prop-types";
import { Card, CardContent } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

const VideoLesson = ({
  videoUrl,
  title,
  description,
  isLoading,
  onError,
  captionsUrl,
}) => {
  if (isLoading) {
    return (
      <Card className="w-full max-w-3xl mx-auto my-6">
        <CardContent>
          <Skeleton className="h-64 w-full mb-4" />
          <Skeleton className="h-6 w-1/2 mb-2" />
          <Skeleton className="h-4 w-3/4" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-3xl mx-auto my-6">
      <CardContent>
        <div className="aspect-video rounded-lg overflow-hidden bg-black">
          <video
            className="w-full h-full"
            controls
            preload="metadata"
            onError={onError}
            aria-label={title}
          >
            <source src={videoUrl} type="video/mp4" />
            {captionsUrl && (
              <track
                label="English captions"
                kind="subtitles"
                srcLang="en"
                src={captionsUrl}
                default
              />
            )}
            Your browser does not support the video tag.
          </video>
        </div>
        <h2 className="text-xl font-semibold mt-4">{title}</h2>
        {description && (
          <p className="text-gray-600 mt-2">{description}</p>
        )}
      </CardContent>
    </Card>
  );
};

VideoLesson.propTypes = {
  videoUrl: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  isLoading: PropTypes.bool,
  onError: PropTypes.func,
  captionsUrl: PropTypes.string,
};

VideoLesson.defaultProps = {
  description: "",
  isLoading: false,
  onError: () => {},
  captionsUrl: "",
};

export default VideoLesson;
