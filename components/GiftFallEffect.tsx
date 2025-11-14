import React, { useMemo } from 'react';
import { GiftIcon } from './Icons';

interface GiftFallEffectProps {
  isActive: boolean;
}

const GiftFallEffect: React.FC<GiftFallEffectProps> = ({ isActive }) => {
  // Updated colors to primary/secondary colors for more variety
  const colors = useMemo(() => ['#ef4444', '#facc15', '#3b82f6', '#22c55e', '#f97316', '#a855f7'], []);

  const particles = useMemo(() => {
    if (!isActive) return [];
    const items = [];
    for (let i = 0; i < 60; i++) {
      const color = colors[Math.floor(Math.random() * colors.length)];
      const style = {
        left: `${Math.random() * 100}%`,
        animationDuration: `${1.5 + Math.random() * 2.5}s`,
        animationDelay: `${Math.random() * 5}s`,
        transform: `scale(${0.8 + Math.random() * 0.5})`,
        color: color,
      };
      items.push(
        <div key={`gift-${i}`} className="gift" style={style}>
          <GiftIcon />
        </div>
      );
    }
    return items;
  }, [isActive, colors]);

  if (!isActive) return null;

  return (
    <div className="gift-container">
      {particles}
    </div>
  );
};

export default GiftFallEffect;
