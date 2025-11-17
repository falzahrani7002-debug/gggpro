import React, { useState, useContext } from 'react';
import { AppContext } from '../App';
import { XIcon } from './Icons';
import { storage } from '../firebase-config';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { GalleryItem } from '../types';

interface AddGalleryItemModalProps {
  onClose: () => void;
}

const AddGalleryItemModal: React.FC<AddGalleryItemModalProps> = ({ onClose }) => {
  const context = useContext(AppContext);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [year, setYear] = useState(new Date().getFullYear());
  const [type, setType] = useState<GalleryItem['type']>('image');
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!context) return null;
  const { addArrayItem, lang } = context;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description || !file) {
      setError('الرجاء ملء جميع الحقول واختيار ملف.');
      return;
    }
    
    setIsLoading(true);
    setError('');

    try {
      // 1. Upload file to Firebase Storage
      const fileRef = ref(storage, `gallery/${Date.now()}_${file.name}`);
      const snapshot = await uploadBytes(fileRef, file);
      
      // 2. Get download URL
      const downloadURL = await getDownloadURL(snapshot.ref);

      // 3. Create new gallery item object
      const newItem: GalleryItem = {
        id: `gal-${Date.now()}`,
        title: { ar: title, en: title },
        description: { ar: description, en: description },
        year,
        type,
        url: downloadURL,
        thumbnailUrl: type === 'video' ? 'https://picsum.photos/seed/newvideo/800/600' : undefined,
      };

      // 4. Add item to Firestore
      await addArrayItem('gallery', newItem);
      onClose();

    } catch (err) {
      console.error(err);
      setError('حدث خطأ أثناء رفع الملف. الرجاء المحاولة مرة أخرى.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-teal-800 rounded-lg shadow-xl p-8 w-full max-w-lg relative border border-cyan-500/50">
        <button onClick={onClose} className="absolute top-4 right-4 rtl:right-auto rtl:left-4 text-cyan-300 hover:text-white">
          <XIcon />
        </button>
        <h3 className="text-2xl font-bold text-white mb-6 text-center">إضافة عنصر جديد للمعرض</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="block mb-1 ruqaa-label">العنوان</label>
            <input type="text" id="title" value={title} onChange={e => setTitle(e.target.value)} className="w-full bg-teal-900 rounded-md border-2 border-teal-600 focus:border-cyan-500 focus:ring-cyan-500 px-3 py-2 diwani-input" />
          </div>
          <div>
            <label htmlFor="description" className="block mb-1 ruqaa-label">الوصف</label>
            <textarea id="description" value={description} onChange={e => setDescription(e.target.value)} rows={3} className="w-full bg-teal-900 rounded-md border-2 border-teal-600 focus:border-cyan-500 focus:ring-cyan-500 px-3 py-2 diwani-input" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="year" className="block mb-1 ruqaa-label">السنة</label>
              <input type="number" id="year" value={year} onChange={e => setYear(parseInt(e.target.value))} className="w-full bg-teal-900 rounded-md border-2 border-teal-600 focus:border-cyan-500 focus:ring-cyan-500 px-3 py-2 diwani-input" />
            </div>
            <div>
              <label htmlFor="type" className="block mb-1 ruqaa-label">النوع</label>
              <select id="type" value={type} onChange={e => setType(e.target.value as GalleryItem['type'])} className="w-full bg-teal-900 rounded-md border-2 border-teal-600 focus:border-cyan-500 focus:ring-cyan-500 px-3 py-2 diwani-input">
                <option value="image">صورة</option>
                <option value="video">فيديو</option>
                <option value="pdf">ملف</option>
              </select>
            </div>
          </div>
          <div>
            <label htmlFor="file" className="block mb-1 ruqaa-label">الملف</label>
            <input type="file" id="file" onChange={e => setFile(e.target.files ? e.target.files[0] : null)} className="w-full text-cyan-300 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-cyan-600 file:text-white hover:file:bg-cyan-500" />
          </div>
          {error && <p className="text-red-400 text-sm text-center">{error}</p>}
          <div className="pt-4">
            <button type="submit" disabled={isLoading} className="w-full bg-cyan-500 text-black font-bold py-3 px-4 rounded-md hover:bg-cyan-400 transition-colors duration-300 disabled:bg-gray-500">
              {isLoading ? 'جارِ الرفع...' : 'إضافة'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddGalleryItemModal;
