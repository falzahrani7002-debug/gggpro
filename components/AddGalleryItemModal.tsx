
import React, { useState, useContext, useEffect } from 'react';
import { AppContext } from '../App';
import { XIcon } from './Icons';
import { GalleryItem } from '../types';

interface GalleryItemModalProps {
  onClose: () => void;
  itemToEdit?: GalleryItem;
}

const convertToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });
};

const AddGalleryItemModal: React.FC<GalleryItemModalProps> = ({ onClose, itemToEdit }) => {
  const context = useContext(AppContext);
  const isEditMode = !!itemToEdit;

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [year, setYear] = useState(new Date().getFullYear());
  const [type, setType] = useState<GalleryItem['type']>('image');
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isEditMode) {
      setTitle(itemToEdit.title.ar); // Simple assumption for now
      setDescription(itemToEdit.description.ar);
      setYear(itemToEdit.year);
      setType(itemToEdit.type);
    }
  }, [isEditMode, itemToEdit]);

  if (!context) return null;
  const { addArrayItem, updateGalleryItem } = context;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description) {
      setError('الرجاء ملء حقلي العنوان والوصف.');
      return;
    }
    if (!isEditMode && !file) {
      setError('الرجاء اختيار ملف لإضافته.');
      return;
    }
    
    setIsLoading(true);
    setError('');

    try {
      let fileUrl = itemToEdit?.url || '';
      if (file) {
        fileUrl = await convertToBase64(file);
      }

      // Dynamically build the object to avoid undefined fields
      const itemData: Omit<GalleryItem, 'thumbnailUrl'> & { thumbnailUrl?: string } = {
        id: isEditMode ? itemToEdit.id : `gal-${Date.now()}`,
        title: { ar: title, en: title },
        description: { ar: description, en: description },
        year,
        type,
        url: fileUrl,
      };

      if (type === 'video') {
        // Preserve old thumbnail if editing a video without changing the file
        if (isEditMode && !file && itemToEdit.type === 'video') {
          itemData.thumbnailUrl = itemToEdit.thumbnailUrl;
        } else {
          // Assign a new placeholder thumbnail if it's a new video or the file is changed
          itemData.thumbnailUrl = `https://picsum.photos/seed/newvideo${Date.now()}/800/600`;
        }
      }
      
      if (isEditMode) {
        await updateGalleryItem(itemData as GalleryItem);
      } else {
        await addArrayItem('gallery', itemData);
      }
      onClose();

    } catch (err) {
      console.error(err);
      setError('حدث خطأ أثناء معالجة الملف. الرجاء المحاولة مرة أخرى.');
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
        <h3 className="text-2xl font-bold text-white mb-6 text-center">
          {isEditMode ? 'تعديل العنصر' : 'إضافة عنصر جديد للمعرض'}
        </h3>
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
            <label htmlFor="file" className="block mb-1 ruqaa-label">الملف {isEditMode && '(اتركه فارغاً لعدم التغيير)'}</label>
            <input type="file" id="file" onChange={e => setFile(e.target.files ? e.target.files[0] : null)} className="w-full text-cyan-300 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-cyan-600 file:text-white hover:file:bg-cyan-500" />
          </div>
          {error && <p className="text-red-400 text-sm text-center">{error}</p>}
          <div className="pt-4">
            <button type="submit" disabled={isLoading} className="w-full bg-cyan-500 text-black font-bold py-3 px-4 rounded-md hover:bg-cyan-400 transition-colors duration-300 disabled:bg-gray-500">
              {isLoading ? 'جارِ الحفظ...' : (isEditMode ? 'حفظ التعديلات' : 'إضافة')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddGalleryItemModal;
