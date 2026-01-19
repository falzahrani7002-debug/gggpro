
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

        let newVelocityY = velocityY + GRAVITY;
        let newFaisalY = faisalY + newVelocityY;
        if (newFaisalY > GROUND_Y) {
            newFaisalY = GROUND_Y;
            newVelocityY = 0;
        }
        setFaisalY(newFaisalY);
        setVelocityY(newVelocityY);

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
        <div className="bg-cyan-900/30 p-4 md:p-8 rounded-lg border-2 border-cyan-500/40 shadow-xl shadow-cyan-900/20">
            <h3 className="text-2xl md:text-3xl font-black text-center text-cyan-400 mb-6 drop-shadow-md uppercase tracking-wider">{translations.runWithFaisalTitle[lang]}</h3>
            <div
                ref={gameContainerRef}
                className="relative bg-cyan-950 rounded-xl overflow-hidden border-2 border-cyan-400/50 w-full max-w-[800px] mx-auto touch-manipulation cursor-pointer shadow-inner"
                style={{ height: `${GAME_HEIGHT}px` }}
                onClick={jump}
                role="button"
                tabIndex={0}
                onKeyPress={(e) => { if (e.key === 'Enter' || e.key === ' ') jump(); }}
                aria-label={translations.runWithFaisalTitle[lang]}
            >
                <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-cyan-600 via-sky-400 to-cyan-600"></div>
                <div className="absolute bottom-2 right-4 text-cyan-400 font-black text-xl md:text-2xl opacity-10 select-none italic">{translations.myPathToSuccess[lang]}</div>
                
                {/* Faisal Character */}
                <div className="shadow-lg shadow-cyan-500/20" style={{ 
                    position: 'absolute', 
                    left: 50, 
                    bottom: GAME_HEIGHT - faisalY - FAISAL_HEIGHT,
                    width: FAISAL_WIDTH, 
                    height: FAISAL_HEIGHT,
                    backgroundImage: `url('https://picsum.photos/seed/faisal-char/40/60')`,
                    backgroundSize: 'cover',
                    borderRadius: '8px',
                    border: '2px solid rgba(34, 211, 238, 0.5)'
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
                            color: '#22d3ee', // Cyan-400
                            filter: 'drop-shadow(0 0 5px rgba(34, 211, 238, 0.8))'
                        }}>
                          {obsType.component}
                        </div>
                    );
                })}

                {/* UI Overlays */}
                {status !== 'running' && (
                    <div className="absolute inset-0 bg-cyan-950/80 backdrop-blur-sm flex flex-col items-center justify-center text-white z-10 p-4">
                        {status === 'idle' && (
                            <>
                                <p className="text-lg md:text-xl mb-6 text-center font-bold text-cyan-200">{translations.runWithFaisalInstructions[lang]}</p>
                                <button onClick={startGame} className="bg-cyan-500 text-black font-black py-3 px-10 rounded-full text-lg hover:bg-cyan-400 hover:scale-110 transition-all shadow-lg shadow-cyan-500/50">
                                    {lang === 'ar' ? 'انطلق!' : 'Start!'}
                                </button>
                            </>
                        )}
                        {status === 'over' && (
                            <>
                                <h4 className="text-4xl md:text-5xl font-black text-red-500 drop-shadow-md mb-2">{translations.gameOver[lang]}</h4>
                                <p className="text-2xl md:text-3xl mt-2 font-bold text-cyan-100">{translations.score[lang]}: {Math.floor(score/10)}</p>
                                <button onClick={startGame} className="mt-8 bg-white text-cyan-900 font-black py-3 px-10 rounded-full text-lg hover:bg-cyan-100 transition-all shadow-xl">
                                    {translations.playAgain[lang]}
                                </button>
                            </>
                        )}
                    </div>
                )}
                 <div className="absolute top-4 right-4 text-xl md:text-2xl font-black text-cyan-100 z-20 bg-cyan-900/50 px-4 py-1 rounded-full border border-cyan-400/30">
                    {translations.score[lang]}: {status === 'running' ? Math.floor(score / 10) : 0}
                </div>
            </div>
        </div>
    );
};

export default RunWithFaisalGame;
