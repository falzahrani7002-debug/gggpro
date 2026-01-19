
import React, { useState, useMemo, useContext } from 'react';
import { AppContext } from '../App';
import { translations } from '../data';
import { Translatable } from '../types';

interface Choice {
  text: Translatable;
  points: number;
  feedback: Translatable;
}

interface Scenario {
  id: number;
  question: Translatable;
  choices: Choice[];
}

const SmartChoiceGame: React.FC = () => {
  const context = useContext(AppContext);
  if (!context) return null;
  const { lang } = context;

  const scenarios: Scenario[] = useMemo(() => [
    {
      id: 1,
      question: { ar: "حان وقت الواجب المدرسي، لكن برنامجك المفضل يُعرَض على التلفاز. ماذا تفعل؟", en: "It's time for homework, but your favorite show is on TV. What do you do?" },
      choices: [
        { text: { ar: "أقوم بواجبي أولاً، ثم أشاهد التلفاز", en: "Do homework first, then watch TV" }, points: 10, feedback: { ar: "قرار ممتاز! المسؤولية أولاً.", en: "Great choice! Responsibility first." } },
        { text: { ar: "أشاهد التلفاز الآن، وأؤجل الواجب", en: "Watch TV now, do homework later" }, points: -5, feedback: { ar: "تذكر، التسويف قد يسبب ضغطاً لاحقاً.", en: "Remember, procrastination can lead to stress later." } },
      ],
    },
    {
      id: 2,
      question: { ar: "رأيت زميلك يواجه صعوبة في حل مسألة رياضيات.", en: "You see a classmate struggling with a math problem." },
      choices: [
        { text: { ar: "أعرض عليه المساعدة", en: "Offer to help them" }, points: 10, feedback: { ar: "مساعدة الآخرين من صفات القائد العظيم!", en: "Helping others is a sign of a great leader!" } },
        { text: { ar: "أتجاهله وأكمل عملي بسرعة", en: "Ignore them and finish your work quickly" }, points: -5, feedback: { ar: "العمل الجماعي يجعل الجميع أقوى.", en: "Teamwork makes everyone stronger." } },
      ],
    },
    {
      id: 3,
      question: { ar: "لديك مشروع كبير يجب تسليمه الأسبوع القادم.", en: "You have a big project due next week." },
      choices: [
        { text: { ar: "أخطط لعملي وأبدأ بالعمل عليه اليوم", en: "Plan my work and start on it today" }, points: 10, feedback: { ar: "تخطيط ممتاز! هذا هو مفتاح النجاح.", en: "Excellent planning! This is the key to success." } },
        { text: { ar: "أنتظر حتى اليوم الأخير للبدء به", en: "Wait until the last day to start" }, points: -5, feedback: { ar: "البدء مبكراً يقلل الضغط ويحسن جودة العمل.", en: "Starting early reduces pressure and improves quality." } },
      ],
    },
  ], []);

  const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState<Choice | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const handleChoiceClick = (choice: Choice) => {
    if (showFeedback) return;
    setScore(s => s + choice.points);
    setSelectedChoice(choice);
    setShowFeedback(true);
  };

  const handleNext = () => {
    setShowFeedback(false);
    setSelectedChoice(null);
    setCurrentScenarioIndex(i => i + 1);
  };

  const handleReset = () => {
    setCurrentScenarioIndex(0);
    setScore(0);
    setSelectedChoice(null);
    setShowFeedback(false);
  };

  const isFinished = currentScenarioIndex >= scenarios.length;
  const currentScenario = scenarios[currentScenarioIndex];

  return (
    <div className="bg-amber-900/20 p-8 rounded-2xl border-2 border-amber-500/50 max-w-3xl mx-auto shadow-2xl shadow-amber-900/30">
      <h3 className="text-3xl md:text-4xl font-black text-center text-amber-400 mb-2 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">{translations.smartChoiceTitle[lang]}</h3>
      <p className="text-center text-amber-200/80 mb-8 font-medium italic">{translations.smartChoiceInstructions[lang]}</p>
      
      <div className="bg-amber-950/40 p-6 md:p-10 rounded-xl min-h-[350px] flex flex-col justify-center border border-amber-800/50 shadow-inner">
        {isFinished ? (
          <div className="text-center animate-fade-in">
            <h4 className="text-2xl font-bold text-amber-400 uppercase tracking-widest">{translations.finalScore[lang]}</h4>
            <p className="text-7xl font-black my-6 text-transparent bg-clip-text bg-gradient-to-b from-amber-300 via-yellow-500 to-amber-600 drop-shadow-md">
                {score}
            </p>
            <p className="text-xl text-amber-200 font-bold">{translations.intelligencePoints[lang]}</p>
            <button onClick={handleReset} className="mt-8 bg-gradient-to-r from-amber-500 to-yellow-400 text-amber-950 font-black py-3 px-10 rounded-full hover:scale-105 transition-transform shadow-lg shadow-amber-500/40">
              {translations.restartQuiz[lang]}
            </button>
          </div>
        ) : (
          <div>
            <p className="text-2xl text-center text-amber-100 font-black mb-10 leading-relaxed drop-shadow-sm">{currentScenario.question[lang]}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {currentScenario.choices.map((choice, index) => {
                const choiceIsSelected = showFeedback && choice === selectedChoice;
                const buttonTextColor = choiceIsSelected ? 'text-white' : 'text-amber-100';

                return (
                  <button
                    key={index}
                    onClick={() => handleChoiceClick(choice)}
                    disabled={showFeedback}
                    className={`p-6 rounded-xl transition-all duration-300 border-2 text-center font-bold text-lg md:text-xl shadow-md ${
                      showFeedback
                        ? (choiceIsSelected ? (choice.points > 0 ? 'bg-green-600 border-green-400 scale-105' : 'bg-red-600 border-red-400') : 'bg-amber-950/50 border-amber-900/50 opacity-40')
                        : 'bg-amber-800/40 border-amber-600/50 hover:bg-amber-500 hover:border-amber-400 hover:text-amber-950 hover:scale-105'
                    } ${buttonTextColor}`}
                  >
                    {choice.text[lang]}
                  </button>
                )
              })}
            </div>
            {showFeedback && selectedChoice && (
              <div className="mt-10 text-center animate-fade-in bg-amber-900/40 p-4 rounded-lg border border-amber-500/20">
                <p className={`text-xl font-black ${selectedChoice.points > 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {selectedChoice.feedback[lang]} <span className="text-2xl">({selectedChoice.points > 0 ? `+${selectedChoice.points}` : selectedChoice.points})</span>
                </p>
                <button onClick={handleNext} className="mt-6 bg-white text-amber-950 font-black py-2 px-10 rounded-full hover:bg-amber-100 transition-colors shadow-md">
                  {translations.next[lang]}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
      {!isFinished && (
        <div className="mt-6 flex justify-between items-center text-amber-400 font-black px-2">
            <span className="text-sm opacity-60 uppercase tracking-tighter">Faisal IQ challenge</span>
            <div className="text-2xl bg-amber-950/50 px-4 py-1 rounded-lg border border-amber-500/30">
                {translations.intelligencePoints[lang]}: {score}
            </div>
        </div>
      )}
    </div>
  );
};

export default SmartChoiceGame;
