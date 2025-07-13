import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { BookOpen, Clock, BarChart2, ChevronDown, ChevronRight, Sparkles } from 'lucide-react';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Slider } from '../ui/slider';
import { Textarea } from '../ui/textarea';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../ui/card';
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '../ui/collapsible';
import { useTheme } from '../../lib/hooks/useTheme';
import { useAIGenerator } from '../../lib/hooks/useAIGenerator';

/**
 * TopicInput - Course configuration form for personalized course generation
 * @param {Object} props
 * @param {Function} props.onSubmit - Callback with form data
 * @param {Function} props.onCancel - Callback when form is canceled
 */
export const TopicInput = ({ onSubmit, onCancel }) => {
  const { theme } = useTheme();
  const { generateCourse, isGenerating, error } = useAIGenerator();
  const [formData, setFormData] = useState({
    topic: '',
    description: '',
    difficulty: 'beginner',
    timeCommitment: 5,
    learningStyle: 'visual',
    priorKnowledge: '',
    goals: '',
    preferences: ''
  });
  const [advancedExpanded, setAdvancedExpanded] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  // Difficulty options
  const difficultyOptions = [
    { value: 'beginner', label: 'Beginner', icon: <BarChart2 className="h-4 w-4 mr-2" /> },
    { value: 'intermediate', label: 'Intermediate', icon: <BarChart2 className="h-4 w-4 mr-2" /> },
    { value: 'advanced', label: 'Advanced', icon: <BarChart2 className="h-4 w-4 mr-2" /> }
  ];

  // Learning style options
  const learningStyleOptions = [
    { value: 'visual', label: 'Visual' },
    { value: 'auditory', label: 'Auditory' },
    { value: 'reading', label: 'Reading/Writing' },
    { value: 'kinesthetic', label: 'Hands-on' },
    { value: 'mixed', label: 'Mixed' }
  ];

  // Handle form input changes
  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    // Clear validation error when field is updated
    if (validationErrors[field]) {
      setValidationErrors(prev => ({
        ...prev,
        [field]: undefined
      }));
    }
  };

  // Validate form
  const validateForm = () => {
    const errors = {};
    if (!formData.topic.trim()) {
      errors.topic = 'Topic is required';
    }
    if (!formData.description.trim()) {
      errors.description = 'Description is required';
    }
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const generatedCourse = await generateCourse(formData);
      onSubmit?.(generatedCourse);
    } catch (err) {
      console.error('Course generation failed:', err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-2xl flex items-center">
            <Sparkles className="h-6 w-6 mr-2 text-primary" />
            Create Your Personalized Course
          </CardTitle>
          <CardDescription>
            Fill out the form below to generate a customized learning path
          </CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <h3 className="font-semibold flex items-center">
                <BookOpen className="h-5 w-5 mr-2" />
                What do you want to learn?
              </h3>

              <div className="space-y-3">
                <div>
                  <Label htmlFor="topic">Topic *</Label>
                  <Input
                    id="topic"
                    placeholder="e.g., Machine Learning, Web Development, Spanish"
                    value={formData.topic}
                    onChange={(e) => handleChange('topic', e.target.value)}
                    disabled={isGenerating}
                  />
                  {validationErrors.topic && (
                    <p className="text-sm text-red-500 mt-1">{validationErrors.topic}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe what you want to learn in more detail"
                    value={formData.description}
                    onChange={(e) => handleChange('description', e.target.value)}
                    disabled={isGenerating}
                    rows={3}
                  />
                  {validationErrors.description && (
                    <p className="text-sm text-red-500 mt-1">{validationErrors.description}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Course Configuration */}
            <div className="space-y-4">
              <h3 className="font-semibold flex items-center">
                <Clock className="h-5 w-5 mr-2" />
                Course Configuration
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="difficulty">Difficulty Level</Label>
                  <Select
                    value={formData.difficulty}
                    onValueChange={(value) => handleChange('difficulty', value)}
                    disabled={isGenerating}
                  >
                    <SelectTrigger id="difficulty">
                      <SelectValue placeholder="Select difficulty" />
                    </SelectTrigger>
                    <SelectContent>
                      {difficultyOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          <div className="flex items-center">
                            {option.icon}
                            {option.label}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="learningStyle">Preferred Learning Style</Label>
                  <Select
                    value={formData.learningStyle}
                    onValueChange={(value) => handleChange('learningStyle', value)}
                    disabled={isGenerating}
                  >
                    <SelectTrigger id="learningStyle">
                      <SelectValue placeholder="Select learning style" />
                    </SelectTrigger>
                    <SelectContent>
                      {learningStyleOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="md:col-span-2">
                  <Label htmlFor="timeCommitment">
                    Weekly Time Commitment: {formData.timeCommitment} hours
                  </Label>
                  <Slider
                    id="timeCommitment"
                    min={1}
                    max={20}
                    step={1}
                    value={[formData.timeCommitment]}
                    onValueChange={([value]) => handleChange('timeCommitment', value)}
                    disabled={isGenerating}
                  />
                  <div className="flex justify-between text-sm text-gray-500 mt-1">
                    <span>Light</span>
                    <span>Intensive</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Advanced Options */}
            <Collapsible
              open={advancedExpanded}
              onOpenChange={setAdvancedExpanded}
              className="space-y-4"
            >
              <CollapsibleTrigger className="w-full">
                <div className="flex items-center text-sm font-medium text-primary">
                  {advancedExpanded ? (
                    <ChevronDown className="h-4 w-4 mr-2" />
                  ) : (
                    <ChevronRight className="h-4 w-4 mr-2" />
                  )}
                  Advanced Options
                </div>
              </CollapsibleTrigger>

              <CollapsibleContent className="space-y-4">
                <div>
                  <Label htmlFor="priorKnowledge">Prior Knowledge</Label>
                  <Textarea
                    id="priorKnowledge"
                    placeholder="Describe any prior knowledge you have on this topic"
                    value={formData.priorKnowledge}
                    onChange={(e) => handleChange('priorKnowledge', e.target.value)}
                    disabled={isGenerating}
                    rows={2}
                  />
                </div>

                <div>
                  <Label htmlFor="goals">Specific Learning Goals</Label>
                  <Textarea
                    id="goals"
                    placeholder="What specific skills or knowledge do you want to gain?"
                    value={formData.goals}
                    onChange={(e) => handleChange('goals', e.target.value)}
                    disabled={isGenerating}
                    rows={2}
                  />
                </div>

                <div>
                  <Label htmlFor="preferences">Additional Preferences</Label>
                  <Textarea
                    id="preferences"
                    placeholder="Any other preferences (e.g., preferred tools, frameworks)"
                    value={formData.preferences}
                    onChange={(e) => handleChange('preferences', e.target.value)}
                    disabled={isGenerating}
                    rows={2}
                  />
                </div>
              </CollapsibleContent>
            </Collapsible>

            {error && (
              <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-md border border-red-200 dark:border-red-800">
                <p className="text-red-600 dark:text-red-400">{error}</p>
              </div>
            )}
          </CardContent>

          <CardFooter className="flex justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              disabled={isGenerating}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isGenerating}
            >
              {isGenerating ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Generating Course...
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4 mr-2" />
                  Generate Course
                </>
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

TopicInput.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func,
};

export default TopicInput;