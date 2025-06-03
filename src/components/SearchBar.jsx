import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className="flex-1 max-w-md">
      <div className="relative">
        <input
          type="text"
          placeholder="Search games..."
          className="w-full pl-10 pr-4 py-2 bg-gray-800/80 backdrop-blur-sm text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 border border-gray-700"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      </div>
    </form>
  );
};

export default SearchBar;