
import React from 'react';

interface GrowingPlantProps {
  progress: number; // 0 to 100
}

const GrowingPlant: React.FC<GrowingPlantProps> = ({ progress }) => {
  // Calculate dynamic properties
  const stemHeight = (progress / 100) * 150; // Max height 150px
  const leaf1Opacity = progress > 25 ? 1 : 0;
  const leaf2Opacity = progress > 50 ? 1 : 0;
  const leaf3Opacity = progress > 75 ? 1 : 0;
  const flowerScale = progress > 95 ? (progress - 95) / 5 : 0; // Blooms at the very end

  return (
    <div className="fixed bottom-0 left-6 rtl:left-auto rtl:right-6 pointer-events-none z-20 overflow-visible">
      <svg width="100" height="200" viewBox="0 0 100 200" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Pot */}
        <path d="M35 190H65L70 170H30L35 190Z" fill="#134e4a" stroke="#2dd4bf" strokeWidth="2" />
        
        {/* Stem */}
        <path 
          d={`M50 170 Q50 ${170 - stemHeight/2} 50 ${170 - stemHeight}`} 
          stroke="#2dd4bf" 
          strokeWidth="4" 
          strokeLinecap="round"
          className="transition-all duration-300 ease-out"
        />

        {/* Leaf 1 (Left) */}
        <g opacity={leaf1Opacity} className="transition-opacity duration-500" style={{ transform: `translateY(${-stemHeight * 0.3}px)` }}>
           <path d="M50 150 Q30 140 25 155 Q35 165 50 150" fill="#14b8a6" stroke="#ccfbf1" strokeWidth="1" />
        </g>

        {/* Leaf 2 (Right) */}
        <g opacity={leaf2Opacity} className="transition-opacity duration-500" style={{ transform: `translateY(${-stemHeight * 0.6}px)` }}>
           <path d="M50 120 Q70 110 75 125 Q65 135 50 120" fill="#0d9488" stroke="#ccfbf1" strokeWidth="1" />
        </g>

        {/* Leaf 3 (Left) */}
        <g opacity={leaf3Opacity} className="transition-opacity duration-500" style={{ transform: `translateY(${-stemHeight * 0.8}px)` }}>
           <path d="M50 90 Q35 85 30 95 Q40 105 50 90" fill="#14b8a6" stroke="#ccfbf1" strokeWidth="1" />
        </g>

        {/* Flower (Golden) */}
        <g 
          style={{ 
            transform: `translate(50px, ${170 - stemHeight}px) scale(${flowerScale})`,
            transformOrigin: 'center',
            transition: 'transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
          }}
        >
          {/* Petals */}
          <circle cx="0" cy="-10" r="8" fill="#fbbf24" />
          <circle cx="10" cy="0" r="8" fill="#fbbf24" />
          <circle cx="0" cy="10" r="8" fill="#fbbf24" />
          <circle cx="-10" cy="0" r="8" fill="#fbbf24" />
          {/* Center */}
          <circle cx="0" cy="0" r="6" fill="#f59e0b" />
          
          {/* Shine effect when fully bloomed */}
          {progress === 100 && (
            <circle cx="0" cy="0" r="15" fill="url(#grad1)" opacity="0.6">
               <animate attributeName="r" values="12;18;12" dur="2s" repeatCount="indefinite" />
            </circle>
          )}
        </g>

        <defs>
          <radialGradient id="grad1" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
            <stop offset="0%" style={{ stopColor: '#fbbf24', stopOpacity: 0.8 }} />
            <stop offset="100%" style={{ stopColor: '#fbbf24', stopOpacity: 0 }} />
          </radialGradient>
        </defs>
      </svg>
      
      {/* Label (Optional floating text) */}
      <div 
        className="absolute -top-4 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] font-bold text-amber-400 uppercase tracking-widest transition-opacity duration-500"
        style={{ opacity: progress > 10 ? 0.6 : 0, transform: `translate(-50%, ${150 - stemHeight}px)` }}
      >
        {progress < 100 ? (progress > 50 ? 'Growing...' : 'Rooting...') : 'Fully Bloomed!'}
      </div>
    </div>
  );
};

export default GrowingPlant;
