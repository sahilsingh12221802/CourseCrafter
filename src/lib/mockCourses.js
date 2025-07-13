export const mockCourses = [
  {
    id: 'course-1',
    title: 'Introduction to React',
    description: 'Learn React fundamentals with hands-on projects',
    difficulty: 'beginner',
    estimatedWeeks: 4,
    hoursPerWeek: 5,
    recommendedPace: 75,
    modules: [
      {
        id: 'module-1',
        title: 'React Basics',
        description: 'Core concepts of React',
        duration: 3,
        lessons: [
          {
            id: 'lesson-1',
            title: 'What is React?',
            type: 'video',
            duration: 15,
            completed: true
          },
          {
            id: 'lesson-2',
            title: 'Your First Component',
            type: 'coding',
            duration: 30,
            completed: false
          }
        ]
      }
    ]
  }
];

// Mock user data
export const mockUser = {
  id: 'user-1',
  name: 'John Doe',
  email: 'john@example.com',
  progress: {
    completedCourses: 2,
    ongoingCourses: 3,
    totalMinutes: 1250
  }
};