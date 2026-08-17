export type Locale = 'af' | 'am' | 'en';

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: 'SUPER_ADMIN' | 'EDITOR';
}

export interface News {
  id: string;
  slug: string;
  titleAf: string;
  titleAm: string;
  titleEn: string;
  excerptAf?: string | null;
  excerptAm?: string | null;
  excerptEn?: string | null;
  contentAf: string;
  contentAm: string;
  contentEn: string;
  coverImage?: string | null;
  published: boolean;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface Event {
  id: string;
  slug: string;
  titleAf: string;
  titleAm: string;
  titleEn: string;
  descriptionAf: string;
  descriptionAm: string;
  descriptionEn: string;
  location?: string | null;
  coverImage?: string | null;
  startDate: string;
  endDate?: string | null;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Publication {
  id: string;
  titleAf: string;
  titleAm: string;
  titleEn: string;
  descriptionAf?: string | null;
  descriptionAm?: string | null;
  descriptionEn?: string | null;
  fileUrl: string;
  coverImage?: string | null;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

export type MediaType = 'IMAGE' | 'VIDEO';

export interface GalleryItem {
  id: string;
  titleAf?: string | null;
  titleAm?: string | null;
  titleEn?: string | null;
  imageUrl: string;
  type: MediaType;
  createdAt: string;
  updatedAt?: string;
}

export interface Sector {
  id: string;
  order: number;
  nameAf: string;
  nameAm: string;
  nameEn: string;
  headTitleAf?: string | null;
  headTitleAm?: string | null;
  headTitleEn?: string | null;
  descriptionAf?: string | null;
  descriptionAm?: string | null;
  descriptionEn?: string | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface Directorate {
  id: string;
  order: number;
  nameAf: string;
  nameAm: string;
  nameEn: string;
  descriptionAf?: string | null;
  descriptionAm?: string | null;
  descriptionEn?: string | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface FaqItem {
  id: string;
  order: number;
  questionAf: string;
  questionAm: string;
  questionEn: string;
  answerAf: string;
  answerAm: string;
  answerEn: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  subject?: string | null;
  message: string;
  createdAt: string;
  isRead: boolean;
}

export interface SiteSetting {
  id: string;
  missionAf?: string | null;
  missionAm?: string | null;
  missionEn?: string | null;
  visionAf?: string | null;
  visionAm?: string | null;
  visionEn?: string | null;
  valuesAf?: string | null;
  valuesAm?: string | null;
  valuesEn?: string | null;
  historyAf?: string | null;
  historyAm?: string | null;
  historyEn?: string | null;
  bureauHeadMsgAf?: string | null;
  bureauHeadMsgAm?: string | null;
  bureauHeadMsgEn?: string | null;
  bureauHeadName?: string | null;
  bureauHeadPhoto?: string | null;
  phone?: string | null;
  email?: string | null;
  addressAf?: string | null;
  addressAm?: string | null;
  addressEn?: string | null;
  facebookUrl?: string | null;
  telegramUrl?: string | null;
  twitterUrl?: string | null;
  instagramUrl?: string | null;
  youtubeUrl?: string | null;
  updatedAt: string;
}

export type PageRoute =
  | 'home'
  | 'about'
  | 'sectors'
  | 'directorates'
  | 'news'
  | 'news-detail'
  | 'events'
  | 'event-detail'
  | 'publications'
  | 'gallery'
  | 'faq'
  | 'contact'
  | 'admin-login'
  | 'admin-dashboard'
  | 'admin-news'
  | 'admin-events'
  | 'admin-directorates'
  | 'admin-sectors'
  | 'admin-gallery'
  | 'admin-publications'
  | 'admin-faq'
  | 'admin-messages'
  | 'admin-settings'
  | 'laravel-architecture';
