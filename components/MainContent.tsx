
import React, { useContext } from 'react';
import { AppContext } from '../App';
import { Page } from '../types';
import { translations } from '../data';
import Section from './Section';
import {
  UserIcon, EducationIcon, SparklesIcon, HeartIcon, FlagIcon, RocketIcon,
  GalleryIcon, ProjectIcon, StarIcon, CheckIcon, TargetIcon, CommunityIcon,
  FootballIcon, CalculatorIcon, BookIcon, PuzzleIcon, CodeIcon, ChessIcon
} from './Icons';
import Gallery from './Gallery';
import GuessTheAchievementGame from './GuessTheAchievementGame';
import Editable from './Editable';
import CommunityAchievements from './CommunityAchievements';

const MainContent: React.FC<{ page: Page }> = ({ page }) => {
  const context = useContext(AppContext);
  if (!context) return null;
  const { lang, data, setData } = context;

  const handleDataChange = (path: string, value: any) => {
    setData(prevData => {
      const keys = path.split('.');
      const newData = JSON.parse(JSON.stringify(prevData));
      let current = newData;
      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]];
      }
      current[keys[keys.length - 1]] = value;
      return newData;
    });
  };

  const renderContent = () => {
    switch (page) {
      case 'about':
        return (
          <Section title={translations.nav.about[lang]} icon={<UserIcon />}>
            <div className="bg-teal-800 p-8 rounded-lg border border-teal-700 shadow-inner" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='84' height='48' viewBox='0 0 84 48' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h12v12H0V0zm24 0h12v12H24V0zm48 0h12v12H72V0zm-36 24h12v12H36V24zm48 0h12v12H84V24zM0 24h12v12H0V24zm48-12h12v12H48V12zm-24 0h12v12H24V12zm24 24h12v12H48V36zm-24 0h12v12H24V36z' fill='%2314b8a6' fill-opacity='0.08' fill-rule='evenodd'/%3E%3C/svg%3E")`,
            }}>
              <div className="flex flex-col md:flex-row items-center gap-8 text-center md:text-start rtl:md:text-right">
                <img src="https://picsum.photos/seed/green-nature/200/200" alt={data.studentInfo.name} className="w-48 h-48 rounded-full border-4 border-cyan-500 object-cover shadow-lg" />
                <div className="flex-1">
                  <Editable
                    value={data.studentInfo.name}
                    onSave={(newValue) => handleDataChange('studentInfo.name', newValue)}
                    tag="h2"
                    className="text-4xl font-black text-cyan-400"
                  />
                  <div className="text-xl text-cyan-300 mt-1">
                    <Editable
                      value={data.studentInfo.grade[lang]}
                      onSave={(newValue) => handleDataChange(`studentInfo.grade.${lang}`, newValue)}
                      tag="span"
                      className="text-xl text-cyan-300"
                    /> @ <Editable
                      value={data.studentInfo.school}
                      onSave={(newValue) => handleDataChange('studentInfo.school', newValue)}
                      tag="span"
                      className="text-xl text-cyan-300"
                    />
                  </div>
                   <Editable
                      value={data.studentInfo.about[lang]}
                      onSave={(newValue) => handleDataChange(`studentInfo.about.${lang}`, newValue)}
                      tag="p"
                      as="textarea"
                      className="mt-4 text-lg text-cyan-200 leading-relaxed"
                    />
                </div>
              </div>
            </div>
          </Section>
        );

      case 'education':
        return (
          <Section title={translations.nav.education[lang]} icon={<EducationIcon />}>
            <Timeline items={data.education.map((item, index) => ({
              id: item.id,
              title: <Editable value={item.degree[lang]} onSave={v => handleDataChange(`education.${index}.degree.${lang}`, v)} tag="span" />,
              subtitle: <Editable value={item.institution[lang]} onSave={v => handleDataChange(`education.${index}.institution.${lang}`, v)} tag="span" />,
              period: <Editable value={item.years} onSave={v => handleDataChange(`education.${index}.years`, v)} tag="span" />
            }))} />
          </Section>
        );

      case 'skills':
        return (
          <Section title={translations.nav.skills[lang]} icon={<SparklesIcon />}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {data.skills.map((skill, index) => <SkillBar 
                key={skill.id} 
                name={<Editable value={skill.name[lang]} onSave={v => handleDataChange(`skills.${index}.name.${lang}`, v)} tag="span" />} 
                level={skill.level} 
              />)}
            </div>
          </Section>
        );
      
      case 'volunteer':
        return (
          <Section title={translations.nav.volunteer[lang]} icon={<HeartIcon />}>
             <Timeline items={data.volunteerWork.map((item, index) => ({
              id: item.id,
              title: <Editable value={item.role[lang]} onSave={v => handleDataChange(`volunteerWork.${index}.role.${lang}`, v)} tag="span" />,
              subtitle: <Editable value={item.organization[lang]} onSave={v => handleDataChange(`volunteerWork.${index}.organization.${lang}`, v)} tag="span" />,
              period: <Editable value={item.years} onSave={v => handleDataChange(`volunteerWork.${index}.years`, v)} tag="span" />,
              description: <Editable value={item.description[lang]} onSave={v => handleDataChange(`volunteerWork.${index}.description.${lang}`, v)} tag="span" as="textarea" />
            }))} />
          </Section>
        );
      
      case 'hobbies':
        return (
          <Section title={translations.nav.hobbies[lang]} icon={<FlagIcon />}>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 text-center">
              {data.hobbies.map((hobby, index) => (
                <div key={hobby.id} className="bg-teal-800 p-6 rounded-lg border border-teal-700 hover:border-cyan-500 hover:scale-105 transition-all duration-300">
                  <div className="w-16 h-16 mx-auto text-cyan-400">
                    {hobby.icon === 'football' && <FootballIcon />}
                    {hobby.icon === 'calculator' && <CalculatorIcon />}
                    {hobby.icon === 'book' && <BookIcon />}
                    {hobby.icon === 'code' && <CodeIcon />}
                    {hobby.icon === 'chess' && <ChessIcon />}
                  </div>
                   <Editable 
                     value={hobby.name[lang]} 
                     onSave={v => handleDataChange(`hobbies.${index}.name.${lang}`, v)} 
                     tag="h3"
                     className="mt-4 text-xl font-bold"
                    />
                </div>
              ))}
            </div>
          </Section>
        );
      
      case 'goals':
        return (
          <Section title={translations.nav.goals[lang]} icon={<RocketIcon />}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-bold text-cyan-400 mb-4 flex items-center gap-2">
                  <TargetIcon /> {translations.shortTermGoals[lang]}
                </h3>
                <ul className="space-y-3">
                  {data.goals.shortTerm.map((goal, index) => (
                    <li key={goal.id} className="flex items-start gap-3 p-3 bg-teal-800 rounded-md">
                      <CheckIcon className="w-6 h-6 text-emerald-400 mt-1 flex-shrink-0" />
                      <Editable value={goal.text[lang]} onSave={v => handleDataChange(`goals.shortTerm.${index}.text.${lang}`, v)} tag="span" />
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-cyan-400 mb-4 flex items-center gap-2">
                  <TargetIcon /> {translations.longTermGoals[lang]}
                </h3>
                <ul className="space-y-3">
                  {data.goals.longTerm.map((goal, index) => (
                    <li key={goal.id} className="flex items-start gap-3 p-3 bg-teal-800 rounded-md">
                      <CheckIcon className="w-6 h-6 text-cyan-400 mt-1 flex-shrink-0" />
                      <Editable value={goal.text[lang]} onSave={v => handleDataChange(`goals.longTerm.${index}.text.${lang}`, v)} tag="span" />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Section>
        );
      
      case 'gallery':
        return (
          <Section title={translations.nav.gallery[lang]} icon={<GalleryIcon />}>
            <Gallery />
          </Section>
        );

      case 'project':
        const project = data.featuredProject;
        return (
          <Section title={translations.nav.project[lang]} icon={<ProjectIcon />}>
            <div className="bg-teal-800 rounded-lg overflow-hidden shadow-lg border border-teal-700">
              <img src={project.imageUrl} alt={project.title[lang]} className="w-full h-64 md:h-96 object-cover" />
              <div className="p-8">
                <Editable value={project.title[lang]} onSave={v => handleDataChange(`featuredProject.title.${lang}`, v)} tag="h2" className="text-4xl font-black text-cyan-400 mb-2" />
                <Editable value={project.description[lang]} onSave={v => handleDataChange(`featuredProject.description.${lang}`, v)} tag="p" as="textarea" className="text-lg text-cyan-300 mb-6" />
                <div className="prose prose-invert max-w-none text-cyan-200">
                   <Editable value={project.details[lang]} onSave={v => handleDataChange(`featuredProject.details.${lang}`, v)} as="textarea" tag="div" />
                </div>
              </div>
            </div>
          </Section>
        );

      case 'evaluations':
        return (
          <Section title={translations.nav.evaluations[lang]} icon={<StarIcon />}>
            <div className="space-y-8">
              {data.evaluations.map((evalItem, index) => (
                <blockquote key={evalItem.id} className="bg-teal-800 p-6 rounded-lg border-l-4 border-cyan-500 rtl:border-l-0 rtl:border-r-4">
                  <Editable value={evalItem.comment[lang]} onSave={v => handleDataChange(`evaluations.${index}.comment.${lang}`, v)} as="textarea" tag="p" className="text-lg italic text-cyan-200" />
                  <footer className="mt-4">
                    <Editable value={evalItem.author} onSave={v => handleDataChange(`evaluations.${index}.author`, v)} tag="p" className="font-bold text-white" />
                    <Editable value={evalItem.role[lang]} onSave={v => handleDataChange(`evaluations.${index}.role.${lang}`, v)} tag="p" className="text-sm text-cyan-300" />
                  </footer>
                </blockquote>
              ))}
            </div>
          </Section>
        );
        
      case 'game':
        return (
          <Section title={translations.nav.game[lang]} icon={<PuzzleIcon />}>
            <GuessTheAchievementGame />
          </Section>
        );
      
      case 'community':
        return (
          <Section title={translations.nav.community[lang]} icon={<CommunityIcon />}>
            <CommunityAchievements />
          </Section>
        );

      default:
        return <div>Page not found</div>;
    }
  };

  return <div className="container mx-auto">{renderContent()}</div>;
};

const Section: React.FC<{ title: string; icon: React.ReactNode; children: React.ReactNode }> = ({ title, icon, children }) => (
  <section className="mb-16 animate-fade-in">
    <div className="flex items-center gap-4 mb-8">
      <div className="text-cyan-400 w-10 h-10">{icon}</div>
      <h2 className="text-3xl md:text-4xl font-black text-white border-b-2 border-cyan-500 pb-2">{title}</h2>
    </div>
    {children}
  </section>
);


const SkillBar: React.FC<{ name: React.ReactNode, level: number }> = ({ name, level }) => (
  <div className="w-full">
    <div className="flex justify-between mb-1">
      <span className="text-base font-medium text-cyan-300">{name}</span>
      <span className="text-sm font-medium text-cyan-500">{level}%</span>
    </div>
    <div className="w-full bg-teal-700 rounded-full h-4">
      <div className="bg-cyan-500 h-4 rounded-full" style={{ width: `${level}%` }}></div>
    </div>
  </div>
);

const Timeline: React.FC<{ items: { id: string; title: React.ReactNode; subtitle: React.ReactNode; period: React.ReactNode; description?: React.ReactNode }[] }> = ({ items }) => (
  <div className="relative border-l-2 border-cyan-500 rtl:border-l-0 rtl:border-r-2 ml-4 rtl:ml-0 rtl:mr-4 space-y-12">
    {items.map((item) => (
      <div key={item.id} className="pl-8 rtl:pl-0 rtl:pr-8 relative">
        <div className="absolute -left-2.5 rtl:-left-auto rtl:-right-2.5 top-1 w-5 h-5 bg-teal-900 border-2 border-cyan-500 rounded-full"></div>
        <time className="mb-1 text-sm font-normal leading-none text-cyan-300">{item.period}</time>
        <h3 className="text-xl font-semibold text-white">{item.title}</h3>
        <h4 className="text-md font-medium text-cyan-300">{item.subtitle}</h4>
        {item.description && <p className="mt-2 text-base font-normal text-cyan-200">{item.description}</p>}
      </div>
    ))}
  </div>
);

export default MainContent;