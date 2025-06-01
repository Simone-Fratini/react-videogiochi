import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { GENRES_URL } from '../globals/apiUrls';

const desiredGenres = ['Action', 'Adventure', 'RPG', 'Strategy', 'Sports', 'Simulation', 'Racing', 'Indie'];

const GameCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(GENRES_URL)
      .then(response => {
        const filteredGenres = response.data.filter(genre => 
          desiredGenres.includes(genre.name)
        );
        setCategories(filteredGenres);
      })
      .catch(error => {
        console.error('Error fetching genres:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {[...Array(8)].map((_, index) => (
          <div key={index} className="h-40 bg-gray-800 rounded-xl animate-pulse"></div>
        ))}
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
          ></div>
          <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-80 z-10`}></div>
          <div className="absolute inset-0 flex items-center justify-center z-20">
            <h3 className="text-xl font-bold text-white">{category.name}</h3>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default GameCategories;