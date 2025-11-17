
import React, { useState, useContext, useRef } from 'react';
import { AppContext } from '../App';
import { Page, Evaluation, Goal, EducationItem, Skill, VolunteerWork } from '../types';
import { translations } from '../data';
import Section from './Section';
import {
  UserIcon, EducationIcon, SparklesIcon, HeartIcon, RocketIcon,
  GalleryIcon, StarIcon, CheckIcon, TargetIcon, CommunityIcon, GameControllerIcon, XIcon, PlusIcon, PencilIcon
} from './Icons';
import Gallery from './Gallery';
import Editable from './Editable';
import CommunityAchievements from './CommunityAchievements';
import EntertainmentSection from './EntertainmentSection';
import AddItemModal from './AddItemModal';

const MainContent: React.FC<{ page: Page }> = ({ page }) => {
  const context = useContext(AppContext);
  if (!context || !context.data) return null;
  const { 
    lang, data, isEditing, isAdmin, 
    updateData, addArrayItem, deleteArrayItem, 
    updateEducationItem, updateSkill, updateVolunteerWork, updateGoal, updateEvaluation 
  } = context;

  // Ref for profile image input
  const profileImageInputRef = useRef<HTMLInputElement>(null);

  // State for the generic add modal
  const [modalInfo, setModalInfo] = useState<{ 
    path: string; 
    type: 'skill' | 'volunteer' | 'goal' | 'education', 
    goalType?: 'short' | 'long' 
  } | null>(null);

  // State for evaluation form
  const [evalAuthor, setEvalAuthor] = useState('');
  const [evalRole, setEvalRole] = useState('');
  const [evalComment, setEvalComment] = useState('');
  const [evalError, setEvalError] = useState('');
  
  const handleEvalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!evalAuthor.trim() || !evalRole.trim() || !evalComment.trim()) {
      setEvalError(translations.errorAllFieldsRequired[lang]);
      return;
    }

    const newEvaluation: Evaluation = {
      id: `eval-${Date.now()}`,
      author: evalAuthor.trim(),
      role: { ar: evalRole.trim(), en: evalRole.trim() },
      comment: { ar: evalComment.trim(), en: evalComment.trim() }
    };

    await addArrayItem('evaluations', newEvaluation);

    setEvalAuthor('');
    setEvalRole('');
    setEvalComment('');
    setEvalError('');
  };

  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
    });
  };

  const handleProfileImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
        const base64String = await convertToBase64(file);
        await updateData('studentInfo.profileImageUrl', base64String);
    } catch (error) {
        console.error("Error uploading profile image:", error);
        alert("حدث خطأ أثناء رفع الصورة.");
    }
  };

  const renderContent = () => {
    switch (page) {
      case 'about':
        return (
          <Section title={translations.nav.about[lang]} icon={<UserIcon />}>
            <div className="bg-teal-800 p-6 md:p-8 rounded-lg border border-teal-700 shadow-inner" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='84' height='48' viewBox='0 0 84 48' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h12v12H0V0zm24 0h12v12H24V0zm48 0h12v12H72V0zm-36 24h12v12H36V24zm48 0h12v12H84V24zM0 24h12v12H0V24zm48-12h12v12H48V12zm-24 0h12v12H24V12zm24 24h12v12H48V36zm-24 0h12v12H24V36z' fill='%2314b8a6' fill-opacity='0.08' fill-rule='evenodd'/%3E%3C/svg%3E")`,
            }}>
              <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8 text-center md:text-start rtl:md:text-right">
                <div className="relative flex-shrink-0">
                  <img 
                    src={data.studentInfo.profileImageUrl || "https://picsum.photos/seed/placeholder/200"} 
                    alt={data.studentInfo.name} 
                    className="w-32 h-32 md:w-48 md:h-48 rounded-full border-4 border-cyan-500 object-cover shadow-lg" 
                  />
                  {isEditing && (
                    <>
                      <button
                        onClick={() => profileImageInputRef.current?.click()}
                        className="absolute bottom-0 right-0 md:bottom-2 md:right-2 bg-cyan-500 text-black rounded-full p-2 hover:bg-cyan-400 transition-colors shadow-lg"
                        aria-label="تغيير الصورة الشخصية"
                      >
                        <PencilIcon className="w-5 h-5 md:w-6 md:h-6" />
                      </button>
                      <input
                        type="file"
                        ref={profileImageInputRef}
                        onChange={handleProfileImageChange}
                        className="hidden"
                        accept="image/*"
                      />
                    </>
                  )}
                </div>
                <div className="flex-1">
                  <Editable
                    value={data.studentInfo.name}
                    onSave={(newValue) => updateData('studentInfo.name', newValue)}
                    tag="h2"
                    className="text-3xl sm:text-4xl font-black text-cyan-400"
                  />
                  <div className="text-xl text-cyan-300 mt-1">
                    <Editable
                      value={data.studentInfo.grade[lang]}
                      onSave={(newValue) => updateData(`studentInfo.grade.${lang}`, newValue)}
                      tag="span"
                      className="text-lg md:text-xl text-cyan-300"
                    /> @ <Editable
                      value={data.studentInfo.school}
                      onSave={(newValue) => updateData('studentInfo.school', newValue)}
                      tag="span"
                      className="text-lg md:text-xl text-cyan-300"
                    />
                  </div>
                   <Editable
                      value={data.studentInfo.about[lang]}
                      onSave={(newValue) => updateData(`studentInfo.about.${lang}`, newValue)}
                      tag="p"
                      as="textarea"
                      className="mt-4 text-cyan-200 ruqaa-text"
                    />
                </div>
              </div>
            </div>
          </Section>
        );

      case 'education':
        return (
          <Section title={translations.nav.education[lang]} icon={<EducationIcon />}>
            <Timeline items={data.education.map((item) => ({
              id: item.id,
              title: <Editable value={item.degree[lang]} onSave={(newValue) => updateEducationItem({ ...item, degree: { ...item.degree, [lang]: newValue } })} tag="span" />,
              subtitle: <Editable value={item.institution[lang]} onSave={(newValue) => updateEducationItem({ ...item, institution: { ...item.institution, [lang]: newValue } })} tag="span" />,
              period: <Editable value={item.years} onSave={(newValue) => updateEducationItem({ ...item, years: newValue })} tag="span" />,
              onDelete: () => deleteArrayItem('education', item)
            }))} />
            {isAdmin && isEditing && (
                <div className="mt-8 text-center">
                  <button 
                    onClick={() => setModalInfo({ path: 'education', type: 'education' })}
                    className="bg-emerald-500 text-white font-bold py-2 px-4 rounded-md hover:bg-emerald-400 transition-colors duration-300 flex items-center gap-2 mx-auto"
                  >
                    <PlusIcon />
                    {lang === 'ar' ? 'إضافة مؤهل تعليمي' : 'Add Education'}
                  </button>
                </div>
              )}
          </Section>
        );

      case 'skills':
        return (
          <Section title={translations.nav.skills[lang]} icon={<SparklesIcon />}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {data.skills.map((skill) => (
                <div key={skill.id} className="relative group">
                  <SkillBar 
                    name={<Editable value={skill.name[lang]} onSave={(newValue) => updateSkill({ ...skill, name: { ...skill.name, [lang]: newValue } })} tag="span" />} 
                    level={skill.level} 
                  />
                   {isAdmin && isEditing && (
                    <button 
                      onClick={() => deleteArrayItem('skills', skill)}
                      className="absolute -top-2 -right-2 rtl:-right-auto rtl:-left-2 z-10 w-7 h-7 bg-red-600 text-white rounded-full flex items-center justify-center hover:bg-red-500 transition-all opacity-0 group-hover:opacity-100"
                      aria-label="Delete skill"
                    >
                      <XIcon className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
             {isAdmin && isEditing && (
              <div className="mt-8 text-center">
                <button 
                  onClick={() => setModalInfo({ path: 'skills', type: 'skill' })}
                  className="bg-emerald-500 text-white font-bold py-2 px-4 rounded-md hover:bg-emerald-400 transition-colors duration-300 flex items-center gap-2 mx-auto"
                >
                  <PlusIcon />
                  {lang === 'ar' ? 'إضافة مهارة' : 'Add Skill'}
                </button>
              </div>
            )}
          </Section>
        );
      
      case 'volunteer':
        return (
          <Section title={translations.nav.volunteer[lang]} icon={<HeartIcon />}>
             <Timeline 
                items={data.volunteerWork.map((item) => ({
                    id: item.id,
                    title: <Editable value={item.role[lang]} onSave={(newValue) => updateVolunteerWork({ ...item, role: { ...item.role, [lang]: newValue } })} tag="span" />,
                    subtitle: <Editable value={item.organization[lang]} onSave={(newValue) => updateVolunteerWork({ ...item, organization: { ...item.organization, [lang]: newValue } })} tag="span" />,
                    period: <Editable value={item.years} onSave={(newValue) => updateVolunteerWork({ ...item, years: newValue })} tag="span" />,
                    description: <Editable value={item.description[lang]} onSave={(newValue) => updateVolunteerWork({ ...item, description: { ...item.description, [lang]: newValue } })} tag="span" as="textarea" />,
                    onDelete: () => deleteArrayItem('volunteerWork', item)
                }))} 
              />
              {isAdmin && isEditing && (
                <div className="mt-8 text-center">
                  <button 
                    onClick={() => setModalInfo({ path: 'volunteerWork', type: 'volunteer' })}
                    className="bg-emerald-500 text-white font-bold py-2 px-4 rounded-md hover:bg-emerald-400 transition-colors duration-300 flex items-center gap-2 mx-auto"
                  >
                    <PlusIcon />
                    {lang === 'ar' ? 'إضافة عمل تطوعي' : 'Add Volunteer Work'}
                  </button>
                </div>
              )}
          </Section>
        );
      
      case 'goals':
        const renderGoalList = (goals: Goal[], type: 'short' | 'long') => (
          <div>
            <h3 className="text-2xl font-bold text-cyan-400 mb-4 flex items-center gap-2">
              <TargetIcon /> {type === 'short' ? translations.shortTermGoals[lang] : translations.longTermGoals[lang]}
            </h3>
            <ul className="space-y-3">
              {goals.map((goal) => (
                <li key={goal.id} className="group flex items-start gap-3 p-3 bg-teal-800 rounded-md relative">
                  <CheckIcon className={`w-6 h-6 ${type === 'short' ? 'text-emerald-400' : 'text-cyan-400'} mt-1 flex-shrink-0`} />
                  <Editable value={goal.text[lang]} onSave={(newValue) => updateGoal({ ...goal, text: { ...goal.text, [lang]: newValue } })} tag="span" className="flex-grow" />
                  {isAdmin && isEditing && (
                    <button 
                      onClick={() => deleteArrayItem(`goals.${type}Term`, goal)}
                      className="absolute top-2 right-2 rtl:right-auto rtl:left-2 z-10 w-6 h-6 bg-red-600 text-white rounded-full flex items-center justify-center hover:bg-red-500 transition-all opacity-0 group-hover:opacity-100"
                      aria-label="Delete goal"
                    >
                      <XIcon className="w-4 h-4" />
                    </button>
                  )}
                </li>
              ))}
            </ul>
            {isAdmin && isEditing && (
              <button 
                onClick={() => setModalInfo({ path: `goals.${type}Term`, type: 'goal', goalType: type })}
                className="mt-4 bg-emerald-500/50 text-white text-sm font-bold py-1 px-3 rounded-md hover:bg-emerald-500/80 transition-colors duration-300 flex items-center gap-1"
              >
                <PlusIcon className="w-4 h-4" />
                {lang === 'ar' ? 'إضافة هدف' : 'Add Goal'}
              </button>
            )}
          </div>
        );

        return (
          <Section title={translations.nav.goals[lang]} icon={<RocketIcon />}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {renderGoalList(data.goals.shortTerm, 'short')}
              {renderGoalList(data.goals.longTerm, 'long')}
            </div>
          </Section>
        );
      
      case 'gallery':
        return (
          <Section title={translations.nav.gallery[lang]} icon={<GalleryIcon />}>
            <Gallery />
          </Section>
        );

      case 'evaluations':
        return (
          <Section title={translations.nav.evaluations[lang]} icon={<StarIcon />}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-1">
                <div className="bg-teal-800 p-6 rounded-lg border border-teal-700 sticky top-28">
                  <h3 className="text-2xl font-bold text-cyan-400 mb-4">{translations.addYourEvaluation[lang]}</h3>
                  <form onSubmit={handleEvalSubmit} className="space-y-4">
                    <div>
                      <label htmlFor="evalAuthor" className="block mb-1 ruqaa-label">{translations.yourName[lang]}</label>
                      <input
                        type="text"
                        id="evalAuthor"
                        value={evalAuthor}
                        onChange={(e) => setEvalAuthor(e.target.value)}
                        className="w-full bg-teal-900 rounded-md border-2 border-teal-600 focus:border-cyan-500 focus:ring-cyan-500 px-3 py-2 diwani-input"
                        placeholder={translations.yourNamePlaceholder[lang]}
                      />
                    </div>
                    <div>
                      <label htmlFor="evalRole" className="block mb-1 ruqaa-label">{translations.yourRole[lang]}</label>
                      <input
                        type="text"
                        id="evalRole"
                        value={evalRole}
                        onChange={(e) => setEvalRole(e.target.value)}
                        className="w-full bg-teal-900 rounded-md border-2 border-teal-600 focus:border-cyan-500 focus:ring-cyan-500 px-3 py-2 diwani-input"
                        placeholder={translations.yourRolePlaceholder[lang]}
                      />
                    </div>
                    <div>
                      <label htmlFor="evalComment" className="block mb-1 ruqaa-label">{translations.yourComment[lang]}</label>
                      <textarea
                        id="evalComment"
                        value={evalComment}
                        onChange={(e) => setEvalComment(e.target.value)}
                        rows={4}
                        className="w-full bg-teal-900 rounded-md border-2 border-teal-600 focus:border-cyan-500 focus:ring-cyan-500 px-3 py-2 diwani-input"
                        placeholder={translations.yourCommentPlaceholder[lang]}
                      />
                    </div>
                    {evalError && <p className="text-red-400 text-sm">{evalError}</p>}
                    <button type="submit" className="w-full bg-cyan-500 text-black font-bold py-2 px-4 rounded-md hover:bg-cyan-400 transition-colors duration-300">
                      {translations.submitEvaluation[lang]}
                    </button>
                  </form>
                </div>
              </div>

              <div className="lg:col-span-2">
                <div className="space-y-8">
                  {data.evaluations.length > 0 ? (
                    data.evaluations.map((evalItem) => (
                      <blockquote key={evalItem.id} className="bg-teal-800 p-6 rounded-lg border-l-4 border-cyan-500 rtl:border-l-0 rtl:border-r-4 animate-fade-in relative group">
                        {isAdmin && isEditing && (
                          <button 
                            onClick={() => deleteArrayItem('evaluations', evalItem)}
                            className="absolute top-2 right-2 rtl:right-auto rtl:left-2 z-10 w-7 h-7 bg-red-600 text-white rounded-full flex items-center justify-center hover:bg-red-500 transition-all opacity-0 group-hover:opacity-100"
                            aria-label="Delete evaluation"
                          >
                            <XIcon className="w-4 h-4" />
                          </button>
                        )}
                        <Editable value={evalItem.comment[lang]} onSave={(newValue) => updateEvaluation({ ...evalItem, comment: { ...evalItem.comment, [lang]: newValue } })} as="textarea" tag="p" className="naskh-text text-xl font-bold text-cyan-200" style={{lineHeight: 1.8}} />
                        <footer className="mt-4 text-right rtl:text-left">
                          <Editable value={evalItem.author} onSave={(newValue) => updateEvaluation({ ...evalItem, author: newValue })} tag="p" className="naskh-text font-bold text-lg text-cyan-400" />
                          <Editable value={evalItem.role[lang]} onSave={(newValue) => updateEvaluation({ ...evalItem, role: { ...evalItem.role, [lang]: newValue } })} tag="p" className="naskh-text text-base text-cyan-300 font-normal" />
                        </footer>
                      </blockquote>
                    ))
                  ) : (
                    <div className="text-center py-16 bg-teal-800 rounded-lg">
                      <p className="text-cyan-300 text-lg">{translations.noEvaluationsYet[lang]}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Section>
        );
        
      case 'community':
        return (
          <Section title={translations.nav.community[lang]} icon={<CommunityIcon />}>
            <CommunityAchievements />
          </Section>
        );
      
      case 'entertainment':
        return (
          <Section title={translations.nav.entertainment[lang]} icon={<GameControllerIcon />}>
            <EntertainmentSection />
          </Section>
        );

      default:
        return <div>Page not found</div>;
    }
  };

  return (
    <div className="container mx-auto">
      {renderContent()}
      {modalInfo && (
        <AddItemModal 
          path={modalInfo.path}
          type={modalInfo.type}
          goalType={modalInfo.goalType}
          onClose={() => setModalInfo(null)}
        />
      )}
    </div>
  );
};

const Section: React.FC<{ title: string; icon: React.ReactNode; children: React.ReactNode }> = ({ title, icon, children }) => (
  <section className="mb-12 md:mb-16 animate-fade-in">
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

const Timeline: React.FC<{ items: { id: string; title: React.ReactNode; subtitle: React.ReactNode; period: React.ReactNode; description?: React.ReactNode; onDelete?: () => void; }[] }> = ({ items }) => {
  const context = useContext(AppContext);
  if (!context) return null;
  const { isAdmin, isEditing } = context;

  return (
    <div className="relative border-l-2 border-cyan-500 rtl:border-l-0 rtl:border-r-2 ml-4 rtl:ml-0 rtl:mr-4 space-y-12">
      {items.map((item) => (
        <div key={item.id} className="pl-8 rtl:pl-0 rtl:pr-8 relative group">
          <div className="absolute -left-2.5 rtl:-left-auto rtl:-right-2.5 top-1 w-5 h-5 bg-teal-900 border-2 border-cyan-500 rounded-full"></div>
          {isAdmin && isEditing && item.onDelete && (
             <button 
               onClick={item.onDelete}
               className="absolute top-0 right-0 rtl:right-auto rtl:left-0 z-10 w-7 h-7 bg-red-600 text-white rounded-full flex items-center justify-center hover:bg-red-500 transition-all opacity-0 group-hover:opacity-100"
               aria-label="Delete item"
             >
               <XIcon className="w-4 h-4" />
             </button>
          )}
          <time className="mb-1 text-sm font-normal leading-none text-cyan-300">{item.period}</time>
          <h3 className="text-xl font-semibold text-white">{item.title}</h3>
          <h4 className="text-md font-medium text-cyan-300">{item.subtitle}</h4>
          {item.description && <p className="mt-2 text-base font-normal text-cyan-200">{item.description}</p>}
        </div>
      ))}
    </div>
  );
};

export default MainContent;
