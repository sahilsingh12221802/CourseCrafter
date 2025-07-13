// src/components/CourseCrafterLogo.jsx
import React from 'react';

export const CourseCrafterLogo = ({ className }) => (
  <svg 
    className={className}
    viewBox="0 0 100 100" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path 
      d="M50 100C77.6142 100 100 77.6142 100 50C100 22.3858 77.6142 0 50 0C22.3858 0 0 22.3858 0 50C0 77.6142 22.3858 100 50 100Z" 
      fill="currentColor"
    />
    <path 
      d="M30 30L70 30L70 50L50 70L30 50L30 30Z" 
      fill="white"
    />
    <path 
      d="M40 40L60 40L60 50L50 60L40 50L40 40Z" 
      fill="#3B82F6"
    />
  </svg>
);

export default CourseCrafterLogo;