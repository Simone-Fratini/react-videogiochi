import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import GameCard from '../components/GameCard';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { GAMES_LIST_URL } from '../globals/apiUrls';

const NewReleases = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, error } = useQuery({
    queryKey: ['newreleases', currentPage],
    queryFn: () => 
      axios.get(GAMES_LIST_URL, {
        params: {
          page: currentPage,
          newreleases: true
        }
      }).then(response => response.data),
    staleTime: 1000 * 60 * 5, // 5 minutes
    cacheTime: 1000 * 60 * 5
  });

  const games = data?.games?.data || [];
  const totalPages = data?.games?.last_page || 1;
  const currentPageNumber = data?.games?.current_page || 1;

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 text-white">New Releases</h1>

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
          <h3 className="text-xl text-gray-400">No games found</h3>
          <p className="text-gray-500 mt-2">Please try again later</p>
        </div>
      )}
    </div>
  );
};

export default NewReleases;