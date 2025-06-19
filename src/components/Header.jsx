import { useState, useEffect, useRef } from 'react';
import { Search, Bell, User, ChevronDown, Menu, X } from 'lucide-react';
import { gsap } from 'gsap';

const Header = ({ onSearch }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const headerRef = useRef(null);
  const profileDropdownRef = useRef(null);
  const searchRef = useRef(null);
  const mobileMenuRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isProfileOpen && profileDropdownRef.current) {
      gsap.fromTo(profileDropdownRef.current, 
        { opacity: 0, y: -10, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.2, ease: "power2.out" }
      );
    }
  }, [isProfileOpen]);

  useEffect(() => {
    if (isSearchOpen && searchRef.current) {
      gsap.fromTo(searchRef.current,
        { width: 0, opacity: 0 },
        { width: '300px', opacity: 1, duration: 0.3, ease: "power2.out" }
      );
    }
  }, [isSearchOpen]);

  useEffect(() => {
    if (isMobileMenuOpen && mobileMenuRef.current) {
      gsap.fromTo(mobileMenuRef.current,
        { opacity: 0, x: '100%' },
        { opacity: 1, x: '0%', duration: 0.3, ease: "power2.out" }
      );
    }
  }, [isMobileMenuOpen]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    onSearch(e.target.value);
  };

  const handleSearchClick = () => {
    if (isSearchOpen && searchQuery === '') {
      setIsSearchOpen(false);
    } else {
      setIsSearchOpen(true);
    }
  };

  const navigationItems = ['Home', 'TV Shows', 'Movies', 'New & Popular', 'My List', 'Browse by Languages'];

  return (
    <header 
      ref={headerRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-black/95 backdrop-blur-md shadow-2xl' 
          : 'bg-gradient-to-b from-black/80 via-black/40 to-transparent'
      }`}
    >
      <div className="flex items-center justify-between px-4 md:px-8 lg:px-12 py-4">
        {/* Logo */}
        <div className="flex items-center">
          <div className="text-netflix-red text-2xl md:text-3xl font-black mr-8 tracking-tight">
            NETFLIX
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigationItems.map((item, index) => (
              <button
                key={item}
                className="text-white/90 hover:text-white transition-all duration-300 text-sm font-medium relative group"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-netflix-red transition-all duration-300 group-hover:w-full"></span>
              </button>
            ))}
          </nav>
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center space-x-6">
          {/* Search */}
          <div className="flex items-center">
            {isSearchOpen && (
              <input
                ref={searchRef}
                type="text"
                placeholder="Search movies, shows..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="bg-black/80 border border-white/20 text-white px-4 py-2.5 rounded-lg text-sm focus:outline-none focus:border-netflix-red/60 focus:ring-2 focus:ring-netflix-red/20 backdrop-blur-sm"
                autoFocus
              />
            )}
            <button
              onClick={handleSearchClick}
              className="text-white/90 hover:text-white transition-all duration-300 ml-3 p-2 hover:bg-white/10 rounded-lg"
            >
              <Search size={20} />
            </button>
          </div>

          {/* Notifications */}
          <button className="text-white/90 hover:text-white transition-all duration-300 hidden md:block p-2 hover:bg-white/10 rounded-lg">
            <Bell size={20} />
          </button>

          {/* Profile */}
          <div className="relative">
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center space-x-2 text-white/90 hover:text-white transition-all duration-300 group"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-netflix-red to-red-700 rounded-lg flex items-center justify-center shadow-lg group-hover:shadow-netflix-red/25 transition-all duration-300">
                <User size={16} />
              </div>
              <ChevronDown size={16} className="hidden md:block transition-transform duration-300 group-hover:rotate-180" />
            </button>

            {/* Profile Dropdown */}
            {isProfileOpen && (
              <div
                ref={profileDropdownRef}
                className="absolute right-0 top-12 w-56 bg-black/95 backdrop-blur-md border border-white/10 rounded-xl shadow-2xl py-2 overflow-hidden"
              >
                <div className="px-4 py-3 border-b border-white/10">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-netflix-red to-red-700 rounded-lg flex items-center justify-center">
                      <User size={18} />
                    </div>
                    <div>
                      <p className="text-white font-medium">John Doe</p>
                      <p className="text-gray-400 text-sm">Premium Member</p>
                    </div>
                  </div>
                </div>
                <button className="w-full text-left px-4 py-3 text-white/90 hover:text-white hover:bg-white/5 transition-all duration-200">
                  Manage Profiles
                </button>
                <button className="w-full text-left px-4 py-3 text-white/90 hover:text-white hover:bg-white/5 transition-all duration-200">
                  Account Settings
                </button>
                <button className="w-full text-left px-4 py-3 text-white/90 hover:text-white hover:bg-white/5 transition-all duration-200">
                  Help Center
                </button>
                <div className="border-t border-white/10 mt-2 pt-2">
                  <button className="w-full text-left px-4 py-3 text-white/90 hover:text-white hover:bg-white/5 transition-all duration-200">
                    Sign out of Netflix
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-white/90 hover:text-white transition-all duration-300 lg:hidden p-2 hover:bg-white/10 rounded-lg"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div
          ref={mobileMenuRef}
          className="lg:hidden bg-black/95 backdrop-blur-md border-t border-white/10"
        >
          <nav className="px-4 py-6 space-y-4">
            {navigationItems.map((item) => (
              <button
                key={item}
                className="block w-full text-left text-white/90 hover:text-white transition-all duration-300 py-3 px-2 hover:bg-white/5 rounded-lg"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item}
              </button>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;