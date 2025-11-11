
export type Language = 'ar' | 'en';

export type Page = 'about' | 'education' | 'skills' | 'volunteer' | 'hobbies' | 'goals' | 'gallery' | 'project' | 'evaluations';

export interface Translatable {
  ar: string;
  en: string;
}

export interface StudentInfo {
  name: string;
  grade: Translatable;
  school: string;
  email: string;
  about: Translatable;
}

export interface EducationItem {
  id: string;
  degree: Translatable;
  institution: Translatable;
  years: string;
}

export interface Skill {
  id: string;
  name: Translatable;
  level: number; // 0-100
}

export interface VolunteerWork {
  id: string;
  organization: Translatable;
  role: Translatable;
  description: Translatable;
  years: string;
}

export interface Hobby {
  id: string;
  name: Translatable;
  icon: string; // Icon identifier
}

export interface Goal {
  id: string;
  text: Translatable;
  type: 'short' | 'long';
}

export interface GalleryItem {
  id: string;
  title: Translatable;
  description: Translatable;
  type: 'image' | 'video' | 'pdf';
  year: number;
  url: string;
  thumbnailUrl?: string;
}

export interface FeaturedProject {
  title: Translatable;
  description: Translatable;
  details: Translatable;
  imageUrl: string;
}

export interface Evaluation {
  id: string;
  author: string;
  role: Translatable; // e.g., Teacher, Peer
  comment: Translatable;
}

export interface PortfolioData {
  studentInfo: StudentInfo;
  education: EducationItem[];
  skills: Skill[];
  volunteerWork: VolunteerWork[];
  hobbies: Hobby[];
  goals: {
    shortTerm: Goal[];
    longTerm: Goal[];
  };
  gallery: GalleryItem[];
  featuredProject: FeaturedProject;
  evaluations: Evaluation[];
}

export interface Translations {
  siteTitle: Translatable;
  nav: { [key in Page]: Translatable };
  adminLogin: Translatable;
  adminLogout: Translatable;
  shortTermGoals: Translatable;
  longTermGoals: Translatable;
  contactMe: Translatable;
  allRightsReserved: Translatable;
  filterByType: Translatable;
  filterByYear: Translatable;
  all: Translatable;
  image: Translatable;
  video: Translatable;
  pdf: Translatable;
}
