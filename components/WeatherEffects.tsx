import React, { useMemo } from 'react';

const WeatherEffects: React.FC = () => {
    const particles = useMemo(() => {
        const items = [];
        for (let i = 0; i < 50; i++) {
            const style = {
                left: `${Math.random() * 100}%`,
                animationDuration: `${2 + Math.random() * 3}s`,
                animationDelay: `${Math.random() * 5}s`,
            };
            const snowSize = `${2 + Math.random() * 4}px`;
            items.push(
                <div key={`snow-${i}`} className="snowflake" style={{ ...style, width: snowSize, height: snowSize, opacity: Math.random() }} />
            );
            items.push(
                <div key={`rain-${i}`} className="raindrop" style={style} />
            );
        }
        return items;
    }, []);

    return (
        <div className="weather-container">
            {particles}
        </div>
    );
};

export default WeatherEffects;
