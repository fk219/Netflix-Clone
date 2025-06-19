import { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Play, Plus, ThumbsUp, ChevronDown, Star } from 'lucide-react';
import { gsap } from 'gsap';
import { getImageUrl } from '../services/tmdbApi';

const ContentRow = ({ title, items, onItemClick }) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [hoveredItem, setHoveredItem] = useState(null);
  const scrollContainerRef = useRef(null);
  const titleRef = useRef(null);

  const itemWidth = 320;
  const itemsPerView = Math.floor(window.innerWidth / itemWidth);
  const maxScroll = Math.max(0, (items.length - itemsPerView) * itemWidth);

  useEffect(() => {
    if (titleRef.current) {
      gsap.fromTo(titleRef.current,
        { opacity: 0, x: -40 },
        { opacity: 1, x: 0, duration: 0.8, ease: "power3.out" }
      );
    }
  }, []);

  const scroll = (direction) => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const scrollAmount = itemWidth * 3;
    let newPosition = scrollPosition;

    if (direction === 'left') {
      newPosition = Math.max(0, scrollPosition - scrollAmount);
    } else {
      newPosition = Math.min(maxScroll, scrollPosition + scrollAmount);
    }

    setScrollPosition(newPosition);
    
    gsap.to(container, {
      x: -newPosition,
      duration: 0.6,
      ease: "power2.out"
    });
  };

  const handleItemHover = (item, index) => {
    setHoveredItem({ ...item, index });
    
    const itemElement = document.querySelector(`[data-item-id="${item.id}"]`);
    if (itemElement) {
      gsap.to(itemElement, {
        scale: 1.08,
        zIndex: 10,
        duration: 0.4,
        ease: "power2.out"
      });
    }
  };

  const handleItemLeave = (item) => {
    setHoveredItem(null);
    
    const itemElement = document.querySelector(`[data-item-id="${item.id}"]`);
    if (itemElement) {
      gsap.to(itemElement, {
        scale: 1,
        zIndex: 1,
        duration: 0.4,
        ease: "power2.out"
      });
    }
  };

  if (!items || items.length === 0) return null;

  return (
    <div className="relative mb-12 md:mb-16">
      {/* Row Title */}
      <h2 
        ref={titleRef}
        className="text-white text-xl md:text-2xl font-bold mb-6 px-4 md:px-8 lg:px-12"
      >
        {title}
      </h2>

      {/* Content Container */}
      <div className="relative group">
        {/* Left Arrow */}
        {scrollPosition > 0 && (
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-0 bottom-0 z-20 w-16 bg-gradient-to-r from-black/80 to-transparent text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:from-black/90"
          >
            <div className="bg-black/60 backdrop-blur-sm p-2 rounded-full hover:bg-black/80 transition-all duration-200">
              <ChevronLeft size={28} />
            </div>
          </button>
        )}

        {/* Right Arrow */}
        {scrollPosition < maxScroll && (
          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-0 bottom-0 z-20 w-16 bg-gradient-to-l from-black/80 to-transparent text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:from-black/90"
          >
            <div className="bg-black/60 backdrop-blur-sm p-2 rounded-full hover:bg-black/80 transition-all duration-200">
              <ChevronRight size={28} />
            </div>
          </button>
        )}

        {/* Items Container */}
        <div className="overflow-hidden px-4 md:px-8 lg:px-12">
          <div
            ref={scrollContainerRef}
            className="flex space-x-3 transition-transform duration-500"
            style={{ width: `${items.length * itemWidth}px` }}
          >
            {items.map((item, index) => {
              const title = item.title || item.name;
              const releaseDate = item.release_date || item.first_air_date;
              const rating = item.vote_average;

              return (
                <div
                  key={item.id}
                  data-item-id={item.id}
                  className="relative flex-shrink-0 cursor-pointer group/item"
                  style={{ width: `${itemWidth - 12}px` }}
                  onMouseEnter={() => handleItemHover(item, index)}
                  onMouseLeave={() => handleItemLeave(item)}
                  onClick={() => onItemClick(item)}
                >
                  {/* Main Image */}
                  <div className="relative overflow-hidden rounded-xl">
                    <img
                      src={getImageUrl(item.poster_path)}
                      alt={title}
                      className="w-full h-48 object-cover transition-all duration-500 group-hover/item:brightness-110"
                    />
                    
                    {/* Rating Badge */}
                    {rating && (
                      <div className="absolute top-3 left-3 flex items-center space-x-1 bg-black/70 backdrop-blur-sm px-2 py-1 rounded-lg">
                        <Star size={12} className="text-yellow-400 fill-current" />
                        <span className="text-white text-xs font-semibold">{rating.toFixed(1)}</span>
                      </div>
                    )}
                    
                    {/* Hover Overlay */}
                    {hoveredItem?.id === item.id && (
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent rounded-xl flex items-end justify-center opacity-0 group-hover/item:opacity-100 transition-all duration-400">
                        <div className="flex space-x-2 mb-4">
                          <button className="bg-white text-black p-2.5 rounded-full hover:bg-gray-200 transition-all duration-200 transform hover:scale-110 shadow-lg">
                            <Play size={16} className="fill-current" />
                          </button>
                          <button className="bg-black/60 backdrop-blur-sm border-2 border-white/60 text-white p-2.5 rounded-full hover:bg-black/80 hover:border-white transition-all duration-200 transform hover:scale-110">
                            <Plus size={16} />
                          </button>
                          <button className="bg-black/60 backdrop-blur-sm border-2 border-white/60 text-white p-2.5 rounded-full hover:bg-black/80 hover:border-white transition-all duration-200 transform hover:scale-110">
                            <ThumbsUp size={16} />
                          </button>
                          <button className="bg-black/60 backdrop-blur-sm border-2 border-white/60 text-white p-2.5 rounded-full hover:bg-black/80 hover:border-white transition-all duration-200 transform hover:scale-110">
                            <ChevronDown size={16} />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Item Info */}
                  <div className="mt-3 text-white">
                    <h3 className="font-semibold text-sm truncate mb-1">{title}</h3>
                    <div className="flex items-center justify-between text-xs text-gray-400">
                      <span>{releaseDate ? new Date(releaseDate).getFullYear() : 'N/A'}</span>
                      <span className="bg-gray-700/80 px-2 py-1 rounded text-xs">
                        {item.adult ? '18+' : '13+'}
                      </span>
                    </div>
                  </div>

                  {/* Extended Info Panel */}
                  {hoveredItem?.id === item.id && (
                    <div className="absolute top-full left-0 right-0 bg-netflix-dark-gray/95 backdrop-blur-md rounded-b-xl p-4 shadow-2xl z-30 opacity-0 group-hover/item:opacity-100 transition-all duration-400 delay-200 border border-white/10">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-2">
                          <button className="bg-white text-black px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gray-200 transition-all duration-200 flex items-center">
                            <Play size={12} className="mr-1 fill-current" />
                            Play
                          </button>
                          <button className="border border-gray-500 text-white p-2 rounded-full hover:border-white transition-all duration-200">
                            <Plus size={12} />
                          </button>
                          <button className="border border-gray-500 text-white p-2 rounded-full hover:border-white transition-all duration-200">
                            <ThumbsUp size={12} />
                          </button>
                        </div>
                        <button className="border border-gray-500 text-white p-2 rounded-full hover:border-white transition-all duration-200">
                          <ChevronDown size={12} />
                        </button>
                      </div>
                      <div className="text-xs text-gray-300">
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="text-green-400 font-semibold">
                            {Math.floor(Math.random() * 20) + 80}% Match
                          </span>
                          <span className="border border-gray-500 px-2 py-1 text-xs rounded">
                            {item.adult ? '18+' : '13+'}
                          </span>
                          <span>{releaseDate ? new Date(releaseDate).getFullYear() : 'N/A'}</span>
                        </div>
                        <p className="text-white/80 text-sm line-clamp-2">
                          {item.overview || 'No description available.'}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentRow;