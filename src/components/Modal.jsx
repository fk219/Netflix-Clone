import { useEffect, useRef, useState } from 'react';
import { X, Play, Plus, ThumbsUp, ThumbsDown, Share, Star, Calendar, Clock } from 'lucide-react';
import { gsap } from 'gsap';
import { getImageUrl, getBackdropUrl, getMovieDetails, getTVDetails } from '../services/tmdbApi';

const Modal = ({ item, isOpen, onClose }) => {
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const modalRef = useRef(null);
  const overlayRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    if (isOpen && item) {
      loadDetails();
    }
  }, [isOpen, item]);

  const loadDetails = async () => {
    if (!item) return;
    
    setLoading(true);
    try {
      const detailsData = item.media_type === 'tv' || item.first_air_date
        ? await getTVDetails(item.id)
        : await getMovieDetails(item.id);
      setDetails(detailsData);
    } catch (error) {
      console.error('Error loading details:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen && modalRef.current && overlayRef.current && contentRef.current) {
      gsap.set(modalRef.current, { display: 'flex' });
      gsap.fromTo(overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: "power2.out" }
      );
      gsap.fromTo(contentRef.current,
        { opacity: 0, scale: 0.8, y: 50 },
        { opacity: 1, scale: 1, y: 0, duration: 0.4, ease: "power2.out", delay: 0.1 }
      );
      
      document.body.style.overflow = 'hidden';
    } else if (!isOpen && modalRef.current) {
      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: 0.2,
        ease: "power2.out"
      });
      gsap.to(contentRef.current, {
        opacity: 0,
        scale: 0.8,
        y: 50,
        duration: 0.3,
        ease: "power2.out",
        onComplete: () => {
          if (modalRef.current) {
            modalRef.current.style.display = 'none';
          }
        }
      });
      
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!item) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const title = item.title || item.name;
  const releaseDate = item.release_date || item.first_air_date;
  const rating = item.vote_average;
  const overview = item.overview;

  return (
    <div
      ref={modalRef}
      className="fixed inset-0 z-50 items-center justify-center p-4 hidden"
    >
      {/* Overlay */}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-black/90 backdrop-blur-sm"
        onClick={handleOverlayClick}
      />
      
      {/* Modal Content */}
      <div
        ref={contentRef}
        className="relative bg-netflix-dark-gray/95 backdrop-blur-md rounded-2xl overflow-hidden max-w-5xl w-full max-h-[90vh] overflow-y-auto border border-white/10"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-10 bg-black/60 backdrop-blur-sm text-white p-3 rounded-full hover:bg-black/80 transition-all duration-300 hover:scale-110"
        >
          <X size={20} />
        </button>

        {/* Header Image */}
        <div className="relative h-64 md:h-96">
          <img
            src={getBackdropUrl(item.backdrop_path || item.poster_path, 'w1280')}
            alt={title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-netflix-dark-gray via-transparent to-transparent" />
          
          {/* Play Button */}
          <div className="absolute bottom-8 left-8">
            <button className="flex items-center bg-white text-black px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-200 transition-all duration-300 transform hover:scale-105 shadow-2xl">
              <Play size={24} className="mr-3 fill-current" />
              Play
            </button>
          </div>

          {/* Action Buttons */}
          <div className="absolute bottom-8 right-8 flex items-center space-x-3">
            <button className="bg-black/60 backdrop-blur-sm border-2 border-white/50 text-white p-4 rounded-full hover:border-white hover:bg-black/80 transition-all duration-300 hover:scale-110">
              <Plus size={20} />
            </button>
            <button className="bg-black/60 backdrop-blur-sm border-2 border-white/50 text-white p-4 rounded-full hover:border-white hover:bg-black/80 transition-all duration-300 hover:scale-110">
              <ThumbsUp size={20} />
            </button>
            <button className="bg-black/60 backdrop-blur-sm border-2 border-white/50 text-white p-4 rounded-full hover:border-white hover:bg-black/80 transition-all duration-300 hover:scale-110">
              <ThumbsDown size={20} />
            </button>
            <button className="bg-black/60 backdrop-blur-sm border-2 border-white/50 text-white p-4 rounded-full hover:border-white hover:bg-black/80 transition-all duration-300 hover:scale-110">
              <Share size={20} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          {/* Title and Metadata */}
          <div className="mb-8">
            <h2 className="text-white text-4xl font-bold mb-4">{title}</h2>
            <div className="flex items-center space-x-6 text-white">
              <div className="flex items-center space-x-2">
                <span className="text-green-400 font-bold text-lg">
                  {Math.floor(Math.random() * 20) + 80}% Match
                </span>
                <Star size={16} className="text-yellow-400 fill-current" />
                <span className="font-semibold">{rating ? rating.toFixed(1) : 'N/A'}</span>
              </div>
              <span className="bg-gray-600 px-3 py-1 text-sm rounded-lg font-medium">
                {item.adult ? '18+' : '13+'}
              </span>
              {releaseDate && (
                <div className="flex items-center space-x-1">
                  <Calendar size={16} />
                  <span>{new Date(releaseDate).getFullYear()}</span>
                </div>
              )}
              <span className="border border-gray-400 px-3 py-1 text-sm font-medium rounded-lg">4K</span>
              <span className="border border-gray-400 px-3 py-1 text-sm font-medium rounded-lg">HDR</span>
            </div>
          </div>

          {/* Description and Details */}
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <p className="text-white/90 text-lg leading-relaxed mb-6">
                {overview || `${title} is an exciting production that delivers thrilling entertainment with outstanding performances and compelling storytelling. This critically acclaimed content offers viewers an immersive experience that will keep you engaged from start to finish.`}
              </p>

              {loading && (
                <div className="flex items-center justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-netflix-red"></div>
                </div>
              )}

              {details && details.videos && details.videos.results.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-white text-xl font-bold mb-4">Trailer</h3>
                  <div className="aspect-video bg-black rounded-xl overflow-hidden">
                    <iframe
                      src={`https://www.youtube.com/embed/${details.videos.results[0].key}`}
                      title="Trailer"
                      className="w-full h-full"
                      allowFullScreen
                    />
                  </div>
                </div>
              )}
            </div>
            
            {/* Details Sidebar */}
            <div className="text-gray-300 space-y-6">
              {details && details.credits && (
                <div>
                  <span className="text-gray-400 font-semibold">Cast: </span>
                  <span>{details.credits.cast.slice(0, 3).map(actor => actor.name).join(', ')}</span>
                </div>
              )}
              
              {details && details.genres && (
                <div>
                  <span className="text-gray-400 font-semibold">Genres: </span>
                  <span>{details.genres.map(genre => genre.name).join(', ')}</span>
                </div>
              )}

              {details && details.runtime && (
                <div className="flex items-center space-x-2">
                  <Clock size={16} className="text-gray-400" />
                  <span className="text-gray-400 font-semibold">Runtime: </span>
                  <span>{Math.floor(details.runtime / 60)}h {details.runtime % 60}m</span>
                </div>
              )}

              <div>
                <span className="text-gray-400 font-semibold">Maturity Rating: </span>
                <span>{item.adult ? '18+ - Adults Only' : '13+ - Teen and Above'}</span>
              </div>

              {details && details.production_companies && details.production_companies.length > 0 && (
                <div>
                  <span className="text-gray-400 font-semibold">Production: </span>
                  <span>{details.production_companies[0].name}</span>
                </div>
              )}
            </div>
          </div>

          {/* Similar Content */}
          {details && details.similar && details.similar.results.length > 0 && (
            <div className="mt-12">
              <h3 className="text-white text-2xl font-bold mb-6">More Like This</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {details.similar.results.slice(0, 8).map((similar) => (
                  <div key={similar.id} className="bg-netflix-gray/30 rounded-xl overflow-hidden hover:bg-netflix-gray/50 transition-all duration-300 cursor-pointer group">
                    <img
                      src={getImageUrl(similar.poster_path)}
                      alt={similar.title || similar.name}
                      className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-green-400 text-sm font-bold">
                          {Math.floor(Math.random() * 20) + 80}% Match
                        </span>
                        <span className="bg-gray-600 px-2 py-1 text-xs rounded text-white font-medium">
                          {similar.adult ? '18+' : '13+'}
                        </span>
                      </div>
                      <h4 className="text-white font-semibold text-sm mb-1 truncate">
                        {similar.title || similar.name}
                      </h4>
                      <p className="text-gray-300 text-xs line-clamp-2">
                        {similar.overview || 'No description available.'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;