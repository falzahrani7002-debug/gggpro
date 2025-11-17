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
    <div className="bg-teal-800 p-6 rounded-lg border border-teal-700 max-w-3xl mx-auto">
      <h3 className="text-3xl font-bold text-center text-amber-400 mb-2">{translations.smartChoiceTitle[lang]}</h3>
      <p className="text-center text-amber-300 mb-6">{translations.smartChoiceInstructions[lang]}</p>
      
      <div className="bg-teal-900 p-6 rounded-md min-h-[300px] flex flex-col justify-center">
        {isFinished ? (
          <div className="text-center">
            <h4 className="text-2xl font-bold text-amber-400">{translations.finalScore[lang]}</h4>
            <p className="text-5xl font-black my-4" style={{ color: score > 0 ? '#22c55e' : '#ef4444' }}>{score}</p>
            <p className="text-xl text-amber-300">{translations.intelligencePoints[lang]}</p>
            <button onClick={handleReset} className="mt-6 bg-cyan-600 text-white font-bold py-2 px-6 rounded-md hover:bg-cyan-500 transition-colors">
              {translations.restartQuiz[lang]}
            </button>
          </div>
        ) : (
          <div>
            <p className="text-xl text-center text-amber-300 font-semibold mb-6">{currentScenario.question[lang]}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentScenario.choices.map((choice, index) => {
                const choiceIsSelected = showFeedback && choice === selectedChoice;
                const buttonTextColor = choiceIsSelected ? 'text-white' : 'text-amber-300';

                return (
                  <button
                    key={index}
                    onClick={() => handleChoiceClick(choice)}
                    disabled={showFeedback}
                    className={`p-4 rounded-md transition-all duration-300 border-2 text-center font-semibold text-xl ${buttonTextColor} ${
                      showFeedback
                        ? (choiceIsSelected ? (choice.points > 0 ? 'bg-emerald-500 border-emerald-400' : 'bg-red-500 border-red-400') : 'bg-gray-600 border-gray-500 opacity-50')
                        : 'bg-teal-700 border-teal-600 hover:bg-cyan-700 hover:border-cyan-500'
                    }`}
                  >
                    {choice.text[lang]}
                  </button>
                )
              })}
            </div>
            {showFeedback && selectedChoice && (
              <div className="mt-6 text-center animate-fade-in">
                <p className={`text-lg font-semibold ${selectedChoice.points > 0 ? 'text-emerald-300' : 'text-red-300'}`}>
                  {selectedChoice.feedback[lang]} ({selectedChoice.points > 0 ? `+${selectedChoice.points}` : selectedChoice.points})
                </p>
                <button onClick={handleNext} className="mt-4 bg-cyan-500 text-black font-bold py-2 px-6 rounded-md hover:bg-cyan-400 transition-colors">
                  {translations.next[lang]}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
      {!isFinished && <div className="mt-4 text-right rtl:text-left text-lg font-bold text-amber-300">{translations.intelligencePoints[lang]}: {score}</div>}
    </div>
  );
};

export default SmartChoiceGame;