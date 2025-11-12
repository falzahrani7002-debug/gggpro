import { PortfolioData, Translations } from './types';

export const initialData: PortfolioData = {
  studentInfo: {
    name: "فيصل فهد الزهراني",
    grade: { ar: "1 / 3 (الأول المتوسط)", en: "1 / 3 (First Intermediate)" },
    school: "مدارس الأندلس – المنار",
    email: "f.alzahrani@gmail.com",
    about: {
      ar: "طالب طموح في الصف الأول المتوسط، شغوف بالمعرفة ومحب للاستكشاف. أسعى دائمًا لتطوير مهاراتي الأكاديمية والشخصية، مع تركيز خاص على الرياضيات التي أجد فيها متعة وتحديًا، وكرة القدم التي تعلمني أهمية العمل الجماعي والمثابرة. أؤمن بأن التعلم رحلة مستمرة لا تتوقف عند حدود الفصل الدراسي، وهذا الملف هو مرآة لجهودي وإنجازاتي، وقصة شغفي نحو تحقيق أهدافي.",
      en: "An ambitious first-intermediate grade student, passionate about knowledge and eager to explore. I am always striving to develop my academic and personal skills, with a special focus on mathematics, which I find both fun and challenging, and football, which teaches me the importance of teamwork and perseverance. I believe that learning is a continuous journey that doesn't stop at the classroom's borders, and this portfolio is a reflection of my efforts, my achievements, and the story of my passion towards achieving my goals."
    }
  },
  education: [
    { id: 'edu1', degree: { ar: 'المرحلة الابتدائية', en: 'Elementary School' }, institution: { ar: 'منارات جدة', en: 'Manarat Jeddah Schools' }, years: '2017 - 2023' },
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
    { id: 'hob4', name: { ar: 'البرمجة', en: 'Programming' }, icon: 'code' },
    { id: 'hob5', name: { ar: 'الشطرنج', en: 'Chess' }, icon: 'chess' },
  ],
  goals: {
    shortTerm: [
      { id: 'stg1', text: { ar: 'الحصول على معدل 98% في نهاية الفصل الدراسي', en: 'Achieve a 98% average at the end of the semester' }, type: 'short' },
      { id: 'stg2', text: { ar: 'الفوز في مسابقة الحساب الذهني على مستوى المدرسة', en: 'Win the school-level mental math competition' }, type: 'short' },
    ],
    longTerm: [
      { id: 'ltg1', text: { ar: 'دراسة هندسة الحاسب الآلي في جامعة مرموقة', en: 'Study Computer Engineering at a prestigious university' }, type: 'long' },
      { id: 'ltg2', text: { ar: 'تمثيل المنتخب السعودي لكرة القدم', en: 'Represent the Saudi national football team' }, type: 'long' },
      { id: 'ltg3', text: { ar: 'تطوير تطبيق جوال يساعد الطلاب في دراستهم', en: 'Develop a mobile app that helps students with their studies' }, type: 'long' },
      { id: 'ltg4', text: { ar: 'الحصول على لقب أستاذ في الشطرنج', en: 'Achieve the title of Chess Master' }, type: 'long' },
    ]
  },
  gallery: [
    { id: 'gal1', title: { ar: 'شهادة تفوق', en: 'Certificate of Excellence' }, description: { ar: 'شهادة تفوق للعام الدراسي 2022-2023', en: 'Certificate of excellence for the academic year 2022-2023' }, type: 'image', year: 2023, url: 'https://picsum.photos/seed/cert1/800/600' },
    { id: 'gal2', title: { ar: 'مشروع العلوم', en: 'Science Project' }, description: { ar: 'فيديو عن مشروع الدائرة الكهربائية', en: 'Video about the electric circuit project' }, type: 'video', year: 2023, url: 'https://www.w3schools.com/html/mov_bbb.mp4', thumbnailUrl: 'https://picsum.photos/seed/vid1/800/600' },
    { id: 'gal3', title: { ar: 'بحث عن الفضاء', en: 'Research on Space' }, description: { ar: 'ملف PDF يحتوي على بحث متكامل عن الكواكب', en: 'A PDF file containing comprehensive research about planets' }, type: 'pdf', year: 2022, url: '#' },
    { id: 'gal4', title: { ar: 'ميدالية بطولة كرة القدم', en: 'Football Championship Medal' }, description: { ar: 'الفوز بالمركز الأول في البطولة المدرسية', en: 'Winning first place in the school tournament' }, type: 'image', year: 2022, url: 'https://picsum.photos/seed/medal1/800/600' },
  ],
  featuredProject: {
    title: { ar: 'مشروعي: توزيع وجبات إفطار صائم في رمضان', en: 'My Project: Distributing Iftar Meals in Ramadan' },
    description: { ar: 'مبادرة تطوعية لتوزيع وجبات إفطار صائم على المحتاجين خلال شهر رمضان المبارك، بهدف تعزيز روح التكافل والعطاء في المجتمع.', en: 'A volunteer initiative to distribute Iftar meals to the needy during the holy month of Ramadan, aiming to promote the spirit of solidarity and giving in the community.' },
    details: { ar: 'بالتعاون مع جمعية خيرية محلية، شاركت في تجهيز وتغليف وتوزيع أكثر من ٥٠٠ وجبة إفطار طوال الشهر. كانت تجربة ملهمة علمتني قيمة العمل الإنساني وأهمية مساعدة الآخرين، ورسمت البسمة على وجوه الكثيرين.', en: 'In collaboration with a local charity, I participated in preparing, packaging, and distributing over 500 Iftar meals throughout the month. It was an inspiring experience that taught me the value of humanitarian work, the importance of helping others, and brought smiles to many faces.' },
    imageUrl: 'https://picsum.photos/seed/bright-moon/1200/800'
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
    project: { ar: "مشروعي", en: "My Project" },
    evaluations: { ar: "تقييمات", en: "Evaluations" },
    game: { ar: "لعبة خمن انجازاتي", en: "Guess My Achievements" },
    community: { ar: "شاركونا إنجازاتكم", en: "Share Your Achievements" }
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
  shareYourAchievement: { ar: "شاركنا إنجازك", en: "Share Your Achievement" },
  yourName: { ar: "اسمك", en: "Your Name" },
  yourAchievement: { ar: "إنجازك", en: "Your Achievement" },
  yourNamePlaceholder: { ar: "مثال: عبد الله", en: "e.g., Abdullah" },
  yourAchievementPlaceholder: { ar: "مثال: حصلت على المركز الأول في مسابقة القرآن الكريم", en: "e.g., I won first place in the Quran competition" },
  submitAchievement: { ar: "أنشر الآن", en: "Publish Now" },
  recentAchievements: { ar: "أحدث الإنجازات", en: "Latest Achievements" },
  noAchievementsYet: { ar: "لا توجد إنجازات بعد. كن أول من يشارك!", en: "No achievements yet. Be the first to share!" },
  errorAllFieldsRequired: { ar: "الرجاء ملء جميع الحقول.", en: "Please fill in all fields." },
};