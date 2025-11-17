
import React, { useContext } from 'react';
import { AppContext } from '../App';
import { translations } from '../data';
import { MailIcon } from './Icons';
import Editable from './Editable';

const Footer: React.FC = () => {
  const context = useContext(AppContext);
  if (!context || !context.data) return null;

  const { lang, data, updateData } = context;

  return (
    <footer className="bg-black border-t border-cyan-500/20 py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-cyan-300">
        <h3 className="text-xl font-bold text-cyan-400 mb-2">{translations.contactMe[lang]}</h3>
        <div className="inline-flex items-center gap-2 text-lg hover:text-cyan-400 transition-colors">
          <MailIcon />
          <a href={`mailto:${data.studentInfo.email}`}>
            <Editable
              value={data.studentInfo.email}
              onSave={(newValue) => updateData('studentInfo.email', newValue)}
              tag="span"
              className="text-lg"
            />
          </a>
        </div>
        <p className="mt-6 text-sm">
          &copy; {new Date().getFullYear()} {data.studentInfo.name}. {translations.allRightsReserved[lang]}.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
