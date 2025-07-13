import React from 'react';
import PropTypes from 'prop-types';
import { 
  BookOpen, 
  Clock, 
  BarChart2, 
  CheckCircle, 
  ChevronRight,
  Sparkles,
  Zap
} from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../ui/card';
import { Progress } from '../ui/progress';
import { Badge } from '../ui/badge';

/**
 * CourseGeneratorResults - Displays AI-generated course recommendations
 * @param {Object} props
 * @param {Object} props.course - Generated course data
 * @param {Function} props.onAccept - Callback when user accepts the course
 * @param {Function} props.onRegenerate - Callback when user requests regeneration
 * @param {Function} props.onCustomize - Callback when user wants to customize
 */
export const CourseGeneratorResults = ({ 
  course, 
  onAccept, 
  onRegenerate, 
  onCustomize 
}) => {
  // Calculate total duration in hours
  const totalDuration = course.modules.reduce(
    (sum, module) => sum + module.duration, 0
  );

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div className="text-center mb-10">
        <div className="flex items-center justify-center mb-4">
          <Sparkles className="h-8 w-8 text-primary mr-2" />
          <h1 className="text-3xl font-bold">Your Personalized Course</h1>
        </div>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          We've crafted this learning path based on your goals and preferences
        </p>
      </div>

      {/* Course Overview */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>{course.title}</span>
            <Badge variant="outline" className="flex items-center">
              <Zap className="h-4 w-4 mr-2 text-yellow-500" />
              AI-Generated
            </Badge>
          </CardTitle>
          <CardDescription>{course.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="flex items-center p-4 rounded-lg border">
              <BookOpen className="h-6 w-6 mr-3 text-primary" />
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Modules</p>
                <p className="font-medium">{course.modules.length}</p>
              </div>
            </div>
            <div className="flex items-center p-4 rounded-lg border">
              <Clock className="h-6 w-6 mr-3 text-primary" />
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Total Duration</p>
                <p className="font-medium">{totalDuration} hours</p>
              </div>
            </div>
            <div className="flex items-center p-4 rounded-lg border">
              <BarChart2 className="h-6 w-6 mr-3 text-primary" />
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Difficulty</p>
                <p className="font-medium capitalize">{course.difficulty}</p>
              </div>
            </div>
          </div>

          <div className="space-y-2 mb-4">
            <div className="flex justify-between text-sm">
              <span>Completion estimate</span>
              <span>
                {course.estimatedWeeks} week{course.estimatedWeeks !== 1 ? 's' : ''} at {course.hoursPerWeek} hrs/week
              </span>
            </div>
            <Progress 
              value={course.recommendedPace} 
              indicatorClassName="bg-primary"
              className="h-2"
            />
            <p className="text-xs text-gray-500 dark:text-gray-400 text-right">
              {course.recommendedPace}% of learners complete at this pace
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Modules List */}
      <div className="space-y-4 mb-10">
        <h2 className="text-xl font-semibold flex items-center">
          <BookOpen className="h-5 w-5 mr-2" />
          Course Modules
        </h2>
        
        {course.modules.map((module, index) => (
          <Card key={module.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="flex items-center">
                    <span className="mr-3 text-gray-400 dark:text-gray-500">0{index + 1}</span>
                    {module.title}
                  </CardTitle>
                  <CardDescription className="ml-8">
                    {module.description}
                  </CardDescription>
                </div>
                <Badge variant="outline" className="flex items-center">
                  <Clock className="h-3 w-3 mr-1" />
                  {module.duration} hrs
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="ml-8 pl-2 border-l-2 border-gray-200 dark:border-gray-700 space-y-3">
                {module.lessons.map((lesson, lessonIndex) => (
                  <div key={lessonIndex} className="flex items-center">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mr-3">
                      {lesson.type === 'video' && <Video className="h-3 w-3" />}
                      {lesson.type === 'coding' && <Code2 className="h-3 w-3" />}
                      {lesson.type === 'quiz' && <ClipboardCheck className="h-3 w-3" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{lesson.title}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{lesson.duration} min</p>
                    </div>
                    {lesson.completed && (
                      <CheckCircle className="h-4 w-4 text-green-500 ml-2" />
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row justify-end gap-4">
        <Button 
          variant="outline" 
          onClick={onRegenerate}
          className="flex-1 sm:flex-none"
        >
          Regenerate
        </Button>
        <Button 
          variant="outline"
          onClick={onCustomize}
          className="flex-1 sm:flex-none"
        >
          Customize
        </Button>
        <Button 
          onClick={onAccept}
          className="flex-1 sm:flex-none"
        >
          Start Learning <ChevronRight className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </div>
  );
};

CourseGeneratorResults.propTypes = {
  course: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    difficulty: PropTypes.string.isRequired,
    estimatedWeeks: PropTypes.number.isRequired,
    hoursPerWeek: PropTypes.number.isRequired,
    recommendedPace: PropTypes.number.isRequired,
    modules: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        duration: PropTypes.number.isRequired,
        lessons: PropTypes.arrayOf(
          PropTypes.shape({
            id: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
            type: PropTypes.oneOf(['video', 'coding', 'quiz']).isRequired,
            duration: PropTypes.number.isRequired,
            completed: PropTypes.bool,
          })
        ).isRequired,
      })
    ).isRequired,
  }).isRequired,
  onAccept: PropTypes.func.isRequired,
  onRegenerate: PropTypes.func.isRequired,
  onCustomize: PropTypes.func.isRequired,
};

export default CourseGeneratorResults;