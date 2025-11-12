
import React, { useState, useMemo, useContext } from 'react';
import { AppContext } from '../App';
import { translations } from '../data';
import { GalleryItem } from '../types';
import { ImageIcon, VideoIcon, DocumentIcon } from './Icons';

const Gallery: React.FC = () => {
  const context = useContext(AppContext);
  if (!context) return null;
  const { lang, data } = context;

  const [typeFilter, setTypeFilter] = useState<GalleryItem['type'] | 'all'>('all');
  const [yearFilter, setYearFilter] = useState<number | 'all'>('all');

  const years = useMemo(() => {
    const uniqueYears = [...new Set(data.gallery.map(item => item.year))];
    return uniqueYears.sort((a, b) => b - a);
  }, [data.gallery]);

  const filteredItems = useMemo(() => {
    return data.gallery.filter(item => {
      const typeMatch = typeFilter === 'all' || item.type === typeFilter;
      const yearMatch = yearFilter === 'all' || item.year === yearFilter;
      return typeMatch && yearMatch;
    });
  }, [data.gallery, typeFilter, yearFilter]);

  const FilterButton: React.FC<{onClick: () => void, isActive: boolean, children: React.ReactNode}> = ({onClick, isActive, children}) => (
      <button 
        onClick={onClick}
        className={`px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${isActive ? 'bg-amber-500 text-black' : 'bg-teal-700 text-amber-200 hover:bg-teal-600'}`}>
        {children}
      </button>
  );

  return (
    <div>
      <div className="flex flex-wrap gap-4 mb-8">
        <div>
          <label className="block text-sm font-medium text-amber-300 mb-2">{translations.filterByType[lang]}</label>
          <div className="flex flex-wrap gap-2">
            <FilterButton onClick={() => setTypeFilter('all')} isActive={typeFilter === 'all'}>{translations.all[lang]}</FilterButton>
            <FilterButton onClick={() => setTypeFilter('image')} isActive={typeFilter === 'image'}>{translations.image[lang]}</FilterButton>
            <FilterButton onClick={() => setTypeFilter('video')} isActive={typeFilter === 'video'}>{translations.video[lang]}</FilterButton>
            <FilterButton onClick={() => setTypeFilter('pdf')} isActive={typeFilter === 'pdf'}>{translations.pdf[lang]}</FilterButton>
          </div>
        </div>
         <div>
          <label className="block text-sm font-medium text-amber-300 mb-2">{translations.filterByYear[lang]}</label>
          <div className="flex flex-wrap gap-2">
            <FilterButton onClick={() => setYearFilter('all')} isActive={yearFilter === 'all'}>{translations.all[lang]}</FilterButton>
            {years.map(year => (
               <FilterButton key={year} onClick={() => setYearFilter(year)} isActive={yearFilter === year}>{year}</FilterButton>
            ))}
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredItems.map(item => (
          <div key={item.id} className="group relative overflow-hidden rounded-lg shadow-lg bg-teal-800 border border-teal-700">
            <a href={item.url} target="_blank" rel="noopener noreferrer">
              <img
                src={item.thumbnailUrl || (item.type === 'image' ? item.url : 'https://picsum.photos/seed/placeholder/800/600')}
                alt={item.title[lang]}
                className="w-full h-56 object-cover transform group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="text-white text-3xl">
                    {item.type === 'image' && <ImageIcon />}
                    {item.type === 'video' && <VideoIcon />}
                    {item.type === 'pdf' && <DocumentIcon />}
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg text-amber-500 truncate">{item.title[lang]}</h3>
                <p className="text-sm text-amber-300">{item.description[lang]}</p>
                <span className="absolute top-2 right-2 rtl:right-auto rtl:left-2 bg-cyan-600 text-white text-xs font-semibold px-2 py-1 rounded-full">{item.year}</span>
              </div>
            </a>
          </div>
        ))}
      </div>
      {filteredItems.length === 0 && (
          <div className="text-center py-16 text-amber-500">
              <p className="text-xl">لا توجد عناصر تطابق الفلترة الحالية.</p>
          </div>
      )}
    </div>
  );
};

export default Gallery;
