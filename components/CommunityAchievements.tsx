
import React, { useState, useEffect, useContext } from 'react';
import { AppContext } from '../App';
import { translations } from '../data';
import { db } from '../firebase-config';
import { collection, addDoc, query, orderBy, onSnapshot, serverTimestamp, Timestamp } from 'firebase/firestore';
import { XIcon } from './Icons';

interface CommunityAchievement {
  id: string;
  name: string;
  achievement: string;
  timestamp: Timestamp;
}

const CommunityAchievements: React.FC = () => {
    const context = useContext(AppContext);
    if (!context) return null;
    const { lang, isAdmin, isEditing, deleteCommunityAchievement } = context;

    const [achievements, setAchievements] = useState<CommunityAchievement[]>([]);
    const [name, setName] = useState('');
    const [achievement, setAchievement] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const q = query(collection(db, "communityAchievements"), orderBy("timestamp", "desc"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const achievementsData: CommunityAchievement[] = [];
            querySnapshot.forEach((doc) => {
                achievementsData.push({ id: doc.id, ...doc.data() } as CommunityAchievement);
            });
            setAchievements(achievementsData);
        });

        return () => unsubscribe();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim() || !achievement.trim()) {
            setError(translations.errorAllFieldsRequired[lang]);
            return;
        }
        
        setIsLoading(true);
        setError('');

        try {
            await addDoc(collection(db, "communityAchievements"), {
                name: name.trim(),
                achievement: achievement.trim(),
                timestamp: serverTimestamp()
            });
            setName('');
            setAchievement('');
        } catch (error) {
            console.error("Error adding document: ", error);
            setError("حدث خطأ أثناء إرسال إنجازك.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
                <div className="bg-teal-800 p-6 rounded-lg border border-teal-700 sticky top-28">
                    <h3 className="text-2xl font-bold text-cyan-400 mb-4">{translations.shareYourAchievement[lang]}</h3>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="name" className="block mb-1 ruqaa-label">{translations.yourName[lang]}</label>
                            <input
                                type="text"
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full bg-teal-900 rounded-md border-2 border-teal-600 focus:border-cyan-500 focus:ring-cyan-500 px-3 py-2 diwani-input"
                                placeholder={translations.yourNamePlaceholder[lang]}
                            />
                        </div>
                        <div>
                            <label htmlFor="achievement" className="block mb-1 ruqaa-label">{translations.yourAchievement[lang]}</label>
                            <textarea
                                id="achievement"
                                value={achievement}
                                onChange={(e) => setAchievement(e.target.value)}
                                rows={4}
                                className="w-full bg-teal-900 rounded-md border-2 border-teal-600 focus:border-cyan-500 focus:ring-cyan-500 px-3 py-2 diwani-input"
                                placeholder={translations.yourAchievementPlaceholder[lang]}
                            />
                        </div>
                        {error && <p className="text-red-400 text-sm">{error}</p>}
                        <button type="submit" disabled={isLoading} className="w-full bg-cyan-500 text-black font-bold py-2 px-4 rounded-md hover:bg-cyan-400 transition-colors duration-300 disabled:bg-gray-500">
                            {isLoading ? 'جارِ النشر...' : translations.submitAchievement[lang]}
                        </button>
                    </form>
                </div>
            </div>

            <div className="lg:col-span-2">
                <h3 className="text-3xl font-bold text-white mb-6">{translations.recentAchievements[lang]}</h3>
                <div className="space-y-6">
                    {achievements.length > 0 ? (
                        achievements.map(item => (
                            <div key={item.id} className="bg-teal-800 p-5 rounded-lg border-l-4 border-cyan-500 rtl:border-l-0 rtl:border-r-4 animate-fade-in relative group">
                                {isAdmin && isEditing && (
                                    <button
                                        onClick={() => deleteCommunityAchievement(item.id)}
                                        className="absolute top-2 right-2 rtl:right-auto rtl:left-2 z-10 w-7 h-7 bg-red-600 text-white rounded-full flex items-center justify-center hover:bg-red-500 transition-all opacity-0 group-hover:opacity-100"
                                        aria-label="Delete achievement"
                                    >
                                        <XIcon className="w-4 h-4" />
                                    </button>
                                )}
                                <p className="text-lg text-cyan-200 mb-3 whitespace-pre-wrap">{item.achievement}</p>
                                <div className="text-sm text-cyan-400 font-semibold text-right rtl:text-left">
                                    - {item.name}
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-16 bg-teal-800 rounded-lg">
                            <p className="text-cyan-300 text-lg">{translations.noAchievementsYet[lang]}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CommunityAchievements;
