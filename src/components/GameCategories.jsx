import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { GENRES_URL } from '../globals/apiUrls';

const importantGenres = ['Action', 'Adventure', 'RPG', 'Strategy', 'Sports', 'Simulation', 'Racing', 'Indie'];

const GameCategories = () => {
  const { data: categories, isLoading, error } = useQuery({
    queryKey: ['gameCategories'],
    queryFn: () => 
      axios.get(GENRES_URL)
        .then(response => response.data.filter(genre => 
          importantGenres.includes(genre.name)
        )),
    staleTime: 1000 * 60 * 5, // 5 minutes
    cacheTime: 1000 * 60 * 5
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {[...Array(8)].map((_, index) => (
          <div key={index} className="relative group overflow-hidden rounded-xl h-40 animate-pulse">
            <div className="absolute inset-0 bg-gray-700"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-6 bg-gray-600 rounded w-24"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center py-4">
        Failed to load game categories
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      {categories.map(category => (
        <Link 
          key={category.id}
          to={`/games/?category=${category.slug}`}
          className="relative group overflow-hidden rounded-xl h-40 transition-transform hover:-translate-y-1"
        >
          <div className="absolute inset-0 bg-gradient-to-br bg-opacity-80 z-0 transition-opacity duration-300 group-hover:opacity-90"
            style={{ backgroundImage: `url(${category.background_image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
          >
            
          </div>
          <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-90 z-10`}></div>
          <div className="absolute inset-0 flex items-center justify-center z-20">
            <h3 className="text-xl font-bold text-white">{category.name}</h3>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default GameCategories;