// src/lib/mockCourses.js

const mockCourses = [
  {
    id: "react-fundamentals",
    title: "React Fundamentals",
    description: "A beginner-friendly course on building user interfaces with React.",
    progress: [
      { label: "Introduction", value: 100 },
      { label: "Components", value: 80 },
      { label: "Hooks", value: 40 },
    ],
    modules: [
      {
        id: "intro",
        title: "Introduction",
        lessons: [
          {
            id: "video-1",
            type: "video",
            title: "Welcome to React",
            description: "An overview of React and what you'll learn.",
            videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
            captionsUrl: "",
          },
          {
            id: "quiz-1",
            type: "quiz",
            prompt: "What is React?",
            options: [
              "A JavaScript library for building user interfaces",
              "A CSS framework",
              "A database",
              "A server-side language"
            ],
            answer: 0,
          },
        ],
        resources: [
          {
            title: "React Official Docs",
            url: "https://react.dev/",
            type: "link",
            description: "The official React documentation.",
          },
        ],
      },
      {
        id: "components",
        title: "Components",
        lessons: [
          {
            id: "video-2",
            type: "video",
            title: "Understanding Components",
            description: "Learn about functional and class components.",
            videoUrl: "https://www.w3schools.com/html/movie.mp4",
            captionsUrl: "",
          },
          {
            id: "code-1",
            type: "code",
            language: "JavaScript",
            initialCode: `function Welcome() {\n  return <h1>Hello, World!</h1>;\n}`,
            placeholder: "// Write a React component here",
          },
        ],
        resources: [
          {
            title: "Component Cheatsheet",
            url: "/files/react-components.pdf",
            type: "pdf",
            description: "Quick reference for React components.",
          },
        ],
      },
      {
        id: "hooks",
        title: "Hooks",
        lessons: [
          {
            id: "video-3",
            type: "video",
            title: "Introducing Hooks",
            description: "What are hooks and why use them?",
            videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
            captionsUrl: "",
          },
          {
            id: "quiz-2",
            type: "quiz",
            prompt: "Which hook is used for state management?",
            options: ["useState", "useEffect", "useContext", "useMemo"],
            answer: 0,
          },
        ],
        resources: [
          {
            title: "Hooks Reference",
            url: "https://react.dev/reference/react/hooks",
            type: "link",
            description: "Official documentation for React hooks.",
          },
        ],
      },
    ],
  },
];

export default mockCourses;
