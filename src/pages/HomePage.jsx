// src/pages/HomePage.jsx

import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";

const features = [
  {
    title: "Personalized Courses",
    description: "Generate learning paths tailored to your goals, skill level, and schedule.",
    icon: "🧠",
  },
  {
    title: "Interactive Learning",
    description: "Watch videos, practice coding, and take quizzes—all in one place.",
    icon: "💻",
  },
  {
    title: "Track Your Progress",
    description: "Visualize your achievements and stay motivated with dashboards and badges.",
    icon: "📈",
  },
];

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-b from-blue-50 to-white">
      <header className="w-full py-8 text-center">
        <h1 className="text-4xl font-extrabold text-blue-700 mb-2">
          Welcome to CourseCrafter
        </h1>
        <p className="text-lg text-gray-600 max-w-xl mx-auto">
          Build your own personalized learning journey. Generate courses, study interactively, and track your progress—all in one seamless platform.
        </p>
      </header>
      <section className="flex flex-col md:flex-row gap-6 justify-center mt-8 mb-12 w-full max-w-4xl px-4">
        {features.map((f, idx) => (
          <Card key={f.title} className="flex-1 shadow-md">
            <CardContent className="flex flex-col items-center py-6">
              <div className="text-4xl mb-3" role="img" aria-label={f.title + " icon"}>
                {f.icon}
              </div>
              <h2 className="text-xl font-semibold text-blue-800 mb-1">{f.title}</h2>
              <p className="text-gray-600 text-center">{f.description}</p>
            </CardContent>
          </Card>
        ))}
      </section>
      <div className="flex gap-4 mb-12">
        <Button
          size="lg"
          className="px-8"
          aria-label="Get Started"
          onClick={() => navigate("/course/react-fundamentals")}
        >
          Get Started
        </Button>
        <Button
          variant="outline"
          size="lg"
          className="px-8"
          aria-label="Log In"
          onClick={() => navigate("/login")}
        >
          Log In
        </Button>
      </div>
      <footer className="text-gray-400 text-sm py-4">
        &copy; {new Date().getFullYear()} CourseCrafter. All rights reserved.
      </footer>
    </div>
  );
};

export default HomePage;
