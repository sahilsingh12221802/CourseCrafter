import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Check, ChevronRight, Loader2, AlertCircle, Trophy } from 'lucide-react';
import { Button } from '../ui/button';
import { Progress } from '../ui/progress';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../ui/card';
import { Label } from '../ui/label';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { useTheme } from '../../lib/hooks/useTheme';
import { cn } from '../../lib/utils';

/**
 * Quiz - Interactive knowledge check component
 * @param {Object} props
 * @param {Object} props.quiz - Quiz data
 * @param {Function} props.onComplete - Callback when quiz is completed
 */
export const Quiz = ({ quiz, onComplete }) => {
  const { theme } = useTheme();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(quiz.timeLimit * 60);
  const [isTimerRunning, setIsTimerRunning] = useState(true);

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === quiz.questions.length - 1;
  const hasAnswered = selectedAnswers[currentQuestionIndex] !== undefined;
  const isCorrect = selectedAnswers[currentQuestionIndex] === currentQuestion.correctAnswer;

  // Handle timer
  useEffect(() => {
    if (!quiz.timeLimit || !isTimerRunning) return;

    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isTimerRunning, quiz.timeLimit]);

  // Format time (seconds to MM:SS)
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // Handle answer selection
  const handleAnswerSelect = (value) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [currentQuestionIndex]: value
    }));
  };

  // Handle next question
  const handleNextQuestion = () => {
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      handleSubmit();
    }
  };

  // Handle quiz submission
  const handleSubmit = () => {
    setIsTimerRunning(false);
    setIsSubmitted(true);
    
    // Calculate score
    let correctCount = 0;
    quiz.questions.forEach((question, index) => {
      if (selectedAnswers[index] === question.correctAnswer) {
        correctCount++;
      }
    });
    
    const calculatedScore = Math.round((correctCount / quiz.questions.length) * 100);
    setScore(calculatedScore);
    setShowResults(true);

    // Call completion callback if passing score achieved
    if (calculatedScore >= quiz.passingScore) {
      onComplete?.();
    }
  };

  // Restart quiz
  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setIsSubmitted(false);
    setScore(0);
    setShowResults(false);
    setTimeRemaining(quiz.timeLimit * 60);
    setIsTimerRunning(true);
  };

  // Get question feedback
  const getQuestionFeedback = (questionIndex) => {
    const question = quiz.questions[questionIndex];
    const selectedAnswer = selectedAnswers[questionIndex];
    
    if (selectedAnswer === undefined) return 'Not answered';
    return selectedAnswer === question.correctAnswer ? 'Correct' : 'Incorrect';
  };

  return (
    <div className="flex flex-col h-full bg-gray-50 dark:bg-gray-900 p-4 overflow-auto">
      <Card className="w-full max-w-3xl mx-auto">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-2xl">{quiz.title}</CardTitle>
              <CardDescription className="mt-2">
                {!showResults ? (
                  `Question ${currentQuestionIndex + 1} of ${quiz.questions.length}`
                ) : (
                  `Quiz completed: ${score}% score`
                )}
              </CardDescription>
            </div>
            
            {quiz.timeLimit > 0 && (
              <div className={cn(
                "px-3 py-1 rounded-full text-sm font-medium",
                timeRemaining < 60 ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300" :
                "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
              )}>
                {formatTime(timeRemaining)}
              </div>
            )}
          </div>
          
          <Progress 
            value={((currentQuestionIndex + (isSubmitted ? 1 : 0)) / quiz.questions.length) * 100} 
            className="h-2 mt-4"
          />
        </CardHeader>

        <CardContent className="space-y-6">
          {!showResults ? (
            <>
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">
                  {currentQuestion.questionText}
                </h3>
                {currentQuestion.questionImage && (
                  <img 
                    src={currentQuestion.questionImage} 
                    alt="Question illustration" 
                    className="max-h-60 rounded-md border border-gray-200 dark:border-gray-700"
                  />
                )}
              </div>

              <RadioGroup 
                value={selectedAnswers[currentQuestionIndex]} 
                onValueChange={handleAnswerSelect}
                disabled={isSubmitted}
                className="space-y-3"
              >
                {currentQuestion.answerOptions.map((option, index) => (
                  <div 
                    key={index} 
                    className={cn(
                      "flex items-center space-x-3 p-3 rounded-md border",
                      "hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer",
                      selectedAnswers[currentQuestionIndex] === option.value && "border-primary",
                      isSubmitted && option.value === currentQuestion.correctAnswer && "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800",
                      isSubmitted && selectedAnswers[currentQuestionIndex] === option.value && option.value !== currentQuestion.correctAnswer && "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800"
                    )}
                    onClick={() => !isSubmitted && handleAnswerSelect(option.value)}
                  >
                    <RadioGroupItem 
                      value={option.value} 
                      id={`option-${currentQuestionIndex}-${index}`} 
                      className="h-5 w-5"
                    />
                    <Label 
                      htmlFor={`option-${currentQuestionIndex}-${index}`} 
                      className="flex-1 cursor-pointer"
                    >
                      {option.text}
                      {isSubmitted && option.value === currentQuestion.correctAnswer && (
                        <span className="ml-2 text-green-600 dark:text-green-400 inline-flex items-center">
                          <Check className="h-4 w-4 mr-1" />
                          Correct answer
                        </span>
                      )}
                      {isSubmitted && selectedAnswers[currentQuestionIndex] === option.value && option.value !== currentQuestion.correctAnswer && (
                        <span className="ml-2 text-red-600 dark:text-red-400 inline-flex items-center">
                          <AlertCircle className="h-4 w-4 mr-1" />
                          Your answer
                        </span>
                      )}
                    </Label>
                  </div>
                ))}
              </RadioGroup>

              {isSubmitted && currentQuestion.explanation && (
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-md border border-blue-200 dark:border-blue-800">
                  <h4 className="font-medium mb-2 flex items-center">
                    <ChevronRight className="h-4 w-4 mr-2" />
                    Explanation
                  </h4>
                  <p className="text-sm">{currentQuestion.explanation}</p>
                </div>
              )}
            </>
          ) : (
            <div className="space-y-6">
              <div className={cn(
                "p-6 rounded-lg text-center",
                score >= quiz.passingScore ? 
                  "bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800" :
                  "bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800"
              )}>
                <div className="flex flex-col items-center">
                  {score >= quiz.passingScore ? (
                    <>
                      <Trophy className="h-12 w-12 text-green-600 dark:text-green-400 mb-4" />
                      <h3 className="text-2xl font-bold text-green-600 dark:text-green-400 mb-2">
                        Congratulations!
                      </h3>
                      <p className="text-green-800 dark:text-green-200">
                        You passed with a score of {score}%
                      </p>
                    </>
                  ) : (
                    <>
                      <AlertCircle className="h-12 w-12 text-yellow-600 dark:text-yellow-400 mb-4" />
                      <h3 className="text-2xl font-bold text-yellow-600 dark:text-yellow-400 mb-2">
                        Quiz Completed
                      </h3>
                      <p className="text-yellow-800 dark:text-yellow-200">
                        Your score: {score}% (Minimum passing: {quiz.passingScore}%)
                      </p>
                    </>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold">Question Review</h4>
                <div className="space-y-2">
                  {quiz.questions.map((question, index) => (
                    <div 
                      key={index} 
                      className={cn(
                        "p-3 rounded-md border",
                        getQuestionFeedback(index) === 'Correct' ? "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800" :
                        getQuestionFeedback(index) === 'Incorrect' ? "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800" :
                        "bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                      )}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium">{question.questionText}</p>
                          <p className="text-sm mt-1">
                            Your answer: {selectedAnswers[index] !== undefined ? 
                              question.answerOptions.find(o => o.value === selectedAnswers[index])?.text : 
                              'Not answered'}
                          </p>
                          {getQuestionFeedback(index) === 'Incorrect' && (
                            <p className="text-sm mt-1 text-green-600 dark:text-green-400">
                              Correct answer: {question.answerOptions.find(o => o.value === question.correctAnswer)?.text}
                            </p>
                          )}
                        </div>
                        <span className={cn(
                          "px-2 py-1 rounded text-xs font-medium",
                          getQuestionFeedback(index) === 'Correct' ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300" :
                          getQuestionFeedback(index) === 'Incorrect' ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300" :
                          "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
                        )}>
                          {getQuestionFeedback(index)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </CardContent>

        <CardFooter className="flex justify-between">
          {!showResults ? (
            <>
              <Button
                variant="outline"
                onClick={() => setCurrentQuestionIndex(Math.max(0, currentQuestionIndex - 1))}
                disabled={currentQuestionIndex === 0 || isSubmitted}
              >
                Previous
              </Button>
              
              {!isSubmitted ? (
                <Button
                  onClick={hasAnswered ? handleNextQuestion : null}
                  disabled={!hasAnswered}
                >
                  {isLastQuestion ? 'Submit Quiz' : 'Next Question'}
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              ) : (
                <Button
                  onClick={() => setShowResults(true)}
                  variant="default"
                >
                  View Results
                </Button>
              )}
            </>
          ) : (
            <div className="w-full flex justify-center">
              <Button
                onClick={handleRestart}
                variant={score >= quiz.passingScore ? "default" : "outline"}
              >
                Retake Quiz
              </Button>
            </div>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

Quiz.propTypes = {
  quiz: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['quiz']).isRequired,
    questions: PropTypes.arrayOf(
      PropTypes.shape({
        questionText: PropTypes.string.isRequired,
        questionImage: PropTypes.string,
        answerOptions: PropTypes.arrayOf(
          PropTypes.shape({
            text: PropTypes.string.isRequired,
            value: PropTypes.string.isRequired,
          })
        ).isRequired,
        correctAnswer: PropTypes.string.isRequired,
        explanation: PropTypes.string,
      })
    ).isRequired,
    timeLimit: PropTypes.number, // in minutes
    passingScore: PropTypes.number, // percentage
  }).isRequired,
  onComplete: PropTypes.func,
};

Quiz.defaultProps = {
  quiz: {
    timeLimit: 0, // no time limit
    passingScore: 70, // default passing score
  },
};

export default Quiz;