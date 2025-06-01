import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Star, ChevronRight } from 'lucide-react';
import axios from 'axios';
import { TOP_RATED_URL } from '../globals/apiUrls';
import { processImageUrl } from '../functions/imageUrl';

const TopRatedGames = () => {
  const [topRatedGames, setTopRatedGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(TOP_RATED_URL)
      .then(response => {
        setTopRatedGames(response.data.slice(0, 6));
        setError(null);
      })
      .catch(error => {
        console.error('Error fetching top rated games:', error);
        setError('Failed to load top rated games');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="flex bg-gray-800 rounded-lg overflow-hidden animate-pulse">
            <div className="w-1/3 bg-gray-700"></div>
            <div className="w-2/3 p-4">
              <div className="h-4 bg-gray-700 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-gray-700 rounded w-1/2 mb-4"></div>
              <div className="flex gap-2">
                <div className="h-6 bg-gray-700 rounded w-16"></div>
                <div className="h-6 bg-gray-700 rounded w-16"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center py-4">
        {error}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {topRatedGames.map(game => (
        <Link
          key={game.id}
          to={`/games/${game.slug}`}
          className="flex bg-gray-800 rounded-lg overflow-hidden hover:bg-gray-750 transition-colors group"
        >
          <div className="w-1/3 relative">
            <img 
              src={processImageUrl(game.background_image)} 
              alt={game.name} 
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
              {game.name}
            </h3>
            <div className="flex flex-wrap gap-1 mb-2">
              {game.platforms?.slice(0, 2).map((platform, index) => (
                <span key={index} className="text-xs bg-gray-700 px-2 py-0.5 rounded text-gray-300">
                  {platform.platform?.name || platform.name || 'Unknown Platform'}
                </span>
              ))}
              {game.platforms?.length > 2 && (
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