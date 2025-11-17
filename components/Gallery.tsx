import React, { useState, useMemo, useContext } from 'react';
import { AppContext } from '../App';
import { translations } from '../data';
import { GalleryItem } from '../types';
import { ImageIcon, VideoIcon, DocumentIcon, XIcon } from './Icons';
import AddGalleryItemModal from './AddGalleryItemModal';

const Gallery: React.FC = () => {
  const context = useContext(AppContext);
  if (!context || !context.data) return null;
  const { lang, data, isAdmin, isEditing, deleteGalleryItem } = context;

  const [typeFilter, setTypeFilter] = useState<GalleryItem['type'] | 'all'>('all');
  const [yearFilter, setYearFilter] = useState<number | 'all'>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const years = useMemo(() => {
    const uniqueYears = [...new Set(data.gallery.map(item => item.year))];
    return uniqueYears.sort((a: number, b: number) => b - a);
  }, [data.gallery]);

  const filteredItems = useMemo(() => {
    return data.gallery.filter(item => {
      const typeMatch = typeFilter === 'all' || item.type === typeFilter;
      const yearMatch = yearFilter === 'all' || item.year === yearFilter;
      return typeMatch && yearMatch;
    }).sort((a,b) => b.year - a.year);
  }, [data.gallery, typeFilter, yearFilter]);

  const FilterButton: React.FC<{onClick: () => void, isActive: boolean, children: React.ReactNode}> = ({onClick, isActive, children}) => (
      <button 
        onClick={onClick}
        className={`px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${isActive ? 'bg-cyan-500 text-black' : 'bg-teal-700 text-cyan-200 hover:bg-teal-600'}`}>
        {children}
      </button>
  );

  return (
    <div>
      <div className="flex flex-wrap gap-4 mb-8 items-start justify-between">
        <div className="flex flex-wrap gap-4">
            <div>
              <label className="block mb-2 ruqaa-label">{translations.filterByType[lang]}</label>
              <div className="flex flex-wrap gap-2">
                <FilterButton onClick={() => setTypeFilter('all')} isActive={typeFilter === 'all'}>{translations.all[lang]}</FilterButton>
                <FilterButton onClick={() => setTypeFilter('image')} isActive={typeFilter === 'image'}>{translations.image[lang]}</FilterButton>
                <FilterButton onClick={() => setTypeFilter('video')} isActive={typeFilter === 'video'}>{translations.video[lang]}</FilterButton>
                <FilterButton onClick={() => setTypeFilter('pdf')} isActive={typeFilter === 'pdf'}>{translations.pdf[lang]}</FilterButton>
              </div>
            </div>
             <div>
              <label className="block mb-2 ruqaa-label">{translations.filterByYear[lang]}</label>
              <div className="flex flex-wrap gap-2">
                <FilterButton onClick={() => setYearFilter('all')} isActive={yearFilter === 'all'}>{translations.all[lang]}</FilterButton>
                {years.map(year => (
                   <FilterButton key={year} onClick={() => setYearFilter(year)} isActive={yearFilter === year}>{year}</FilterButton>
                ))}
              </div>
            </div>
        </div>
        {isAdmin && isEditing && (
            <button onClick={() => setIsModalOpen(true)} className="bg-emerald-500 text-white font-bold py-2 px-4 rounded-md hover:bg-emerald-400 transition-colors duration-300">
                {lang === 'ar' ? 'إضافة عنصر جديد' : 'Add New Item'}
            </button>
        )}
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredItems.map(item => (
          <div key={item.id} className="group relative overflow-hidden rounded-lg shadow-lg bg-teal-800 border border-teal-700">
            {isAdmin && isEditing && (
              <button 
                onClick={() => deleteGalleryItem(item)}
                className="absolute top-2 right-2 rtl:right-auto rtl:left-2 z-20 w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center hover:bg-red-500 transition-colors"
                aria-label="Delete item"
              >
                <XIcon className="w-5 h-5" />
              </button>
            )}
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
                <h3 className="font-bold text-lg text-cyan-400 truncate">{item.title[lang]}</h3>
                <p className="text-sm text-cyan-300">{item.description[lang]}</p>
                <span className="absolute top-2 left-2 rtl:left-auto rtl:right-2 bg-cyan-600 text-white text-xs font-semibold px-2 py-1 rounded-full">{item.year}</span>
              </div>
            </a>
          </div>
        ))}
      </div>
      {filteredItems.length === 0 && (
          <div className="text-center py-16 text-cyan-400">
              <p className="text-xl">لا توجد عناصر تطابق الفلترة الحالية.</p>
          </div>
      )}
      {isModalOpen && <AddGalleryItemModal onClose={() => setIsModalOpen(false)} />}
    </div>
  );
};

export default Gallery;