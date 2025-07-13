import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from '../src/components/ui/Toaster';
import { ThemeProvider } from '../src/lib/hooks/useTheme';
import { AuthProvider } from '../src/lib/hooks/useAuth';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import CoursePage from './pages/CoursePage'; 
import ProtectedRoute from './components/ProtectedRoute';

/**
 * App - Main application router and layout
 */
export const App = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              
              {/* Protected routes */}
              <Route element={<ProtectedRoute />}>
                <Route path="/generate" element={<CoursePage />} />
                <Route path="/course/:courseId" element={<CoursePage />}>
                  <Route path="module/:moduleId/lesson/:lessonId" element={null} />
                  <Route path="dashboard" element={null} />
                </Route>
              </Route>
              
              {/* 404 catch-all */}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
            <Toaster />
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
};

// Simple 404 page component
const NotFoundPage = () => (
  <div className="flex items-center justify-center h-screen">
    <div className="text-center">
      <h1 className="text-4xl font-bold mb-4">404</h1>
      <p className="text-xl">Page not found</p>
    </div>
  </div>
);

export default App;