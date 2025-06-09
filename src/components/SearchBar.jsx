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
    <div className='max-w-md flex-1 px-2 py-2 rounded-4xl bg-violet-900/20 backdrop-blur-md  shadow-lg p-60'>
      <form onSubmit={handleSearch} className="">
      <div className="relative bg-[#2d014d] p-1 pl-4 pr-16 rounded-full flex items-center shadow-xl focus-within:ring-2 focus-within:ring-purple-600">
        <input
          type="text"
          placeholder="Search by title, genre or platform"
          className="w-full bg-transparent text-white placeholder-gray-300 pl-0 pr-0 py-2 rounded-full focus:outline-none "
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#a259ff] hover:bg-[#b47aff] p-2 rounded-full flex items-center justify-center transition-colors">
          <Search className="text-white w-5 h-5" />
        </button>
      </div>
    </form>

    </div>
  );
};

export default SearchBar;