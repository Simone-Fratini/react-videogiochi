import React from 'react'
import { useState } from 'react'
import { Star, Trophy, Medal, Award, TrendingUp } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { TOP_RATED_URL } from '../globals/apiUrls';
import { useNavigate } from 'react-router-dom';

function TopRatedGames() {
    const navigate = useNavigate();
    const [selectedPlatform, setSelectedPlatform] = useState('All');

    const platforms = ['All','PlayStation 4', 'Playstation 5', 'Xbox', 'Nintendo Switch', 'PC', 'Wii', 'IOS', 'Xbox Series S/X'];

    const { data, isLoading, error } = useQuery({
        queryKey: ['topRated', selectedPlatform],
        queryFn: () => 
            axios.get( TOP_RATED_URL, {
                params: {
                    platform: selectedPlatform
                }
            }).then(response => response.data),
        staleTime: 1000 * 60 * 5, // 5 minutes
        cacheTime: 1000 * 60 * 5
    })
    console.log(data);

    const getPositionStyle = (index) => {
    if (index === 0) return 'bg-yellow-500/20 border-yellow-500';
    if (index === 1) return 'bg-gray-300/20 border-gray-300';
    if (index === 2) return 'bg-amber-600/20 border-amber-600';
    return 'bg-gray-800 border-gray-700';
  };

  const getPositionIcon = (index) => {
    if (index === 0) return <Trophy className="w-6 h-6 text-yellow-500" />;
    if (index === 1) return <Medal className="w-6 h-6 text-gray-300" />;
    if (index === 2) return <Award className="w-6 h-6 text-amber-600" />;
    return <TrendingUp className="w-6 h-6 text-purple-500" />;
  };

  if (isLoading) {
    return (
      <div className='min-h-screen'>
        <div className='container mx-auto px-4 py-12'>
            <div className="text-center mb-2">
                <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">Top Rated Games</h1>
                <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                    Discover the highest-rated games loved by our community
                 </p>
            </div>
        </div>

        {/* Platform Filter */}
        <div className='flex flex-wrap justify-center gap-2 mb-8'>
            {platforms.map((platform) => (
                <button
                    key={platform} 
                    className={`px-4 py-2 rounded-full transition-all cursor-pointer ${
                    selectedPlatform === platform
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`} 
                    onClick={() => setSelectedPlatform(platform)}
                    >
                    {platform}
                </button>
            ))}
        </div>

        {/* Loading Spinner */}
        <div className="flex items-center justify-center py-12">
            <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }
  
    return (
    <div className='min-h-screen'>
        <div className='container mx-auto px-4 py-12'>
            <div className="text-center mb-2">
                <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">Top Rated Games</h1>
                <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                    Discover the highest-rated games loved by our community
                 </p>
            </div>

            {/* Platform Filter */}

            <div className='flex flex-wrap justify-center gap-2 mb-8'>
                {platforms.map((platform) => (
                    <button
                    key={platform} 
                    className={`px-4 py-2 rounded-full transition-all cursor-pointer ${
                        selectedPlatform === platform
                        ? 'bg-purple-600 text-white'
                        : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`} 
                        onClick={() => setSelectedPlatform(platform)}
                        >
                        {platform}
                    </button>
                ))}
            </div>

            {/* Games */}

            <div className='space-y-5'>
                {data.map((game, index) =>(
                    <div
                    key={game.id}
                    onClick={() => navigate(`/games/${game.slug}`)}
                    className={`border rounded-xl p-4 transition-all hover:scale-[1.01] ${getPositionStyle(index)}`}
                    >
                    <div className='flex items-center gap-6'>
                        <div className="flex-shrink-0 relative">
                            <img
                              src={game.background_image}
                              alt={game.name}
                              className="w-32 h-32 object-cover rounded-lg"
                              />
                            <div className="absolute -top-3 -left-3">
                                {getPositionIcon(index)}
                            </div>
                        </div>

                        <div className='flex-grow'>
                            <div className="flex items-center justify-between mb-2">
                                <h2 className="text-xl font-bold text-white">{game.name}</h2>
                                <div className="flex items-center bg-purple-600/30 px-3 py-1 rounded-full">
                                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400 mr-1" />
                                    <span className="text-white font-bold">{(game.metacritic / 10).toFixed(1)}</span>
                                </div>
                            </div>

                            <p className="text-gray-400 text-sm mb-3">{game.developer = null ? game.developer : 'Unknown developer'}</p>
                            <p className="text-gray-300 line-clamp-2 mb-3">{game.description_raw}</p>

                            <div className='flex flex-wrap gap-2'>
                                <span className="px-3 py-1 bg-gray-700/50 rounded-full text-sm text-gray-300 border">
                                    {game.genres[0].name}
                                </span>
                                {game.platforms.slice(0, 3).map((platform, i) => (
                                    <span
                                      key={i}
                                      className="px-3 py-1 bg-gray-700/50 rounded-full text-sm text-gray-300"
                                    >
                                        {platform.name}
                                    </span>
                                ))}
                                {game.platforms.length > 3 && (
                                  <span className="px-3 py-1 bg-gray-700/50 rounded-full text-sm text-gray-300">
                                    +{game.platforms.length - 3} more
                                  </span>
                                )}
                            </div>

                        </div>
                    </div>
                
                    </div>
                ))}


            </div>
        
        </div>
    </div>
  )
}

export default TopRatedGames