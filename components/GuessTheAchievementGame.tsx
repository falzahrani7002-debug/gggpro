import React, { useState, useEffect, useContext, useMemo } from 'react';
import { AppContext } from '../App';

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

    const scrambleText = (text: string): string => {
        return text.split(' ').map(word => 
            word.split('').sort(() => 0.5 - Math.random()).join('')
        ).join(' ');
    };

    const setupNewChallenge = () => {
        const randomIndex = Math.floor(Math.random() * achievements.length);
        const newAchievement = achievements[randomIndex];
        setCurrentAchievement(newAchievement);
        setScrambled(scrambleText(newAchievement));
        setGuess('');
        setMessage({ text: '', type: '' });
    };

    useEffect(() => {
        setupNewChallenge();
    }, [achievements]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (guess.trim().toLowerCase() === currentAchievement.toLowerCase()) {
            setMessage({ text: lang === 'ar' ? 'إجابة صحيحة! أحسنت.' : 'Correct! Well done.', type: 'success' });
        } else {
            setMessage({ text: lang === 'ar' ? 'إجابة خاطئة. حاول مرة أخرى!' : 'Incorrect guess. Try again!', type: 'error' });
        }
    };

    return (
        <div className="bg-teal-800 p-8 rounded-lg border border-teal-700 text-center max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold text-amber-300 mb-4">
                {lang === 'ar' ? 'حاول تخمين الإنجاز بناءً على الحروف المبعثرة' : 'Guess the achievement from the scrambled letters'}
            </h3>
            
            <p className="text-3xl font-bold text-white tracking-widest my-8 p-4 bg-teal-900 rounded-md select-none">
                {scrambled}
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 justify-center">
                <input
                    type="text"
                    value={guess}
                    onChange={(e) => setGuess(e.target.value)}
                    placeholder={lang === 'ar' ? 'اكتب تخمينك هنا...' : 'Type your guess here...'}
                    className="flex-grow bg-teal-900 text-white rounded-md border-2 border-teal-600 focus:border-amber-500 focus:ring-amber-500 px-4 py-3"
                    disabled={message.type === 'success'}
                />
                <button
                    type="submit"
                    className="bg-amber-500 text-black font-bold py-3 px-6 rounded-md hover:bg-amber-400 transition-colors duration-300 disabled:bg-gray-500"
                    disabled={message.type === 'success'}
                >
                    {lang === 'ar' ? 'خمن' : 'Guess'}
                </button>
            </form>

            {message.text && (
                <p className={`mt-4 text-lg font-semibold ${message.type === 'success' ? 'text-emerald-400' : 'text-red-400'}`}>
                    {message.text}
                </p>
            )}

            <button
                onClick={setupNewChallenge}
                className="mt-6 bg-cyan-600 text-white font-bold py-3 px-6 rounded-md hover:bg-cyan-500 transition-colors duration-300"
            >
                {lang === 'ar' ? 'تحدي جديد' : 'New Challenge'}
            </button>
        </div>
    );
};

export default GuessTheAchievementGame;
