
import { PortfolioData, Translations } from './types';

export const initialData: PortfolioData = {
  studentInfo: {
    name: "فيصل فهد الزهراني",
    grade: { ar: "1 / 3 (الأول المتوسط)", en: "1 / 3 (First Intermediate)" },
    school: "مدارس الأندلس – المنار",
    email: "f.alzahrani@gmail.com",
    about: {
      ar: "طالب طموح في الصف الأول المتوسط، أسعى دائمًا لتطوير مهاراتي الأكاديمية والشخصية. أؤمن بأن التعلم رحلة مستمرة، وهذا الملف هو مرآة لجهودي وإنجازاتي.",
      en: "An ambitious first-intermediate grade student, always striving to develop my academic and personal skills. I believe that learning is a continuous journey, and this portfolio is a reflection of my efforts and achievements."
    }
  },
  education: [
    { id: 'edu1', degree: { ar: 'المرحلة الابتدائية', en: 'Elementary School' }, institution: { ar: 'مدارس الأندلس', en: 'Al-Andalus Schools' }, years: '2017 - 2023' },
    { id: 'edu2', degree: { ar: 'المرحلة المتوسطة', en: 'Intermediate School' }, institution: { ar: 'مدارس الأندلس – المنار', en: 'Al-Andalus Schools - Al-Manar' }, years: '2023 - الآن' },
  ],
  skills: [
    { id: 'skill1', name: { ar: 'الحساب الذهني', en: 'Mental Math' }, level: 90 },
    { id: 'skill2', name: { ar: 'البرمجة (سكراتش)', en: 'Programming (Scratch)' }, level: 75 },
    { id: 'skill3', name: { ar: 'اللغة الإنجليزية', en: 'English Language' }, level: 85 },
    { id: 'skill4', name: { ar: 'مهارات العرض والتقديم', en: 'Presentation Skills' }, level: 80 },
  ],
  volunteerWork: [
    { id: 'vol1', organization: { ar: 'حملة تنظيف الشاطئ', en: 'Beach Cleanup Campaign' }, role: { ar: 'عضو فريق', en: 'Team Member' }, description: { ar: 'المشاركة في تنظيف شاطئ جدة ضمن مبادرة مدرسية للحفاظ على البيئة.', en: 'Participated in cleaning Jeddah beach as part of a school initiative to preserve the environment.' }, years: '2023' },
  ],
  hobbies: [
    { id: 'hob1', name: { ar: 'كرة القدم', en: 'Football' }, icon: 'football' },
    { id: 'hob2', name: { ar: 'الحساب الذهني', en: 'Mental Math' }, icon: 'calculator' },
    { id: 'hob3', name: { ar: 'القراءة', en: 'Reading' }, icon: 'book' },
  ],
  goals: {
    shortTerm: [
      { id: 'stg1', text: { ar: 'الحصول على معدل 98% في نهاية الفصل الدراسي', en: 'Achieve a 98% average at the end of the semester' }, type: 'short' },
      { id: 'stg2', text: { ar: 'الفوز في مسابقة الحساب الذهني على مستوى المدرسة', en: 'Win the school-level mental math competition' }, type: 'short' },
    ],
    longTerm: [
      { id: 'ltg1', text: { ar: 'دراسة هندسة الحاسب الآلي في جامعة مرموقة', en: 'Study Computer Engineering at a prestigious university' }, type: 'long' },
      { id: 'ltg2', text: { ar: 'تمثيل المنتخب السعودي لكرة القدم', en: 'Represent the Saudi national football team' }, type: 'long' },
    ]
  },
  gallery: [
    { id: 'gal1', title: { ar: 'شهادة تفوق', en: 'Certificate of Excellence' }, description: { ar: 'شهادة تفوق للعام الدراسي 2022-2023', en: 'Certificate of excellence for the academic year 2022-2023' }, type: 'image', year: 2023, url: 'https://picsum.photos/seed/cert1/800/600' },
    { id: 'gal2', title: { ar: 'مشروع العلوم', en: 'Science Project' }, description: { ar: 'فيديو عن مشروع الدائرة الكهربائية', en: 'Video about the electric circuit project' }, type: 'video', year: 2023, url: 'https://www.w3schools.com/html/mov_bbb.mp4', thumbnailUrl: 'https://picsum.photos/seed/vid1/800/600' },
    { id: 'gal3', title: { ar: 'بحث عن الفضاء', en: 'Research on Space' }, description: { ar: 'ملف PDF يحتوي على بحث متكامل عن الكواكب', en: 'A PDF file containing comprehensive research about planets' }, type: 'pdf', year: 2022, url: '#' },
    { id: 'gal4', title: { ar: 'ميدالية بطولة كرة القدم', en: 'Football Championship Medal' }, description: { ar: 'الفوز بالمركز الأول في البطولة المدرسية', en: 'Winning first place in the school tournament' }, type: 'image', year: 2022, url: 'https://picsum.photos/seed/medal1/800/600' },
  ],
  featuredProject: {
    title: { ar: 'مشروعي: نظام الري الذكي', en: 'My Project: Smart Irrigation System' },
    description: { ar: 'مشروع مدرسي يهدف إلى تصميم نظام ري أوتوماتيكي باستخدام حساسات الرطوبة لترشيد استهلاك المياه.', en: 'A school project aimed at designing an automatic irrigation system using moisture sensors to rationalize water consumption.' },
    details: { ar: 'تم استخدام لوحة أردوينو وحساسات للرطوبة ومضخة مياه صغيرة. النظام يقوم بقياس رطوبة التربة تلقائيًا وتشغيل الري عند الحاجة فقط، مما يوفر ما يصل إلى 60% من المياه مقارنة بالري التقليدي.', en: 'An Arduino board, moisture sensors, and a small water pump were used. The system automatically measures soil moisture and activates irrigation only when needed, saving up to 60% of water compared to traditional methods.' },
    imageUrl: 'https://picsum.photos/seed/project1/1200/800'
  },
  evaluations: [
    { id: 'eval1', author: 'الأستاذ أحمد', role: { ar: 'معلم الرياضيات', en: 'Math Teacher' }, comment: { ar: 'فيصل طالب متميز في الرياضيات، يمتلك قدرة فريدة على حل المسائل المعقدة بسرعة. أتمنى له كل التوفيق.', en: 'Faisal is an outstanding math student with a unique ability to solve complex problems quickly. I wish him all the best.' } },
    { id: 'eval2', author: 'الكابتن سامي', role: { ar: 'مدرب كرة القدم', en: 'Football Coach' }, comment: { ar: 'لاعب موهوب ويتمتع بروح الفريق. التزامه بالتدريب يجعله قدوة لزملائه.', en: 'A talented player with great team spirit. His commitment to training makes him a role model for his teammates.' } },
  ],
};

export const translations: Translations = {
  siteTitle: { ar: "إنجازاتي", en: "My Achievements" },
  nav: {
    about: { ar: "نبذة عني", en: "About Me" },
    education: { ar: "التعليم", en: "Education" },
    skills: { ar: "المهارات", en: "Skills" },
    volunteer: { ar: "الأعمال التطوعية", en: "Volunteer Work" },
    hobbies: { ar: "الهوايات", en: "Hobbies" },
    goals: { ar: "الأهداف", en: "Goals" },
    gallery: { ar: "معرض أعمالي", en: "Gallery" },
    project: { ar: "نشر مشروعي", en: "My Project" },
    evaluations: { ar: "تقييمات", en: "Evaluations" }
  },
  adminLogin: { ar: "دخول الإدارة", en: "Admin Login" },
  adminLogout: { ar: "خروج", en: "Logout" },
  shortTermGoals: { ar: "أهداف قصيرة المدى", en: "Short-Term Goals" },
  longTermGoals: { ar: "أهداف طويلة المدى", en: "Long-Term Goals" },
  contactMe: { ar: "تواصل معي", en: "Contact Me" },
  allRightsReserved: { ar: "جميع الحقوق محفوظة", en: "All Rights Reserved" },
  filterByType: { ar: "فلترة حسب النوع", en: "Filter by Type" },
  filterByYear: { ar: "فلترة حسب السنة", en: "Filter by Year" },
  all: { ar: "الكل", en: "All" },
  image: { ar: "صور", en: "Images" },
  video: { ar: "فيديو", en: "Videos" },
  pdf: { ar: "ملفات", en: "Files" },
};
