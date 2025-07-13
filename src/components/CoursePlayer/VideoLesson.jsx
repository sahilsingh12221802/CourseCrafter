import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Play, Pause, Volume2, VolumeX, Maximize, Loader2, ChevronRight } from 'lucide-react';
import { Button } from '../ui/button';
import { Progress } from '../ui/progress';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';

/**
 * VideoLesson - Component for displaying video lesson content
 * @param {Object} props
 * @param {Object} props.lesson - Lesson data
 * @param {Function} props.onComplete - Callback when lesson is marked complete
 */
export const VideoLesson = ({ lesson, onComplete }) => {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [bufferProgress, setBufferProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showNotes, setShowNotes] = useState(false);
  const [completed, setCompleted] = useState(false);

  // Format time (seconds to MM:SS)
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  // Handle play/pause
  const togglePlay = () => {
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  // Handle mute/unmute
  const toggleMute = () => {
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  // Handle seeking
  const handleSeek = (e) => {
    const seekTime = (e.nativeEvent.offsetX / e.target.offsetWidth) * duration;
    videoRef.current.currentTime = seekTime;
    setCurrentTime(seekTime);
  };

  // Handle fullscreen
  const toggleFullscreen = () => {
    if (!isFullscreen) {
      containerRef.current.requestFullscreen?.().catch(err => {
        console.error('Error attempting to enable fullscreen:', err);
      });
    } else {
      document.exitFullscreen?.();
    }
  };

  // Handle video end
  const handleEnded = () => {
    setIsPlaying(false);
    if (!completed) {
      setCompleted(true);
      onComplete?.();
    }
  };

  // Update progress bar
  const handleTimeUpdate = () => {
    setCurrentTime(videoRef.current.currentTime);
    setProgress((videoRef.current.currentTime / duration) * 100);
  };

  // Update buffer progress
  const handleProgress = () => {
    if (videoRef.current.buffered.length > 0) {
      const bufferedEnd = videoRef.current.buffered.end(videoRef.current.buffered.length - 1);
      setBufferProgress((bufferedEnd / duration) * 100);
    }
  };

  // Set up event listeners
  useEffect(() => {
    const video = videoRef.current;

    const handleLoadedMetadata = () => {
      setDuration(video.duration);
      setIsLoading(false);
    };

    const handleFullscreenChange = () => {
      setIsFullscreen(document.fullscreenElement !== null);
    };

    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('ended', handleEnded);
    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('progress', handleProgress);
    document.addEventListener('fullscreenchange', handleFullscreenChange);

    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('ended', handleEnded);
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('progress', handleProgress);
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, [duration]);

  return (
    <div 
      ref={containerRef}
      className="flex flex-col h-full bg-black rounded-lg overflow-hidden"
    >
      {/* Video Container */}
      <div className="relative flex-1 group">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
          </div>
        )}

        <video
          ref={videoRef}
          src={lesson.videoUrl}
          className="w-full h-full object-contain"
          preload="metadata"
          onClick={togglePlay}
        />

        {/* Video Controls Overlay */}
        <div className={`absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4 transition-opacity ${isPlaying ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'}`}>
          {/* Progress Bar */}
          <div className="relative mb-3 cursor-pointer" onClick={handleSeek}>
            <div className="absolute h-2 w-full bg-gray-600/50 rounded-full">
              <div 
                className="absolute h-2 bg-gray-400/50 rounded-full"
                style={{ width: `${bufferProgress}%` }}
              />
            </div>
            <Progress 
              value={progress} 
              className="h-2 bg-transparent relative"
            />
          </div>

          {/* Control Bar */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/10"
                onClick={togglePlay}
              >
                {isPlaying ? (
                  <Pause className="h-5 w-5" />
                ) : (
                  <Play className="h-5 w-5" />
                )}
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/10"
                onClick={toggleMute}
              >
                {isMuted ? (
                  <VolumeX className="h-5 w-5" />
                ) : (
                  <Volume2 className="h-5 w-5" />
                )}
              </Button>

              <div className="text-sm text-white">
                {formatTime(currentTime)} / {formatTime(duration)}
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/10"
                onClick={toggleFullscreen}
              >
                <Maximize className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Play/Pause Center Button */}
        {!isPlaying && !isLoading && (
          <button
            className="absolute inset-0 flex items-center justify-center w-full h-full"
            onClick={togglePlay}
          >
            <div className="bg-black/50 rounded-full p-4">
              <Play className="h-12 w-12 text-white" />
            </div>
          </button>
        )}
      </div>

      {/* Lesson Notes Section */}
      <div className="bg-white dark:bg-gray-800 p-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-semibold">{lesson.title}</h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowNotes(!showNotes)}
            className="text-gray-500 hover:text-primary"
          >
            {showNotes ? 'Hide Notes' : 'Show Notes'}
            <ChevronRight className={`h-4 w-4 ml-1 transition-transform ${showNotes ? 'rotate-90' : ''}`} />
          </Button>
        </div>

        {showNotes && (
          <div className="prose dark:prose-invert max-w-none">
            {lesson.notes ? (
              <div dangerouslySetInnerHTML={{ __html: lesson.notes }} />
            ) : (
              <p className="text-gray-500">No additional notes for this lesson.</p>
            )}
          </div>
        )}

        {/* Completion Button */}
        {!completed && (
          <div className="mt-4 flex justify-end">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant={progress >= 95 ? "default" : "outline"}
                  onClick={() => {
                    setCompleted(true);
                    onComplete?.();
                  }}
                  disabled={progress < 95}
                >
                  Mark as Complete
                </Button>
              </TooltipTrigger>
              {progress < 95 && (
                <TooltipContent>
                  <p>Watch at least 95% of the video to mark as complete</p>
                </TooltipContent>
              )}
            </Tooltip>
          </div>
        )}

        {completed && (
          <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/30 rounded-md border border-green-200 dark:border-green-800">
            <p className="text-green-700 dark:text-green-300 flex items-center">
              <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              You've completed this lesson
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

VideoLesson.propTypes = {
  lesson: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['video']).isRequired,
    videoUrl: PropTypes.string.isRequired,
    notes: PropTypes.string,
    duration: PropTypes.number
  }).isRequired,
  onComplete: PropTypes.func
};

export default VideoLesson;