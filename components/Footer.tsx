
import React, { useContext } from 'react';
import { AppContext } from '../App';
import { translations } from '../data';
import { MailIcon } from './Icons';

const Footer: React.FC = () => {
  const context = useContext(AppContext);
  if (!context) return null;

  const { lang, data } = context;

  return (
    <footer className="bg-black border-t border-yellow-400/20 py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-400">
        <h3 className="text-xl font-bold text-yellow-400 mb-2">{translations.contactMe[lang]}</h3>
        <a href={`mailto:${data.studentInfo.email}`} className="inline-flex items-center gap-2 text-lg hover:text-blue-400 transition-colors">
          <MailIcon />
          {data.studentInfo.email}
        </a>
        <p className="mt-6 text-sm">
          &copy; {new Date().getFullYear()} {data.studentInfo.name}. {translations.allRightsReserved[lang]}.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
