import React from 'react';
import { Link } from 'react-router-dom';

const categories = [
  {
    id: 'action',
    name: 'Action',
    icon: 'https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg',
    color: 'from-red-600 to-orange-600'
  },
  {
    id: 'adventure',
    name: 'Adventure',
    icon: 'https://images.pexels.com/photos/269583/pexels-photo-269583.jpeg',
    color: 'from-green-600 to-emerald-600'
  },
  {
    id: 'rpg',
    name: 'RPG',
    icon: 'https://images.pexels.com/photos/8885028/pexels-photo-8885028.jpeg',
    color: 'from-blue-600 to-indigo-600'
  },
  {
    id: 'strategy',
    name: 'Strategy',
    icon: 'https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg',
    color: 'from-yellow-600 to-amber-600'
  },
  {
    id: 'sports',
    name: 'Sports',
    icon: 'https://images.pexels.com/photos/46798/the-ball-stadion-football-the-pitch-46798.jpeg',
    color: 'from-teal-600 to-cyan-600'
  },
  {
    id: 'simulation',
    name: 'Simulation',
    icon: 'https://images.pexels.com/photos/7915528/pexels-photo-7915528.jpeg',
    color: 'from-purple-600 to-violet-600'
  },
  {
    id: 'racing',
    name: 'Racing',
    icon: 'https://images.pexels.com/photos/12801/pexels-photo-12801.jpeg',
    color: 'from-pink-600 to-rose-600'
  },
  {
    id: 'indie',
    name: 'Indie',
    icon: 'https://images.pexels.com/photos/735911/pexels-photo-735911.jpeg',
    color: 'from-indigo-600 to-purple-600'
  }
];

const GameCategories = () => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      {categories.map(category => (
        <Link 
          key={category.id}
          to={`/games?category=${category.name}`}
          className="relative group overflow-hidden rounded-xl h-40 transition-transform hover:-translate-y-1"
        >
          <div className="absolute inset-0 bg-gradient-to-br bg-opacity-80 z-0 transition-opacity duration-300 group-hover:opacity-90"
            style={{ backgroundImage: `url(${category.icon})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
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