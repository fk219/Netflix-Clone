import { useState, useRef, useEffect } from 'react';
import { Play, Info, VolumeX, Volume2, Star } from 'lucide-react';
import { gsap } from 'gsap';
import { getBackdropUrl } from '../services/tmdbApi';

const Hero = ({ content }) => {
  const [isMuted, setIsMuted] = useState(true);
  const heroRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    if (heroRef.current && contentRef.current && content) {
      gsap.fromTo(contentRef.current.children,
        { opacity: 0, y: 60, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 1.2, stagger: 0.15, ease: "power3.out", delay: 0.3 }
      );
    }
  }, [content]);

  const handlePlayClick = () => {
    gsap.to('.play-button', {
      scale: 0.95,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
      ease: "power2.inOut"
    });
  };

  const handleInfoClick = () => {
    gsap.to('.info-button', {
      scale: 0.95,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
      ease: "power2.inOut"
    });
  };

  if (!content) return null;

  const title = content.title || content.name;
  const overview = content.overview;
  const releaseDate = content.release_date || content.first_air_date;
  const rating = content.vote_average;

  return (
    <div 
      ref={heroRef}
      className="relative h-screen flex items-center justify-start overflow-hidden"
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transform scale-105"
        style={{
          backgroundImage: `url(${getBackdropUrl(content.backdrop_path, 'original')})`,
        }}
      >
        {/* Enhanced Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40"></div>
      </div>

      {/* Content */}
      <div 
        ref={contentRef}
        className="relative z-10 px-4 md:px-8 lg:px-12 max-w-3xl"
      >
        {/* Netflix Original Badge */}
        <div className="mb-4">
          <span className="inline-flex items-center px-3 py-1 bg-netflix-red/90 text-white text-xs font-bold rounded-full backdrop-blur-sm">
            NETFLIX ORIGINAL
          </span>
        </div>

        {/* Title */}
        <div className="mb-6">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-4 leading-tight tracking-tight text-shadow-lg">
            {title}
          </h1>
        </div>

        {/* Metadata */}
        <div className="flex items-center space-x-6 mb-6 text-white">
          {rating && (
            <div className="flex items-center space-x-1">
              <Star size={16} className="text-yellow-400 fill-current" />
              <span className="text-lg font-semibold">{rating.toFixed(1)}</span>
            </div>
          )}
          {releaseDate && (
            <span className="text-lg font-medium">{new Date(releaseDate).getFullYear()}</span>
          )}
          <span className="border border-gray-400 px-3 py-1 text-sm font-medium rounded">4K</span>
          <span className="border border-gray-400 px-3 py-1 text-sm font-medium rounded">HDR</span>
        </div>

        {/* Description */}
        <p className="text-white/90 text-lg md:text-xl leading-relaxed mb-8 max-w-2xl font-light">
          {overview}
        </p>

        {/* Action Buttons */}
        <div className="flex items-center space-x-4 mb-8">
          <button
            onClick={handlePlayClick}
            className="play-button flex items-center bg-white text-black px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-200 transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-white/20"
          >
            <Play size={24} className="mr-3 fill-current" />
            Play
          </button>
          
          <button
            onClick={handleInfoClick}
            className="info-button flex items-center bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white/30 transition-all duration-300 transform hover:scale-105 border border-white/20 hover:border-white/40"
          >
            <Info size={24} className="mr-3" />
            More Info
          </button>
        </div>

        {/* Genre Tags */}
        <div className="flex flex-wrap gap-2">
          {content.genre_ids && content.genre_ids.slice(0, 3).map((genreId, index) => (
            <span key={genreId} className="px-3 py-1 bg-white/10 backdrop-blur-sm text-white/80 text-sm rounded-full border border-white/20">
              Genre {index + 1}
            </span>
          ))}
        </div>
      </div>

      {/* Volume Control */}
      <button
        onClick={() => setIsMuted(!isMuted)}
        className="absolute bottom-32 right-4 md:right-8 lg:right-12 z-10 bg-black/40 backdrop-blur-sm border-2 border-white/30 text-white p-3 rounded-full hover:border-white hover:bg-black/60 transition-all duration-300 hover:scale-110"
      >
        {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
      </button>

      {/* Maturity Rating Badge */}
      <div className="absolute bottom-32 left-4 md:left-8 lg:left-12 z-10">
        <div className="bg-black/60 backdrop-blur-sm text-white px-3 py-2 text-sm font-bold rounded-lg border border-white/20">
          {content.adult ? '18+' : '13+'}
        </div>
      </div>
    </div>
  );
};

export default Hero;