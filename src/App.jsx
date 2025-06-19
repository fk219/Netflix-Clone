import { useState, useEffect } from 'react';
import { gsap } from 'gsap';
import Header from './components/Header';
import Hero from './components/Hero';
import ContentRow from './components/ContentRow';
import Modal from './components/Modal';
import LoadingSpinner from './components/LoadingSpinner';
import { useContent } from './hooks/useContent';
import { searchContent } from './services/tmdbApi';

function App() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  
  const { content, loading, error } = useContent();

  useEffect(() => {
    const performSearch = async () => {
      if (searchQuery.trim() === '') {
        setSearchResults([]);
        setIsSearching(false);
        return;
      }

      setIsSearching(true);
      try {
        const results = await searchContent(searchQuery);
        setSearchResults(results);
      } catch (error) {
        console.error('Search error:', error);
        setSearchResults([]);
      } finally {
        setIsSearching(false);
      }
    };

    const debounceTimer = setTimeout(performSearch, 300);
    return () => clearTimeout(debounceTimer);
  }, [searchQuery]);

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedItem(null), 300);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-netflix-black text-white">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Something went wrong</h2>
          <p className="text-gray-400">{error}</p>
        </div>
      </div>
    );
  }

  const contentRows = [
    { title: 'Trending Now', items: content.trending },
    { title: 'Popular Movies', items: content.popular },
    { title: 'Top Rated', items: content.topRated },
    { title: 'Action & Adventure', items: content.action },
    { title: 'Comedy Movies', items: content.comedy },
    { title: 'Horror Movies', items: content.horror },
    { title: 'TV Shows', items: content.tvShows },
    { title: 'Documentaries', items: content.documentaries },
  ];

  const featuredContent = content.trending[0];

  return (
    <div className="bg-netflix-black min-h-screen">
      {/* Header */}
      <Header onSearch={handleSearch} />

      {/* Hero Section */}
      {searchQuery.trim() === '' && featuredContent && (
        <Hero content={featuredContent} />
      )}

      {/* Content Rows */}
      <div className={`${searchQuery.trim() === '' ? '' : 'pt-24'}`}>
        {/* Search Results */}
        {searchQuery.trim() !== '' && (
          <div className="px-4 md:px-8 lg:px-12 py-8">
            <h2 className="text-white text-2xl font-bold mb-6">
              {isSearching ? 'Searching...' : `Search results for "${searchQuery}"`}
            </h2>
            
            {isSearching ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-netflix-red"></div>
              </div>
            ) : searchResults.length > 0 ? (
              <ContentRow
                title=""
                items={searchResults}
                onItemClick={handleItemClick}
              />
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <h3 className="text-white text-xl font-bold mb-4">No results found</h3>
                <p className="text-gray-400 text-lg">
                  Try searching for a different title, actor, or genre.
                </p>
              </div>
            )}
          </div>
        )}

        {/* Regular Content Rows */}
        {searchQuery.trim() === '' && contentRows.map((row, index) => (
          row.items.length > 0 && (
            <ContentRow
              key={`${row.title}-${index}`}
              title={row.title}
              items={row.items}
              onItemClick={handleItemClick}
            />
          )
        ))}
      </div>

      {/* Footer */}
      <footer className="bg-netflix-dark-gray/50 backdrop-blur-sm mt-20 py-16 px-4 md:px-8 lg:px-12 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-gray-400">
            <div>
              <ul className="space-y-3">
                <li><a href="#" className="hover:text-white transition-colors duration-300">FAQ</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-300">Investor Relations</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-300">Privacy</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-300">Speed Test</a></li>
              </ul>
            </div>
            <div>
              <ul className="space-y-3">
                <li><a href="#" className="hover:text-white transition-colors duration-300">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-300">Jobs</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-300">Cookie Preferences</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-300">Legal Notices</a></li>
              </ul>
            </div>
            <div>
              <ul className="space-y-3">
                <li><a href="#" className="hover:text-white transition-colors duration-300">Account</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-300">Ways to Watch</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-300">Corporate Information</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-300">Only on Netflix</a></li>
              </ul>
            </div>
            <div>
              <ul className="space-y-3">
                <li><a href="#" className="hover:text-white transition-colors duration-300">Media Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-300">Terms of Use</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-300">Contact Us</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-white/10 text-gray-400 text-sm">
            <p>&copy; 2024 Netflix Clone. Built with React, Tailwind CSS, GSAP, and TMDB API.</p>
          </div>
        </div>
      </footer>

      {/* Modal */}
      <Modal
        item={selectedItem}
        isOpen={isModalOpen}
        onClose={handleModalClose}
      />
    </div>
  );
}

export default App;