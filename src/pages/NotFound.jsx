import React from 'react';
import { Link } from 'react-router-dom';
import { Gamepad } from 'lucide-react';
import FuzzyText from '../utils/FuzzyText';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <div className="flex justify-center mb-6">
          <Gamepad className="h-24 w-24 text-purple-500 animate-bounce" />
        </div>
        <FuzzyText 
          baseIntensity={0.2} 
        >
          404
        </FuzzyText>
        <h2 className="text-2xl font-semibold text-gray-300 mb-6">Page Not Found</h2>
        <p className="text-gray-400 mb-8 max-w-md mx-auto">
          Oops! The game you're looking is gone...
        </p>
        <Link 
          to="/"
          className="inline-flex items-center px-6 py-3 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 transition-colors"
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;