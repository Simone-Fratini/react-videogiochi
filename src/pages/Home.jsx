import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import Spline from '@splinetool/react-spline';
import FeaturedGames from '../components/FeaturedGames';
import GameCategories from '../components/GameCategories';
import TopRatedGames from '../components/TopRatedGames';
import SearchBar from '../components/SearchBar';

const HomePage = () => {


  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative h-[100vh] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/80 to-gray-900/90 z-10"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center z-0" 
          style={{ 
            backgroundImage: "url('https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg')",
            backgroundPosition: "center"
          }}
        ></div>
        <div className="relative z-20 container mx-auto px-4 h-full flex items-center">
          <div className="w-full lg:w-1/2">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white max-w-3xl animate-fade-in-down">
              Discover Your Next Gaming Adventure
            </h1>
            <p className="text-lg md:text-xl text-gray-200 max-w-2xl mb-8 animate-fade-in-up">
              Explore thousands of games with detailed reviews, ratings, and recommendations from our community of gamers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in">
              <SearchBar />
            </div>
            <p className="text-gray-200 mt-4 animate-fade-in pl-2">
              or start by <Link to="/games" className="text-purple-400 hover:text-purple-300 underline">browsing thousands of games</Link>
            </p>
          </div>
          <div className="hidden lg:block w-1/2 h-full">
            <Spline scene="https://prod.spline.design/efshwaWlKYXCHV20/scene.splinecode" />
          </div>
        </div>
      </section>

      {/* Featured Games */}
      <section className="py-16 bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-white">Featured Games</h2>
          <FeaturedGames />
        </div>
      </section>

      {/* Game Categories */}
      <section className="py-16 bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-white">Browse by Category</h2>
          <GameCategories />
        </div>
      </section>

      {/* Top Rated */}
      <section className="py-16 bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-white">Top Rated Games</h2>
          <TopRatedGames />
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-purple-900 to-indigo-900">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4 text-white">Ready to Find Your Next Favorite Game?</h2>
          <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">Join our community of gamers and discover games tailored to your preferences.</p>
          <Link to="/games" className="px-8 py-4 bg-white text-purple-900 font-bold rounded-lg hover:bg-gray-100 transition-colors shadow-xl inline-flex items-center justify-center">
            Explore All Games <ChevronRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;