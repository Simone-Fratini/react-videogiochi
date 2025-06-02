import React from 'react';
import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';

const GameCard = ({ game }) => {
  return (
    <Link 
      to={`/games/${game.id}`}
      className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transform transition-all duration-300 hover:scale-[1.02] hover:shadow-purple-900/20 group"
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={game.background_image} 
          alt={game.name} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
        
        {/* Rating Badge */}
        <div className="absolute bottom-2 left-2 flex items-center">
          <div className="flex items-center bg-purple-600 px-2 py-1 rounded-md text-sm">
            <Star className="w-4 h-4 mr-1 text-yellow-400 fill-yellow-400" />
            <span className="font-bold text-white">{game.rating}</span>
          </div>
        </div>
        
        {/* Platform Icons on top right */}
        <div className="absolute top-2 right-2 flex space-x-1">
          {game.platforms?.slice(0, 3).map((platform, index) => (
            <span 
              key={index}
              className="bg-gray-900/80 text-xs text-white px-2 py-1 rounded"
            >
              {platform.platform?.name?.slice(0, 2) || platform.name?.slice(0, 2) || 'PC'}
            </span>
          ))}
          {game.platforms?.length > 3 && (
            <span className="bg-gray-900/80 text-xs text-white px-2 py-1 rounded">
              +{game.platforms.length - 3}
            </span>
          )}
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-bold text-white mb-1 group-hover:text-purple-400 transition-colors">
          {game.name}
        </h3>
        <p className="text-sm text-gray-400 mb-2">{game.developers?.[0]?.name || 'Unknown Developer'}</p>
        
        <div className="flex flex-wrap gap-2 mb-3">
          {game.genres?.slice(0, 2).map((genre, index) => (
            <span key={index} className="px-2 py-1 bg-gray-700 text-xs rounded text-gray-300">
              {genre.name}
            </span>
          ))}
        </div>
        
        <p className="text-gray-400 text-sm line-clamp-2">
          {game.description_raw || game.description}
        </p>
      </div>
    </Link>
  );
};

export default GameCard;