
import React, { useState, useEffect, useCallback, createContext } from 'react';
import { initialData } from './data';
import { PortfolioData, Page, Language, GalleryItem, Evaluation } from './types';
import Header from './components/Header';
import MainContent from './components/MainContent';
import Footer from './components/Footer';
import AdminLoginModal from './components/AdminLoginModal';
import WeatherEffects from './components/WeatherEffects';
import { db, storage } from './firebase-config';
import { doc, getDoc, setDoc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { ref, deleteObject } from 'firebase/storage';

export const AppContext = createContext<{
  lang: Language;
  setLang: (lang: Language) => void;
  isAdmin: boolean;
  isEditing: boolean;
  setIsEditing: (isEditing: boolean) => void;
  data: PortfolioData | null;
  updateData: (path: string, value: any) => Promise<void>;
  addArrayItem: (path: string, item: any) => Promise<void>;
  deleteArrayItem: (path: string, item: any) => Promise<void>;
  deleteGalleryItem: (item: GalleryItem) => Promise<void>;
} | null>(null);

const App: React.FC = () => {
  const [lang, setLangState] = useState<Language>('ar');
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [activePage, setActivePage] = useState<Page>('about');
  const [data, setData] = useState<PortfolioData | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);

  useEffect(() => {
    // Fetch data from Firestore
    const fetchData = async () => {
      const docRef = doc(db, 'portfolio', 'mainData');
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setData(docSnap.data() as PortfolioData);
      } else {
        // Doc doesn't exist, so initialize it
        console.log('No such document! Initializing...');
        await setDoc(docRef, initialData);
        setData(initialData);
      }
    };
    fetchData();
  }, []);
  
  const setLang = (newLang: Language) => {
    setLangState(newLang);
    document.documentElement.lang = newLang;
    document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr';
  };
  
  const handleLogout = () => {
    setIsAdmin(false);
    setIsEditing(false);
  };

  const handleLoginSuccess = () => {
    setIsAdmin(true);
    setLoginModalOpen(false);
  };

  const updateData = async (path: string, value: any) => {
    const docRef = doc(db, 'portfolio', 'mainData');
    await updateDoc(docRef, { [path]: value });
    setData(prevData => {
        if (!prevData) return null;
        const keys = path.split('.');
        const newData = JSON.parse(JSON.stringify(prevData));
        let current = newData;
        for (let i = 0; i < keys.length - 1; i++) {
            current = current[keys[i]];
        }
        current[keys[keys.length - 1]] = value;
        return newData;
    });
  };
  
  const addArrayItem = async (path: string, item: any) => {
      const docRef = doc(db, 'portfolio', 'mainData');
      await updateDoc(docRef, { [path]: arrayUnion(item) });
      // This is a simplified local update. For full sync, rely on Firestore snapshots.
      setData(prevData => {
          if (!prevData) return null;
          const keys = path.split('.');
          const newData = JSON.parse(JSON.stringify(prevData));
          let current = newData;
          for (let i = 0; i < keys.length - 1; i++) {
              current = current[keys[i]];
          }
          current[keys[keys.length - 1]].push(item);
          return newData;
      });
  };
  
  const deleteArrayItem = async (path: string, item: any) => {
    const docRef = doc(db, 'portfolio', 'mainData');
    await updateDoc(docRef, { [path]: arrayRemove(item) });
    setData(prevData => {
        if (!prevData) return null;
        const keys = path.split('.');
        const newData = JSON.parse(JSON.stringify(prevData));
        let current = newData;
        for (let i = 0; i < keys.length - 1; i++) {
            current = current[keys[i]];
        }
        current[keys[keys.length - 1]] = current[keys[keys.length - 1]].filter((i: any) => i.id !== item.id);
        return newData;
    });
  };

  const deleteGalleryItem = async (item: GalleryItem) => {
    if(!window.confirm(`هل أنت متأكد من حذف '${item.title.ar}'؟`)) return;

    // Delete file from storage if URL is from Firebase Storage
    if (item.url.includes('firebasestorage.googleapis.com')) {
        try {
            const fileRef = ref(storage, item.url);
            await deleteObject(fileRef);
        } catch (error) {
            console.error("Error deleting file from storage: ", error);
            // Don't stop if file deletion fails, still remove from DB
        }
    }
    // Delete item from Firestore array
    await deleteArrayItem('gallery', item);
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

  if (!data) {
    return (
        <div className="bg-teal-900 min-h-screen flex items-center justify-center text-cyan-200 text-2xl">
            جاري تحميل البيانات...
        </div>
    );
  }

  return (
    <AppContext.Provider value={{ lang, setLang, isAdmin, isEditing, setIsEditing, data, updateData, addArrayItem, deleteArrayItem, deleteGalleryItem }}>
      <div className="bg-teal-900 min-h-screen text-cyan-200 relative">
        <WeatherEffects />
        <div 
          className="fixed top-0 left-0 h-1 bg-cyan-500 transition-all duration-300 z-50" 
          style={{ width: `${scrollProgress}%` }}
        ></div>
        
        <Header activePage={activePage} setActivePage={setActivePage} onAdminClick={() => setLoginModalOpen(true)} onAdminLogout={handleLogout} />
        
        <main className="pt-24 md:pt-28 pb-20 px-4 sm:px-6 md:px-12 lg:px-24 relative z-10">
          <MainContent page={activePage} />
        </main>
        
        <Footer />

        {isLoginModalOpen && (
          <AdminLoginModal
            onClose={() => setLoginModalOpen(false)}
            onLoginSuccess={handleLoginSuccess}
          />
        )}
      </div>
    </AppContext.Provider>
  );
};

export default App;