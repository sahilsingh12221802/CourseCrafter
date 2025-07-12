// src/pages/LoginPage.jsx

import React from "react";
import { Button } from "../components/ui/button";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-blue-50">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-sm">
        <h2 className="text-2xl font-bold text-blue-700 mb-6 text-center">Log In</h2>
        <form
          onSubmit={e => {
            e.preventDefault();
            navigate("/course/react-fundamentals");
          }}
        >
          <input
            type="email"
            placeholder="Email"
            className="w-full mb-4 p-2 border rounded"
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full mb-6 p-2 border rounded"
            required
          />
          <Button type="submit" className="w-full">Log In</Button>
        </form>
        <Button
          variant="link"
          className="mt-4 w-full"
          onClick={() => navigate("/")}
        >
          Back to Home
        </Button>
      </div>
    </div>
  );
};

export default LoginPage;
