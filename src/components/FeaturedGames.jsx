import React from 'react';
import { Link } from 'react-router-dom';
import { Star, ChevronRight } from 'lucide-react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { GAMES_LIST_URL } from '../globals/apiUrls';
import { processImageUrl } from '../functions/imageUrl';

const FeaturedGames = () => {
  const { data: featuredGames, isLoading, error } = useQuery({
    queryKey: ['featuredGames'],
    queryFn: () => 
      axios.get(GAMES_LIST_URL)
          .then(response => response.data.data.slice(0, 4)),
          staleTime: 1000 * 60 * 5, // 5 minutes
          cacheTime: 1000 * 60 * 5
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {[...Array(4)].map((_, index) => (
          <div 
            key={index} 
            className={`group relative overflow-hidden rounded-xl h-96 shadow-xl animate-pulse ${index === 0 || index === 3 ? 'lg:col-span-2' : ''}`}
          >
            <div className="absolute inset-0 bg-gray-700"></div>
            <div className="absolute bottom-0 left-0 p-6 w-full">
              <div className="flex items-center mb-2">
                <div className="h-8 bg-gray-600 rounded w-16"></div>
                <div className="flex gap-2 ml-2">
                  <div className="h-6 bg-gray-600 rounded w-20"></div>
                  <div className="h-6 bg-gray-600 rounded w-20"></div>
                </div>
              </div>
              <div className="h-8 bg-gray-600 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-600 rounded w-full mb-4"></div>
              <div className="flex gap-2 mb-4">
                <div className="h-6 bg-gray-600 rounded w-16"></div>
                <div className="h-6 bg-gray-600 rounded w-16"></div>
                <div className="h-6 bg-gray-600 rounded w-16"></div>
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
        Failed to load featured games
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {featuredGames.map((game, index) => (
        <Link 
          key={game.id}
          to={`/games/${game.slug}`}
          className={`group relative overflow-hidden rounded-xl h-96 shadow-xl ${index === 0 || index === 3 ? 'lg:col-span-2' : ''}`}>
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/70 to-transparent z-10"></div>
          <img 
            src={processImageUrl(game.background_image)}
            alt={game.name} 
            className="absolute inset-0 w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
            />
          
          <div className="absolute bottom-0 left-0 p-6 z-20 w-full">
            <div className="flex items-center mb-2">
              <div className="flex items-center bg-purple-600 px-2 py-1 rounded-md">
                <Star className="w-4 h-4 mr-1 text-yellow-400 fill-yellow-400" />
                <span className="text-white font-bold">{game.rating}</span>
              </div>
              <div className="flex gap-2 ml-2">
                {game.genres?.slice(0, 2).map((genre, index) => (
                  <span key={index} className="text-gray-300 text-sm rounded-xl px-1.5 py-0.5 bg-violet-900/50 backdrop-blur-sm">
                    {genre.name}
                  </span>
                ))}
                {(!game.genres || game.genres.length === 0) && (
                  <span className="text-gray-300 text-sm rounded-xl px-1.5 py-0.5 bg-violet-900/50 backdrop-blur-sm">
                    Uncategorized
                  </span>
                )}
              </div>
            </div>
            
            <h3 className="text-xl md:text-2xl font-bold text-white mb-2">{game.name}</h3>
            <p className="text-gray-300 text-sm mb-4 line-clamp-2">{game.description_raw}</p>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {game.platforms?.slice(0, 3).map((platform, i) => (
                <span key={i} className="px-2 py-1 bg-gray-800/80 text-xs rounded text-gray-300">
                  {platform.platform?.name || platform.name || 'Unknown Platform'}
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