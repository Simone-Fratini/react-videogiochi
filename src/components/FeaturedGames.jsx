import React from 'react';
import { Link } from 'react-router-dom';
import { games } from '../data/games';
import { Star, ChevronRight } from 'lucide-react';

// Get 3 featured games
const featuredGames = games
  .filter(game => game.featured)
  .slice(0, 3);

const FeaturedGames = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {featuredGames.map((game, index) => (
        <Link 
          key={game.id}
          to={`/games/${game.id}`}
          className={`group relative overflow-hidden rounded-xl h-96 shadow-xl ${
            index === 0 ? 'lg:col-span-2 lg:row-span-2' : ''
          }`}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/70 to-transparent z-10"></div>
          <img 
            src={game.coverImage} 
            alt={game.title} 
            className="absolute inset-0 w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
          />
          
          <div className="absolute bottom-0 left-0 p-6 z-20 w-full">
            <div className="flex items-center mb-2">
              <div className="flex items-center bg-purple-600 px-2 py-1 rounded-md">
                <Star className="w-4 h-4 mr-1 text-yellow-400 fill-yellow-400" />
                <span className="text-white font-bold">{game.rating}</span>
              </div>
              <span className="ml-2 text-gray-300 text-sm">{game.category}</span>
            </div>
            
            <h3 className="text-xl md:text-2xl font-bold text-white mb-2">{game.title}</h3>
            <p className="text-gray-300 text-sm mb-4 line-clamp-2">{game.description}</p>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {game.platforms.slice(0, 3).map((platform, i) => (
                <span key={i} className="px-2 py-1 bg-gray-800/80 text-xs rounded text-gray-300">
                  {platform}
                </span>
              ))}
            </div>
            
            <span className="inline-flex items-center text-purple-400 font-medium group-hover:text-purple-300 transition-colors">
              View Details <ChevronRight className="ml-1 w-4 h-4" />
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default FeaturedGames;