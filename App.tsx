
import React, { useState, useEffect, useCallback, createContext } from 'react';
import { initialData } from './data';
import { PortfolioData, Page, Language, GalleryItem, Evaluation } from './types';
import Header from './components/Header';
import MainContent from './components/MainContent';
import Footer from './components/Footer';
import AdminLoginModal from './components/AdminLoginModal';
import WeatherEffects from './components/WeatherEffects';
import { db, storage } from './firebase-config';
import { doc, setDoc, updateDoc, arrayUnion, arrayRemove, onSnapshot } from 'firebase/firestore';
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
  updateGalleryItem: (item: GalleryItem) => Promise<void>;
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
    // Set up a realtime listener for Firestore data
    const docRef = doc(db, 'portfolio', 'mainData');
    
    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        setData(docSnap.data() as PortfolioData);
      } else {
        // Doc doesn't exist, so initialize it
        console.log('No such document! Initializing...');
        const initializeDoc = async () => {
            await setDoc(docRef, initialData);
        }
        initializeDoc();
      }
    }, (error) => {
        console.error("Firebase snapshot error: ", error);
    });

    // Cleanup listener on component unmount
    return () => unsubscribe();
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
    // Just update Firestore. The onSnapshot listener will handle the local state update.
    await updateDoc(docRef, { [path]: value });
  };
  
  const addArrayItem = async (path: string, item: any) => {
      const docRef = doc(db, 'portfolio', 'mainData');
      // Just update Firestore. The onSnapshot listener will handle the local state update.
      await updateDoc(docRef, { [path]: arrayUnion(item) });
  };
  
  const deleteArrayItem = async (path: string, item: any) => {
    const docRef = doc(db, 'portfolio', 'mainData');
    // Just update Firestore. The onSnapshot listener will handle the local state update.
    await updateDoc(docRef, { [path]: arrayRemove(item) });
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

  const updateGalleryItem = async (updatedItem: GalleryItem) => {
    if (!data) return;
    const newGallery = data.gallery.map(item =>
        item.id === updatedItem.id ? updatedItem : item
    );
    await updateData('gallery', newGallery);
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
    <AppContext.Provider value={{ lang, setLang, isAdmin, isEditing, setIsEditing, data, updateData, addArrayItem, deleteArrayItem, deleteGalleryItem, updateGalleryItem }}>
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
