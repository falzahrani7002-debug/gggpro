
import React, { useState, useEffect, useCallback } from 'react';
import { initialData } from './data';
import { PortfolioData, Page, Language } from './types';
import Header from './components/Header';
import MainContent from './components/MainContent';
import Footer from './components/Footer';
import AdminLoginModal from './components/AdminLoginModal';
import WeatherEffects from './components/WeatherEffects';

export const AppContext = React.createContext<{
  lang: Language;
  setLang: (lang: Language) => void;
  isAdmin: boolean;
  setIsAdmin: (isAdmin: boolean) => void;
  isEditing: boolean;
  setIsEditing: (isEditing: boolean) => void;
  data: PortfolioData;
  setData: React.Dispatch<React.SetStateAction<PortfolioData>>;
} | null>(null);

const App: React.FC = () => {
  const [lang, setLangState] = useState<Language>('ar');
  const [isAdmin, setIsAdminState] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [activePage, setActivePage] = useState<Page>('about');
  const [data, setData] = useState<PortfolioData>(() => {
    try {
      const savedData = localStorage.getItem('portfolioData');
      return savedData ? JSON.parse(savedData) : initialData;
    } catch (error) {
      console.error('Error reading from localStorage', error);
      return initialData;
    }
  });
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('portfolioData', JSON.stringify(data));
    } catch (error) {
      console.error('Error writing to localStorage', error);
    }
  }, [data]);
  
  const setLang = (newLang: Language) => {
    setLangState(newLang);
    document.documentElement.lang = newLang;
    document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr';
  };
  
  const setIsAdmin = (adminStatus: boolean) => {
    setIsAdminState(adminStatus);
    if (!adminStatus) {
      setIsEditing(false); // Turn off edit mode on logout
    }
  };


  const handleScroll = useCallback(() => {
    const totalHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const progress = (window.scrollY / totalHeight) * 100;
    setScrollProgress(progress);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return (
    <AppContext.Provider value={{ lang, setLang, isAdmin, setIsAdmin, isEditing, setIsEditing, data, setData }}>
      <div className="bg-teal-900 min-h-screen text-amber-100 relative">
        <WeatherEffects />
        <div 
          className="fixed top-0 left-0 h-1 bg-amber-500 transition-all duration-300 z-50" 
          style={{ width: `${scrollProgress}%` }}
        ></div>
        
        <Header activePage={activePage} setActivePage={setActivePage} onAdminClick={() => setLoginModalOpen(true)} />
        
        <main className="pt-40 pb-12 px-4 md:px-8 lg:px-16 relative z-10">
          <MainContent page={activePage} />
        </main>
        
        <Footer />

        {isLoginModalOpen && (
          <AdminLoginModal
            onClose={() => setLoginModalOpen(false)}
            onLoginSuccess={() => {
              setIsAdmin(true);
              setLoginModalOpen(false);
            }}
          />
        )}
      </div>
    </AppContext.Provider>
  );
};

export default App;