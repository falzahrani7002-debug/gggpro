
import React from 'react';
import GuessTheAchievementGame from './GuessTheAchievementGame';
import RunWithFaisalGame from './RunWithFaisalGame';
import SmartChoiceGame from './SmartChoiceGame';

const EntertainmentSection: React.FC = () => {
  return (
    <div className="space-y-12 md:space-y-16">
      <GuessTheAchievementGame />
      <RunWithFaisalGame />
      <SmartChoiceGame />
    </div>
  );
};

export default EntertainmentSection;
