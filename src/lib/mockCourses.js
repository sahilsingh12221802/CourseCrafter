// src/lib/mockCourses.js
export const mockCourse = {
  id: "course_1",
  title: "Complete C++ Course",
  currentModuleId: "mod_1",
  modules: [
    {
      id: "mod_1",
      title: "C++ Fundamentals",
      duration: "45 minutes",
      type: "video",
      videoContent: {
        url: "https://example.com/cpp-intro", // Replace with real embed URL
        description: "Introduction to C++ syntax and basic concepts"
      },
      codeChallenge: {
        title: "Hello World",
        description: "Create your first C++ program",
        starterCode: `#include <iostream>\n\nint main() {\n  // Your code here\n  return 0;\n}`,
        solution: `#include <iostream>\n\nint main() {\n  std::cout << "Hello World!";\n  return 0;\n}`
      },
      quizQuestions: [
        {
          question: "What is the correct way to print in C++?",
          options: [
            "print()",
            "console.log()",
            "std::cout",
            "System.out.println()"
          ],
          answer: 2
        }
      ],
      hasPrevious: false,
      hasNext: true
    },
    {
      id: "mod_2",
      title: "Object-Oriented Programming",
      duration: "1 hour",
      type: "interactive",
      hasPrevious: true,
      hasNext: true
    }
  ]
};