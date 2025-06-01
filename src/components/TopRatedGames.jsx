import React from 'react';
import { Link } from 'react-router-dom';
import { Star, ChevronRight } from 'lucide-react';
import { games } from '../data/games';

// Get top 6 rated games
const topRatedGames = [...games]
  .sort((a, b) => b.rating - a.rating)
  .slice(0, 6);

const TopRatedGames = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {topRatedGames.map(game => (
        <Link
          key={game.id}
          to={`/games/${game.id}`}
          className="flex bg-gray-800 rounded-lg overflow-hidden hover:bg-gray-750 transition-colors group"
        >
          <div className="w-1/3 relative">
            <img 
              src={game.coverImage} 
              alt={game.title} 
              className="h-full w-full object-cover"
            />
            <div className="absolute top-2 left-2">
              <div className="flex items-center bg-purple-600 px-2 py-1 rounded-md">
                <Star className="w-3 h-3 mr-1 text-yellow-400 fill-yellow-400" />
                <span className="text-white text-xs font-bold">{game.rating}</span>
              </div>
            </div>
          </div>
          
          <div className="w-2/3 p-4">
            <h3 className="text-white font-medium group-hover:text-purple-400 transition-colors mb-1">
              {game.title}
            </h3>
            <p className="text-gray-400 text-xs mb-2">{game.developer}</p>
            <div className="flex flex-wrap gap-1 mb-2">
              {game.platforms.slice(0, 2).map((platform, index) => (
                <span key={index} className="text-xs bg-gray-700 px-2 py-0.5 rounded text-gray-300">
                  {platform.split(' ')[0]}
                </span>
              ))}
              {game.platforms.length > 2 && (
                <span className="text-xs bg-gray-700 px-2 py-0.5 rounded text-gray-300">
                  +{game.platforms.length - 2}
                </span>
              )}
            </div>
            <div className="mt-auto">
              <span className="inline-flex items-center text-xs text-purple-400 group-hover:text-purple-300 transition-colors">
                View Game <ChevronRight className="ml-1 w-3 h-3" />
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default TopRatedGames;