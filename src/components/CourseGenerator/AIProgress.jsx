import React from 'react';
import PropTypes from 'prop-types';
import { Sparkles, Check, BookOpen, Code2, ClipboardCheck, Video } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Progress } from '../ui/progress';

/**
 * AIProgress - Loading component for AI course generation
 * @param {Object} props
 * @param {number} props.progress - Current progress percentage (0-100)
 * @param {string} props.currentStep - Description of current generation step
 * @param {Array} props.recentlyGenerated - Array of recently generated items
 */
export const AIProgress = ({ progress = 0, currentStep = '', recentlyGenerated = [] }) => {
  // Map step types to icons
  const getStepIcon = (type) => {
    switch (type) {
      case 'module':
        return <BookOpen className="h-4 w-4 mr-2" />;
      case 'video':
        return <Video className="h-4 w-4 mr-2" />;
      case 'coding':
        return <Code2 className="h-4 w-4 mr-2" />;
      case 'quiz':
        return <ClipboardCheck className="h-4 w-4 mr-2" />;
      default:
        return <Sparkles className="h-4 w-4 mr-2" />;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Sparkles className="h-6 w-6 mr-2 text-primary animate-pulse" />
            Generating Your Personalized Course
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progress</span>
              <span>{Math.min(100, Math.max(0, progress))}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {/* Current Step */}
          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Current Step</p>
            <div className="flex items-center p-3 rounded-md bg-gray-100 dark:bg-gray-800">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary mr-3"></div>
              <p className="text-sm">{currentStep || 'Initializing course generation...'}</p>
            </div>
          </div>

          {/* Recently Generated Items */}
          {recentlyGenerated.length > 0 && (
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Recently Generated</p>
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {recentlyGenerated.map((item, index) => (
                  <div 
                    key={index} 
                    className="flex items-center p-2 rounded-md border border-gray-200 dark:border-gray-700"
                  >
                    <div className="flex-shrink-0 text-green-500">
                      <Check className="h-4 w-4" />
                    </div>
                    <div className="ml-3 flex items-center">
                      {getStepIcon(item.type)}
                      <span className="text-sm">{item.name}</span>
                    </div>
                    <span className="ml-auto text-xs text-gray-500 dark:text-gray-400 capitalize">
                      {item.type}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tips */}
          <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-md border border-blue-200 dark:border-blue-800">
            <p className="text-sm text-blue-700 dark:text-blue-300">
              This usually takes 30-60 seconds. Feel free to grab a coffee while we work!
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

AIProgress.propTypes = {
  progress: PropTypes.number,
  currentStep: PropTypes.string,
  recentlyGenerated: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.oneOf(['module', 'video', 'coding', 'quiz']).isRequired,
      name: PropTypes.string.isRequired,
    })
  ),
};

AIProgress.defaultProps = {
  progress: 0,
  currentStep: '',
  recentlyGenerated: [],
};

export default AIProgress;