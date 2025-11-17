
import React, { useState, useEffect, useCallback, useRef, useContext } from 'react';
import { AppContext } from '../App';
import { translations } from '../data';
import { BookIcon, FootballIcon, PencilIcon } from './Icons';

const GAME_HEIGHT = 300;
const FAISAL_WIDTH = 40;
const FAISAL_HEIGHT = 60;
const GROUND_Y = GAME_HEIGHT - FAISAL_HEIGHT;
const GRAVITY = 0.6;
const JUMP_FORCE = -15;

const obstacleTypes = [
  { component: <BookIcon className="w-full h-full" />, width: 40, height: 40 },
  { component: <FootballIcon className="w-full h-full" />, width: 35, height: 35 },
  { component: <PencilIcon className="w-full h-full" />, width: 50, height: 50 },
];

const RunWithFaisalGame: React.FC = () => {
    const context = useContext(AppContext);
    if (!context) return null;
    const { lang } = context;

    const [status, setStatus] = useState<'idle' | 'running' | 'over'>('idle');
    const [faisalY, setFaisalY] = useState(GROUND_Y);
    const [velocityY, setVelocityY] = useState(0);
    const [obstacles, setObstacles] = useState<{ id: number; x: number; typeIndex: number }[]>([]);
    const [score, setScore] = useState(0);
    const [gameWidth, setGameWidth] = useState(800);

    const gameContainerRef = useRef<HTMLDivElement>(null);
    const gameLoopRef = useRef<number | null>(null);
    const obstacleTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

     useEffect(() => {
        const container = gameContainerRef.current;
        if (!container) return;
        
        const resizeObserver = new ResizeObserver(entries => {
            if (entries[0]) {
                const { width } = entries[0].contentRect;
                setGameWidth(width);
            }
        });

        resizeObserver.observe(container);

        // Set initial width
        setGameWidth(container.clientWidth);

        return () => resizeObserver.disconnect();
    }, []);

    const spawnObstacle = useCallback(() => {
        const typeIndex = Math.floor(Math.random() * obstacleTypes.length);
        const newObstacle = {
            id: Date.now(),
            x: gameWidth,
            typeIndex,
        };
        setObstacles(prev => [...prev, newObstacle]);
    }, [gameWidth]);

    const startGame = () => {
        setFaisalY(GROUND_Y);
        setVelocityY(0);
        setObstacles([]);
        setScore(0);
        setStatus('running');
        // Spawn first obstacle slightly delayed to give player time to react
        setTimeout(spawnObstacle, 500);
    };

    const jump = useCallback(() => {
        if (status === 'running' && faisalY >= GROUND_Y) {
            setVelocityY(JUMP_FORCE);
        } else if (status === 'idle' || status === 'over') {
            startGame();
        }
    }, [status, faisalY, startGame]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.code === 'Space') {
                e.preventDefault();
                jump();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [jump]);

    const gameTick = useCallback(() => {
        if (status !== 'running') return;

        // Faisal physics
        let newVelocityY = velocityY + GRAVITY;
        let newFaisalY = faisalY + newVelocityY;
        if (newFaisalY > GROUND_Y) {
            newFaisalY = GROUND_Y;
            newVelocityY = 0;
        }
        setFaisalY(newFaisalY);
        setVelocityY(newVelocityY);

        // Obstacle movement and collision
        let collision = false;
        const speed = Math.max(3, gameWidth / 160);
        const newObstacles = obstacles.map(obs => ({ ...obs, x: obs.x - (speed + (score / 200)) })).filter(obs => obs.x > -50);
        
        const faisalRect = { x: 50, y: newFaisalY, width: FAISAL_WIDTH, height: FAISAL_HEIGHT };

        for (const obs of newObstacles) {
            const obsType = obstacleTypes[obs.typeIndex];
            const obsRect = { x: obs.x, y: GAME_HEIGHT - obsType.height, width: obsType.width, height: obsType.height };
            if (
                faisalRect.x < obsRect.x + obsRect.width &&
                faisalRect.x + faisalRect.width > obsRect.x &&
                faisalRect.y < obsRect.y + obsRect.height &&
                faisalRect.y + faisalRect.height > obsRect.y
            ) {
                collision = true;
                break;
            }
        }
        
        setObstacles(newObstacles);
        setScore(prev => prev + 1);

        if (collision) {
            setStatus('over');
        }

        gameLoopRef.current = requestAnimationFrame(gameTick);
    }, [status, faisalY, velocityY, obstacles, score, gameWidth]);
    
    useEffect(() => {
        if (status === 'running') {
            gameLoopRef.current = requestAnimationFrame(gameTick);
            // Dynamic obstacle spawn rate based on screen width, making it feel more consistent
            const spawnInterval = Math.max(1200, gameWidth * 2.5);
            obstacleTimerRef.current = setInterval(spawnObstacle, spawnInterval);
        } else {
            if (gameLoopRef.current) cancelAnimationFrame(gameLoopRef.current);
            if (obstacleTimerRef.current) clearInterval(obstacleTimerRef.current);
        }
        return () => {
            if (gameLoopRef.current) cancelAnimationFrame(gameLoopRef.current);
            if (obstacleTimerRef.current) clearInterval(obstacleTimerRef.current);
        };
    }, [status, gameTick, spawnObstacle, gameWidth]);

    return (
        <div className="bg-teal-800 p-4 md:p-6 rounded-lg border border-teal-700">
            <h3 className="text-2xl md:text-3xl font-bold text-center text-cyan-300 mb-4">{translations.runWithFaisalTitle[lang]}</h3>
            <div
                ref={gameContainerRef}
                className="relative bg-teal-900 rounded-md overflow-hidden border-2 border-teal-600 w-full max-w-[800px] mx-auto touch-manipulation cursor-pointer"
                style={{ height: `${GAME_HEIGHT}px` }}
                onClick={jump}
                role="button"
                tabIndex={0}
                onKeyPress={(e) => { if (e.key === 'Enter' || e.key === ' ') jump(); }}
                aria-label={translations.runWithFaisalTitle[lang]}
            >
                <div className="absolute bottom-0 left-0 w-full h-1 bg-cyan-400"></div>
                <div className="absolute bottom-1 right-4 text-cyan-400 font-black text-xl md:text-2xl opacity-20 select-none">{translations.myPathToSuccess[lang]}</div>
                
                {/* Faisal Character */}
                <div style={{ 
                    position: 'absolute', 
                    left: 50, 
                    bottom: GAME_HEIGHT - faisalY - FAISAL_HEIGHT,
                    width: FAISAL_WIDTH, 
                    height: FAISAL_HEIGHT,
                    backgroundImage: `url('https://picsum.photos/seed/faisal-char/40/60')`,
                    backgroundSize: 'cover',
                    borderRadius: '5px'
                }}></div>

                {/* Obstacles */}
                {obstacles.map(obs => {
                    const obsType = obstacleTypes[obs.typeIndex];
                    return (
                        <div key={obs.id} style={{ 
                            position: 'absolute', 
                            left: obs.x,
                            bottom: 0,
                            width: obsType.width, 
                            height: obsType.height,
                            color: '#fbbf24',
                        }}>
                          {obsType.component}
                        </div>
                    );
                })}

                {/* UI Overlays */}
                {status !== 'running' && (
                    <div className="absolute inset-0 bg-black bg-opacity-70 flex flex-col items-center justify-center text-white z-10 p-4">
                        {status === 'idle' && (
                            <>
                                <p className="text-lg md:text-xl mb-4 text-center">{translations.runWithFaisalInstructions[lang]}</p>
                                <button onClick={startGame} className="bg-cyan-500 text-black font-bold py-3 px-8 rounded-md text-lg hover:bg-cyan-400 transition-colors">
                                    {lang === 'ar' ? 'ابدأ' : 'Start'}
                                </button>
                            </>
                        )}
                        {status === 'over' && (
                            <>
                                <h4 className="text-3xl md:text-4xl font-bold text-red-500">{translations.gameOver[lang]}</h4>
                                <p className="text-xl md:text-2xl mt-2">{translations.score[lang]}: {Math.floor(score/10)}</p>
                                <button onClick={startGame} className="mt-6 bg-cyan-500 text-black font-bold py-3 px-8 rounded-md text-lg hover:bg-cyan-400 transition-colors">
                                    {translations.playAgain[lang]}
                                </button>
                            </>
                        )}
                    </div>
                )}
                 <div className="absolute top-2 right-2 text-lg md:text-xl font-bold text-white z-20">
                    {translations.score[lang]}: {status === 'running' ? Math.floor(score / 10) : 0}
                </div>
            </div>
        </div>
    );
};

export default RunWithFaisalGame;