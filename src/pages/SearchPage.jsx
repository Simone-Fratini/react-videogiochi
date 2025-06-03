import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { GAMES_LIST_URL } from '../globals/apiUrls';
import GameCard from '../components/GameCard';
import { Filter, Search, ChevronLeft, ChevronRight } from 'lucide-react';

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  const searchTerm = searchParams.get('q');

  const { data, isLoading, error } = useQuery({
    queryKey: ['search', currentPage, searchTerm],
    queryFn: () => 
      axios.get(GAMES_LIST_URL, {
        params: {
          page: currentPage,
          search: searchTerm || undefined,
        }
      }).then(response => response.data),
    staleTime: 1000 * 60 * 5, // 5 minutes
    cacheTime: 1000 * 60 * 5
  });

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!searchTerm) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-white mb-4">Search Games</h1>
        <p className="text-gray-400">Enter a search term to find games.</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-700 rounded w-1/4 mb-4"></div>
          <div className="space-y-3">
            {[1, 2, 3].map((n) => (
              <div key={n} className="h-24 bg-gray-700 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-white mb-4">Error</h1>
        <p className="text-red-400">Something went wrong while searching for games.</p>
      </div>
    );
  }

  const games = data?.games?.data || [];
  const totalPages = data?.games?.last_page || 1;
  const currentPageNumber = data?.games?.current_page || 1;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-white mb-4">
        Search Results for "{searchTerm}"
      </h1>
      
      {games.length === 0 ? (
        <p className="text-gray-400">No results found.</p>
      ) : (
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
      )}
    </div>
  )
};

export default SearchPage; 