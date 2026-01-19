
import React, { useState, useEffect, useContext, useMemo, useCallback } from 'react';
import { AppContext } from '../App';
import GiftFallEffect from './GiftFallEffect';

const GuessTheAchievementGame: React.FC = () => {
    const context = useContext(AppContext);
    if (!context) return null;
    const { lang, data } = context;

    const achievements = useMemo(() => [
        ...data.goals.shortTerm.map(g => g.text[lang]),
        ...data.goals.longTerm.map(g => g.text[lang]),
        ...data.gallery.map(g => g.title[lang]),
    ], [data, lang]);

    const [currentAchievement, setCurrentAchievement] = useState('');
    const [scrambled, setScrambled] = useState('');
    const [guess, setGuess] = useState('');
    const [message, setMessage] = useState<{ text: string, type: 'success' | 'error' | '' }>({ text: '', type: '' });
    const [showGiftFall] = useState(false);

    const scrambleText = (text: string): string => {
        return text.split(' ').map(word => 
            word.split('').sort(() => 0.5 - Math.random()).join('')
        ).join(' ');
    };

    const setupNewChallenge = useCallback(() => {
        if (achievements.length === 0) return;
        const randomIndex = Math.floor(Math.random() * achievements.length);
        const newAchievement = achievements[randomIndex];
        setCurrentAchievement(newAchievement);
        setScrambled(scrambleText(newAchievement));
        setGuess('');
        setMessage({ text: '', type: '' });
    }, [achievements]);

    useEffect(() => {
        setupNewChallenge();
    }, [setupNewChallenge]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (guess.trim().toLowerCase() === currentAchievement.toLowerCase()) {
            setMessage({ text: lang === 'ar' ? 'إجابة صحيحة! أحسنت.' : 'Correct! Well done.', type: 'success' });
        } else {
            setMessage({ text: lang === 'ar' ? 'إجابة خاطئة. حاول مرة أخرى!' : 'Incorrect guess. Try again!', type: 'error' });
        }
    };

    return (
        <div className="bg-red-950/40 p-8 rounded-lg border-2 border-red-700/50 text-center max-w-3xl mx-auto relative overflow-hidden shadow-lg shadow-red-900/20">
            <h3 className="text-2xl font-bold text-red-400 mb-4 drop-shadow-sm">
                {lang === 'ar' ? 'تخمين الإنجاز الحروف المبعثرة' : 'Guess the achievement from the scrambled letters'}
            </h3>
            
            <p className="text-2xl md:text-3xl font-bold text-white tracking-widest my-8 p-6 bg-red-900/60 rounded-xl select-none border border-red-800 shadow-inner">
                {scrambled}
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 justify-center">
                <input
                    type="text"
                    value={guess}
                    onChange={(e) => setGuess(e.target.value)}
                    placeholder={lang === 'ar' ? 'اكتب تخمينك هنا...' : 'Type your guess here...'}
                    className="flex-grow bg-red-950 border-2 border-red-800 focus:border-red-500 focus:ring-red-500 px-4 py-3 rounded-md text-red-100 placeholder-red-700"
                    disabled={message.type === 'success'}
                />
                <button
                    type="submit"
                    className="bg-red-600 text-white font-bold py-3 px-8 rounded-md hover:bg-red-500 transition-all duration-300 shadow-lg shadow-red-900/40 disabled:bg-gray-700"
                    disabled={message.type === 'success'}
                >
                    {lang === 'ar' ? 'خمن' : 'Guess'}
                </button>
            </form>

            {message.text && (
                <p className={`mt-6 text-xl font-bold ${message.type === 'success' ? 'text-green-400 animate-bounce' : 'text-red-400 animate-pulse'}`}>
                    {message.text}
                </p>
            )}

            <button
                onClick={setupNewChallenge}
                className="mt-8 text-red-300 hover:text-red-100 font-bold underline transition-colors"
            >
                {lang === 'ar' ? 'تحدي جديد' : 'New Challenge'}
            </button>
        </div>
    );
};

export default GuessTheAchievementGame;
