
import React, { useContext, useState } from 'react';
import { AppContext } from '../App';
import { translations } from '../data';
import { Page, Language } from '../types';
import { MenuIcon, XIcon } from './Icons';

interface HeaderProps {
  activePage: Page;
  setActivePage: (page: Page) => void;
  onAdminClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ activePage, setActivePage, onAdminClick }) => {
  const context = useContext(AppContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  if (!context) return null;
  const { lang, setLang, isAdmin, setIsAdmin, isEditing, setIsEditing } = context;

  const navLinks: { key: Page; label: string }[] = Object.keys(translations.nav).map((key) => ({
    key: key as Page,
    label: translations.nav[key as Page][lang],
  }));

  const toggleLanguage = () => {
    const newLang = lang === 'ar' ? 'en' : 'ar';
    setLang(newLang);
  };

  const handleNavClick = (page: Page) => {
    setActivePage(page);
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-black bg-opacity-80 backdrop-blur-md z-40 shadow-lg shadow-amber-500/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold text-amber-500 cursor-pointer" onClick={() => setActivePage('about')}>
              {translations.siteTitle[lang]}
            </h1>
          </div>
          
          <nav className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-6 rtl:space-x-reverse">
              {navLinks.map((link) => (
                <a
                  key={link.key}
                  href="#"
                  onClick={(e) => { e.preventDefault(); handleNavClick(link.key); }}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 ${
                    activePage === link.key
                      ? 'bg-amber-500 text-black'
                      : 'text-amber-200 hover:bg-teal-700 hover:text-white'
                  }`}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </nav>

          <div className="hidden md:flex items-center space-x-4 rtl:space-x-reverse">
            <button onClick={toggleLanguage} className="text-amber-200 hover:text-white font-semibold py-2 px-3 border border-teal-600 rounded-md transition-colors duration-300 hover:bg-teal-700">
              {lang === 'ar' ? 'EN' : 'AR'}
            </button>
            {isAdmin && (
              <div className="flex items-center gap-2 bg-teal-800 p-1 rounded-full border border-teal-600">
                <span className={`px-2 text-xs font-bold transition-colors ${isEditing ? 'text-amber-300' : 'text-gray-400'}`}>
                  {lang === 'ar' ? 'تعديل' : 'Edit'}
                </span>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className={`relative inline-flex items-center h-5 rounded-full w-9 transition-colors focus:outline-none ${
                    isEditing ? 'bg-amber-500' : 'bg-gray-600'
                  }`}
                >
                  <span
                    className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${
                      isEditing ? 'translate-x-4 rtl:-translate-x-4' : 'translate-x-0.5 rtl:-translate-x-0.5'
                    }`}
                  />
                </button>
              </div>
            )}
            <button 
              onClick={() => isAdmin ? setIsAdmin(false) : onAdminClick()} 
              className="bg-blue-600 text-white font-semibold py-2 px-4 border border-blue-500 rounded-md shadow-sm hover:bg-blue-500 transition-colors duration-300"
            >
              {isAdmin ? translations.adminLogout[lang] : translations.adminLogin[lang]}
            </button>
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-amber-200 hover:text-white">
              {isMenuOpen ? <XIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-2 sm:px-3">
            {navLinks.map((link) => (
              <a
                key={link.key}
                href="#"
                onClick={(e) => { e.preventDefault(); handleNavClick(link.key); }}
                className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-300 ${
                  activePage === link.key
                    ? 'bg-amber-500 text-black'
                    : 'text-amber-200 hover:bg-teal-700 hover:text-white'
                }`}
              >
                {link.label}
              </a>
            ))}
             <div className="pt-4 pb-3 border-t border-teal-700 px-2 space-y-3">
                <button onClick={toggleLanguage} className="w-full text-amber-200 hover:text-white font-semibold py-2 px-3 border border-teal-600 rounded-md transition-colors duration-300 hover:bg-teal-700">
                   {lang === 'ar' ? 'English' : 'العربية'}
                </button>
                {isAdmin && (
                    <div className="flex items-center justify-between gap-2 bg-teal-800 p-2 rounded-md">
                        <span className="text-base font-medium text-amber-200">{lang === 'ar' ? 'وضع التعديل' : 'Edit Mode'}</span>
                        <button
                          onClick={() => setIsEditing(!isEditing)}
                          className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors ${isEditing ? 'bg-amber-500' : 'bg-gray-600'}`}
                        >
                            <span className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${isEditing ? 'translate-x-6 rtl:-translate-x-6' : 'translate-x-1 rtl:-translate-x-1'}`} />
                        </button>
                    </div>
                )}
                <button 
                  onClick={() => {
                      isAdmin ? setIsAdmin(false) : onAdminClick();
                      setIsMenuOpen(false);
                  }}
                  className="w-full bg-blue-600 text-white font-semibold py-2 px-4 border border-blue-500 rounded-md shadow-sm hover:bg-blue-500 transition-colors duration-300"
                >
                  {isAdmin ? translations.adminLogout[lang] : translations.adminLogin[lang]}
                </button>
              </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
