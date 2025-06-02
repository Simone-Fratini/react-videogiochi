import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, ChevronLeft, Monitor, Smartphone, Gamepad, Clock, Calendar, Users } from 'lucide-react';
import { BASE_URL } from '../globals/apiUrls';
import { processImageUrl } from '../functions/imageUrl';
import axios from 'axios';

const GameDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    axios.get(`${BASE_URL}/api/games/${slug}`)
      .then(response => {
        console.log(`/api/games/${slug}`);
        console.log(response.data);
        setGame(response.data);
      })
      .catch(err => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [slug]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500 mx-auto"></div>
      </div>
    );
  }

  if (error || !game) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold text-gray-200">Game not found</h2>
        <button 
          onClick={() => navigate('/games')}
          className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
        >
          Back to Games
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back Button */}
      <button 
        onClick={() => navigate('/games')}
        className="mb-6 flex items-center text-gray-400 hover:text-white transition-colors"
      >
        <ChevronLeft className="mr-1" />
        Back to Games
      </button>
      
      {/* Game Header */}
      <div className="flex flex-col md:flex-row gap-8 mb-8">
        <div className="md:w-1/3">
          <div className="relative overflow-hidden rounded-lg bg-gray-800 shadow-xl h-80 md:h-96">
            <img 
              src={processImageUrl(game.background_image)} 
              alt={game.name} 
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 p-4">
              <div className="flex items-center mb-2">
                <div className="flex items-center bg-purple-600 px-3 py-1 rounded-full">
                  <Star className="w-4 h-4 mr-1 text-yellow-400 fill-yellow-400" />
                  <span className="text-white font-bold">{game.rating}</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {game.platforms?.map((platform) => (
                  <span 
                    key={platform.id} 
                    className="px-2 py-1 mt-2 bg-gray-700 text-xs rounded-md text-gray-300 flex items-center"
                  >
                    {platform.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        <div className="md:w-2/3">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-white">{game.name}</h1>
          
          <div className="flex flex-wrap gap-3 mb-6">
            {game.genres?.map((genre) => (
              <span 
                key={genre.id} 
                className={`px-3 py-1 rounded-full text-sm text-white bg-gradient-to-r from-violet-500/50 to-violet-800/50 backdrop-blur-2xl`}
              >
                {genre.name}
              </span>
            ))}
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
            <div className="flex items-center">
              <Calendar className="w-5 h-5 mr-2 text-purple-500" />
              <div>
                <p className="text-sm text-gray-400">Release Date</p>
                <p className="text-white">{game.released ? new Date(game.released).toLocaleDateString() : 'N/A'}</p>
              </div>
            </div>
            <div className="flex items-center">
              <Clock className="w-5 h-5 mr-2 text-purple-500" />
              <div>
                <p className="text-sm text-gray-400">Average Playtime</p>
                <p className="text-white">{game.playtime || 0} hours</p>
              </div>
            </div>
          </div>
          
          <div className="mb-6">
            <div className="flex border-b border-gray-700 mb-4">
              <button 
                className={`px-4 py-2 font-medium ${activeTab === 'overview' ? 'text-purple-500 border-b-2 border-purple-500' : 'text-gray-400 hover:text-white'}`}
                onClick={() => setActiveTab('overview')}
              >
                Overview
              </button>
              <button 
                className={`px-4 py-2 font-medium ${activeTab === 'tags' ? 'text-purple-500 border-b-2 border-purple-500' : 'text-gray-400 hover:text-white'}`}
                onClick={() => setActiveTab('tags')}
              >
                Tags
              </button>
            </div>
            
            {activeTab === 'overview' && (
              <div className="text-gray-300 space-y-4">
                <div dangerouslySetInnerHTML={{ __html: game.description || game.description_raw }} />
              </div>
            )}
            
            {activeTab === 'tags' && (
              <div className="flex flex-wrap gap-2">
                {game.tags?.map((tag) => (
                  <span 
                    key={tag.id}
                    className="px-3 py-1 bg-gray-800 text-sm text-gray-300 rounded-full"
                  >
                    {tag.name}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameDetail; 