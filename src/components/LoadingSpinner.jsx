import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const LoadingSpinner = () => {
  const spinnerRef = useRef(null);

  useEffect(() => {
    if (spinnerRef.current) {
      gsap.to(spinnerRef.current, {
        rotation: 360,
        duration: 1,
        repeat: -1,
        ease: "none"
      });
    }
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-netflix-black">
      <div className="text-center">
        <div
          ref={spinnerRef}
          className="w-12 h-12 border-4 border-netflix-red border-t-transparent rounded-full mx-auto mb-4"
        />
        <div className="text-netflix-red text-2xl font-bold">NETFLIX</div>
      </div>
    </div>
  );
};

export default LoadingSpinner;