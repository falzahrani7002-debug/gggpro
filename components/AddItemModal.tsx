import React, { useState, useContext, useEffect } from 'react';
import { AppContext } from '../App';
import { XIcon } from './Icons';
import { Skill, VolunteerWork, Goal } from '../types';

interface AddItemModalProps {
  path: string;
  type: 'skill' | 'volunteer' | 'goal';
  onClose: () => void;
  goalType?: 'short' | 'long'; // Specific for goals
}

const AddItemModal: React.FC<AddItemModalProps> = ({ path, type, onClose, goalType }) => {
  const context = useContext(AppContext);
  const [formData, setFormData] = useState<any>({});
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Reset form data when type changes
    if (type === 'skill') setFormData({ nameAr: '', nameEn: '', level: 50 });
    if (type === 'volunteer') setFormData({ orgAr: '', orgEn: '', roleAr: '', roleEn: '', descAr: '', descEn: '', years: '' });
    if (type === 'goal') setFormData({ textAr: '', textEn: '' });
  }, [type]);

  if (!context) return null;
  const { addArrayItem } = context;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      let newItem: any;
      const id = `${type}-${Date.now()}`;

      if (type === 'skill') {
        if (!formData.nameAr || !formData.nameEn) { throw new Error("اسم المهارة مطلوب."); }
        newItem = {
          id,
          name: { ar: formData.nameAr, en: formData.nameEn },
          level: Number(formData.level)
        } as Skill;
      } else if (type === 'volunteer') {
         if (!formData.orgAr || !formData.orgEn || !formData.roleAr || !formData.roleEn || !formData.years) { throw new Error("الرجاء ملء جميع الحقول المطلوبة."); }
        newItem = {
          id,
          organization: { ar: formData.orgAr, en: formData.orgEn },
          role: { ar: formData.roleAr, en: formData.roleEn },
          description: { ar: formData.descAr || '', en: formData.descEn || '' },
          years: formData.years
        } as VolunteerWork;
      } else if (type === 'goal') {
         if (!formData.textAr || !formData.textEn) { throw new Error("نص الهدف مطلوب."); }
        newItem = {
          id,
          text: { ar: formData.textAr, en: formData.textEn },
          type: goalType
        } as Goal;
      } else {
        throw new Error("نوع عنصر غير صالح");
      }
      
      await addArrayItem(path, newItem);
      onClose();

    } catch (err: any) {
      setError(err.message || 'حدث خطأ.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  const renderFormFields = () => {
    switch (type) {
      case 'skill':
        return (
          <>
            <div>
              <label className="block mb-1 ruqaa-label">اسم المهارة (عربي)</label>
              <input name="nameAr" value={formData.nameAr || ''} onChange={handleInputChange} className="w-full bg-teal-900 rounded-md border-2 border-teal-600 focus:border-cyan-500 focus:ring-cyan-500 px-3 py-2 diwani-input" />
            </div>
            <div>
              <label className="block mb-1 ruqaa-label">Skill Name (English)</label>
              <input name="nameEn" value={formData.nameEn || ''} onChange={handleInputChange} className="w-full bg-teal-900 rounded-md border-2 border-teal-600 focus:border-cyan-500 focus:ring-cyan-500 px-3 py-2" />
            </div>
            <div>
              <label className="block mb-1 ruqaa-label">المستوى: {formData.level || 50}%</label>
              <input type="range" name="level" min="0" max="100" value={formData.level || 50} onChange={handleInputChange} className="w-full h-2 bg-teal-700 rounded-lg appearance-none cursor-pointer" />
            </div>
          </>
        );
      case 'volunteer':
        return (
          <>
            <div>
              <label className="block mb-1 ruqaa-label">المنظمة (عربي)</label>
              <input name="orgAr" value={formData.orgAr || ''} onChange={handleInputChange} className="w-full bg-teal-900 rounded-md border-2 border-teal-600 focus:border-cyan-500 focus:ring-cyan-500 px-3 py-2 diwani-input" />
            </div>
            <div>
              <label className="block mb-1 ruqaa-label">Organization (English)</label>
              <input name="orgEn" value={formData.orgEn || ''} onChange={handleInputChange} className="w-full bg-teal-900 rounded-md border-2 border-teal-600 focus:border-cyan-500 focus:ring-cyan-500 px-3 py-2" />
            </div>
             <div>
              <label className="block mb-1 ruqaa-label">الدور (عربي)</label>
              <input name="roleAr" value={formData.roleAr || ''} onChange={handleInputChange} className="w-full bg-teal-900 rounded-md border-2 border-teal-600 focus:border-cyan-500 focus:ring-cyan-500 px-3 py-2 diwani-input" />
            </div>
            <div>
              <label className="block mb-1 ruqaa-label">Role (English)</label>
              <input name="roleEn" value={formData.roleEn || ''} onChange={handleInputChange} className="w-full bg-teal-900 rounded-md border-2 border-teal-600 focus:border-cyan-500 focus:ring-cyan-500 px-3 py-2" />
            </div>
            <div>
              <label className="block mb-1 ruqaa-label">الوصف (عربي) - اختياري</label>
              <textarea name="descAr" value={formData.descAr || ''} onChange={handleInputChange} className="w-full bg-teal-900 rounded-md border-2 border-teal-600 focus:border-cyan-500 focus:ring-cyan-500 px-3 py-2 diwani-input" />
            </div>
            <div>
              <label className="block mb-1 ruqaa-label">Description (English) - Optional</label>
              <textarea name="descEn" value={formData.descEn || ''} onChange={handleInputChange} className="w-full bg-teal-900 rounded-md border-2 border-teal-600 focus:border-cyan-500 focus:ring-cyan-500 px-3 py-2" />
            </div>
             <div>
              <label className="block mb-1 ruqaa-label">السنوات</label>
              <input name="years" value={formData.years || ''} placeholder="مثال: 2024" className="w-full bg-teal-900 rounded-md border-2 border-teal-600 focus:border-cyan-500 focus:ring-cyan-500 px-3 py-2" />
            </div>
          </>
        )
      case 'goal':
        return (
            <>
              <div>
                <label className="block mb-1 ruqaa-label">الهدف (عربي)</label>
                <textarea name="textAr" value={formData.textAr || ''} onChange={handleInputChange} className="w-full bg-teal-900 rounded-md border-2 border-teal-600 focus:border-cyan-500 focus:ring-cyan-500 px-3 py-2 diwani-input" />
              </div>
              <div>
                <label className="block mb-1 ruqaa-label">Goal (English)</label>
                <textarea name="textEn" value={formData.textEn || ''} onChange={handleInputChange} className="w-full bg-teal-900 rounded-md border-2 border-teal-600 focus:border-cyan-500 focus:ring-cyan-500 px-3 py-2" />
              </div>
            </>
        );
      default:
        return null;
    }
  };

  const titles = {
      skill: 'إضافة مهارة جديدة',
      volunteer: 'إضافة عمل تطوعي جديد',
      goal: `إضافة هدف ${goalType === 'short' ? 'قصير' : 'طويل'} المدى`
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-teal-800 rounded-lg shadow-xl p-8 w-full max-w-lg relative border border-cyan-500/50 max-h-[90vh] overflow-y-auto">
        <button onClick={onClose} className="absolute top-4 right-4 rtl:right-auto rtl:left-4 text-cyan-300 hover:text-white">
          <XIcon />
        </button>
        <h3 className="text-2xl font-bold text-white mb-6 text-center">{titles[type]}</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          {renderFormFields()}
          {error && <p className="text-red-400 text-sm text-center">{error}</p>}
          <div className="pt-4">
            <button type="submit" disabled={isLoading} className="w-full bg-cyan-500 text-black font-bold py-3 px-4 rounded-md hover:bg-cyan-400 transition-colors duration-300 disabled:bg-gray-500">
              {isLoading ? 'جارِ الحفظ...' : 'إضافة'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddItemModal;
