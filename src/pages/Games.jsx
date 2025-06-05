import React, { useState, useEffect } from 'react';
import { Filter, Search, ChevronLeft, ChevronRight } from 'lucide-react';
import GameCard from '../components/GameCard';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { GAMES_LIST_URL } from '../globals/apiUrls';
import { useSearchParams } from 'react-router-dom';

const Games = () => {
  const [searchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState(searchParams.get('category') || '');
  const [selectedPlatform, setSelectedPlatform] = useState('');
  const [filterOpen, setFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, error } = useQuery({
    queryKey: ['games', currentPage, searchTerm, selectedGenre, selectedPlatform],
    queryFn: () => 
      axios.get(GAMES_LIST_URL, {
        params: {
          page: currentPage,
          search: searchTerm || undefined,
          genre: selectedGenre || undefined,
          platform: selectedPlatform || undefined
        }
      }).then(response => response.data),
    staleTime: 1000 * 60 * 5, // 5 minutes
    cacheTime: 1000 * 60 * 5
  });

  const games = data?.games?.data || [];
  const totalPages = data?.games?.last_page || 1;
  const currentPageNumber = data?.games?.current_page || 1;
  const genres = data?.tags || [];
  const platforms = data?.platforms || [];

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 text-white">Games Library</h1>
      
      {/* Search and Filter Controls */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search games..."
            className="w-full pl-10 pr-4 py-3 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>
        <button 
          className="md:w-auto px-4 py-3 bg-gray-800 text-white rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors"
          onClick={() => setFilterOpen(!filterOpen)}
        >
          <Filter className="mr-2" />
          Filters
        </button>
      </div>

      {/* Filters Panel */}
      {filterOpen && (
        <div className="mb-8 p-6 bg-gray-800 rounded-lg shadow-lg animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Genre</label>
              <select 
                className="w-full p-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                value={selectedGenre}
                onChange={(e) => {
                  setSelectedGenre(e.target.value);
                  setCurrentPage(1);
                }}
              >
                <option value="">All Genres</option>
                {genres.map((genre) => (
                  <option key={genre.id} value={genre.id}>{genre.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Platform</label>
              <select 
                className="w-full p-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                value={selectedPlatform}
                onChange={(e) => {
                  setSelectedPlatform(e.target.value);
                  setCurrentPage(1);
                }}
              >
                <option value="">All Platforms</option>
                {platforms.map((platform) => (
                  <option key={platform.id} value={platform.id}>{platform.name}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Game Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, index) => (
            <div key={index} className="bg-gray-800 rounded-lg overflow-hidden shadow-lg animate-pulse">
              <div className="h-48 bg-gray-700"></div>
              <div className="p-4">
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
      ) : error ? (
        <div className="text-center py-12">
          <h3 className="text-xl text-red-500">Failed to load games</h3>
          <p className="text-gray-500 mt-2">Please try again later</p>
        </div>
      ) : games.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {games.map(game => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center items-center mt-8 gap-2">
            <button
              onClick={() => handlePageChange(currentPageNumber - 1)}
              disabled={currentPageNumber === 1}
              className="p-2 rounded-lg bg-gray-800 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-700 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            
            <span className="text-white mx-4">
              Page {currentPageNumber} of {totalPages}
            </span>
            
            <button
              onClick={() => handlePageChange(currentPageNumber + 1)}
              disabled={currentPageNumber === totalPages}
              className="p-2 rounded-lg bg-gray-800 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-700 transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </>
      ) : (
        <div className="text-center py-12">
          <h3 className="text-xl text-gray-400">No games found matching your criteria</h3>
          <p className="text-gray-500 mt-2">Try adjusting your filters or search terms</p>
        </div>
      )}
    </div>
  );
};

export default Games;