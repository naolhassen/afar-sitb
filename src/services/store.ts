import {
  AdminUser,
  ContactMessage,
  Directorate,
  Event,
  FaqItem,
  GalleryItem,
  News,
  Publication,
  Sector,
  SiteSetting
} from '../types';
import {
  initialAdminUser,
  initialDirectorates,
  initialEvents,
  initialFaqItems,
  initialGalleryItems,
  initialMessages,
  initialNews,
  initialPublications,
  initialSectors,
  initialSiteSettings
} from '../data/initialData';

const STORAGE_KEYS = {
  NEWS: 'afar_sitb_news_v1',
  EVENTS: 'afar_sitb_events_v1',
  DIRECTORATES: 'afar_sitb_directorates_v1',
  SECTORS: 'afar_sitb_sectors_v1',
  GALLERY: 'afar_sitb_gallery_v1',
  PUBLICATIONS: 'afar_sitb_publications_v1',
  FAQS: 'afar_sitb_faqs_v1',
  SETTINGS: 'afar_sitb_settings_v1',
  MESSAGES: 'afar_sitb_messages_v1',
  AUTH: 'afar_sitb_auth_user_v1'
};

function loadStorage<T>(key: string, defaultValue: T): T {
  try {
    const item = localStorage.getItem(key);
    if (!item) return defaultValue;
    return JSON.parse(item) as T;
  } catch {
    return defaultValue;
  }
}

function saveStorage<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error(`Failed to save storage key: ${key}`, e);
  }
}

class AppStore {
  private news: News[] = loadStorage(STORAGE_KEYS.NEWS, initialNews);
  private events: Event[] = loadStorage(STORAGE_KEYS.EVENTS, initialEvents);
  private directorates: Directorate[] = loadStorage(STORAGE_KEYS.DIRECTORATES, initialDirectorates);
  private sectors: Sector[] = loadStorage(STORAGE_KEYS.SECTORS, initialSectors);
  private gallery: GalleryItem[] = loadStorage(STORAGE_KEYS.GALLERY, initialGalleryItems);
  private publications: Publication[] = loadStorage(STORAGE_KEYS.PUBLICATIONS, initialPublications);
  private faqs: FaqItem[] = loadStorage(STORAGE_KEYS.FAQS, initialFaqItems);
  private settings: SiteSetting = loadStorage(STORAGE_KEYS.SETTINGS, initialSiteSettings);
  private messages: ContactMessage[] = loadStorage(
    STORAGE_KEYS.MESSAGES,
    initialMessages
  );
  private currentUser: AdminUser | null = loadStorage(STORAGE_KEYS.AUTH, null);
  private listeners: Set<() => void> = new Set();

  public subscribe(listener: () => void) {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify() {
    this.listeners.forEach((listener) => listener());
  }

  // Auth
  public login(email: string, pass: string): boolean {
    if (
      (email.trim().toLowerCase() === 'admin@sitb.afar.gov.et' ||
        email.trim().toLowerCase() === 'admin@afar.gov.et' ||
        email.trim().toLowerCase() === 'admin') &&
      (pass === 'admin123' || pass === 'password' || pass === 'admin')
    ) {
      this.currentUser = initialAdminUser;
      saveStorage(STORAGE_KEYS.AUTH, this.currentUser);
      this.notify();
      return true;
    }
    // Also allow any non-empty test login for sandbox convenience
    if (email.includes('@') && pass.length >= 4) {
      this.currentUser = {
        id: 'usr_editor_custom',
        name: email.split('@')[0].toUpperCase(),
        email: email.trim(),
        role: 'EDITOR'
      };
      saveStorage(STORAGE_KEYS.AUTH, this.currentUser);
      this.notify();
      return true;
    }
    return false;
  }

  public logout() {
    this.currentUser = null;
    saveStorage(STORAGE_KEYS.AUTH, null);
    this.notify();
  }

  public getCurrentUser(): AdminUser | null {
    return this.currentUser;
  }

  // News
  public getNews(): News[] {
    return [...this.news].sort(
      (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
  }

  public getNewsBySlug(slug: string): News | undefined {
    return this.news.find((n) => n.slug === slug || n.id === slug);
  }

  public saveNews(item: Partial<News> & { id?: string }): News {
    let saved: News;
    if (item.id && this.news.some((n) => n.id === item.id)) {
      this.news = this.news.map((n) => {
        if (n.id === item.id) {
          saved = { ...n, ...item, updatedAt: new Date().toISOString() } as News;
          return saved;
        }
        return n;
      });
    } else {
      const title = item.titleEn || item.titleAm || item.titleAf || 'news-item';
      const slug =
        item.slug ||
        title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-|-$/g, '') +
          '-' +
          Date.now().toString().slice(-4);
      saved = {
        id: item.id || `news_${Date.now()}`,
        slug,
        titleAf: item.titleAf || '',
        titleAm: item.titleAm || '',
        titleEn: item.titleEn || '',
        excerptAf: item.excerptAf || '',
        excerptAm: item.excerptAm || '',
        excerptEn: item.excerptEn || '',
        contentAf: item.contentAf || '',
        contentAm: item.contentAm || '',
        contentEn: item.contentEn || '',
        coverImage: item.coverImage || '/uploads/news/583713910_1370145308140505_2477020799977289523_n.jpg',
        published: item.published ?? true,
        publishedAt: item.publishedAt || new Date().toISOString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      this.news = [saved, ...this.news];
    }
    saveStorage(STORAGE_KEYS.NEWS, this.news);
    this.notify();
    return saved!;
  }

  public deleteNews(id: string) {
    this.news = this.news.filter((n) => n.id !== id);
    saveStorage(STORAGE_KEYS.NEWS, this.news);
    this.notify();
  }

  // Events
  public getEvents(): Event[] {
    return [...this.events].sort(
      (a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
    );
  }

  public getEventBySlug(slug: string): Event | undefined {
    return this.events.find((e) => e.slug === slug || e.id === slug);
  }

  public saveEvent(item: Partial<Event> & { id?: string }): Event {
    let saved: Event;
    if (item.id && this.events.some((e) => e.id === item.id)) {
      this.events = this.events.map((e) => {
        if (e.id === item.id) {
          saved = { ...e, ...item, updatedAt: new Date().toISOString() } as Event;
          return saved;
        }
        return e;
      });
    } else {
      const title = item.titleEn || item.titleAm || item.titleAf || 'event-item';
      const slug =
        item.slug ||
        title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-|-$/g, '') +
          '-' +
          Date.now().toString().slice(-4);
      saved = {
        id: item.id || `evt_${Date.now()}`,
        slug,
        titleAf: item.titleAf || '',
        titleAm: item.titleAm || '',
        titleEn: item.titleEn || '',
        descriptionAf: item.descriptionAf || '',
        descriptionAm: item.descriptionAm || '',
        descriptionEn: item.descriptionEn || '',
        location: item.location || 'Semera, Afar Regional State',
        coverImage: item.coverImage || '/uploads/gallery/photo_2026-08-06_17-43-26.jpg',
        startDate: item.startDate || new Date(Date.now() + 86400000 * 7).toISOString(),
        endDate: item.endDate || null,
        published: item.published ?? true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      this.events = [saved, ...this.events];
    }
    saveStorage(STORAGE_KEYS.EVENTS, this.events);
    this.notify();
    return saved!;
  }

  public deleteEvent(id: string) {
    this.events = this.events.filter((e) => e.id !== id);
    saveStorage(STORAGE_KEYS.EVENTS, this.events);
    this.notify();
  }

  // Directorates
  public getDirectorates(): Directorate[] {
    return [...this.directorates].sort((a, b) => a.order - b.order);
  }

  public saveDirectorate(item: Partial<Directorate> & { id?: string }): Directorate {
    let saved: Directorate;
    if (item.id && this.directorates.some((d) => d.id === item.id)) {
      this.directorates = this.directorates.map((d) => {
        if (d.id === item.id) {
          saved = { ...d, ...item, updatedAt: new Date().toISOString() } as Directorate;
          return saved;
        }
        return d;
      });
    } else {
      saved = {
        id: item.id || `dir_${Date.now()}`,
        order: item.order ?? this.directorates.length + 1,
        nameAf: item.nameAf || '',
        nameAm: item.nameAm || '',
        nameEn: item.nameEn || '',
        descriptionAf: item.descriptionAf || '',
        descriptionAm: item.descriptionAm || '',
        descriptionEn: item.descriptionEn || '',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      this.directorates.push(saved);
    }
    saveStorage(STORAGE_KEYS.DIRECTORATES, this.directorates);
    this.notify();
    return saved!;
  }

  public deleteDirectorate(id: string) {
    this.directorates = this.directorates.filter((d) => d.id !== id);
    saveStorage(STORAGE_KEYS.DIRECTORATES, this.directorates);
    this.notify();
  }

  // Sectors
  public getSectors(): Sector[] {
    return [...this.sectors].sort((a, b) => a.order - b.order);
  }

  public saveSector(item: Partial<Sector> & { id?: string }): Sector {
    let saved: Sector;
    if (item.id && this.sectors.some((s) => s.id === item.id)) {
      this.sectors = this.sectors.map((s) => {
        if (s.id === item.id) {
          saved = { ...s, ...item, updatedAt: new Date().toISOString() } as Sector;
          return saved;
        }
        return s;
      });
    } else {
      saved = {
        id: item.id || `sec_${Date.now()}`,
        order: item.order ?? this.sectors.length + 1,
        nameAf: item.nameAf || '',
        nameAm: item.nameAm || '',
        nameEn: item.nameEn || '',
        headTitleAf: item.headTitleAf || '',
        headTitleAm: item.headTitleAm || '',
        headTitleEn: item.headTitleEn || '',
        descriptionAf: item.descriptionAf || '',
        descriptionAm: item.descriptionAm || '',
        descriptionEn: item.descriptionEn || '',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      this.sectors.push(saved);
    }
    saveStorage(STORAGE_KEYS.SECTORS, this.sectors);
    this.notify();
    return saved!;
  }

  public deleteSector(id: string) {
    this.sectors = this.sectors.filter((s) => s.id !== id);
    saveStorage(STORAGE_KEYS.SECTORS, this.sectors);
    this.notify();
  }

  // Gallery
  public getGallery(): GalleryItem[] {
    return [...this.gallery].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  public saveGalleryItem(item: Partial<GalleryItem> & { id?: string }): GalleryItem {
    let saved: GalleryItem;
    if (item.id && this.gallery.some((g) => g.id === item.id)) {
      this.gallery = this.gallery.map((g) => {
        if (g.id === item.id) {
          saved = { ...g, ...item } as GalleryItem;
          return saved;
        }
        return g;
      });
    } else {
      saved = {
        id: item.id || `gal_${Date.now()}`,
        titleAf: item.titleAf || '',
        titleAm: item.titleAm || '',
        titleEn: item.titleEn || '',
        imageUrl: item.imageUrl || '/uploads/gallery/photo_2026-08-06_17-43-14.jpg',
        type: item.type || 'IMAGE',
        createdAt: new Date().toISOString()
      };
      this.gallery = [saved, ...this.gallery];
    }
    saveStorage(STORAGE_KEYS.GALLERY, this.gallery);
    this.notify();
    return saved!;
  }

  public deleteGalleryItem(id: string) {
    this.gallery = this.gallery.filter((g) => g.id !== id);
    saveStorage(STORAGE_KEYS.GALLERY, this.gallery);
    this.notify();
  }

  // Publications
  public getPublications(): Publication[] {
    return [...this.publications].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  public savePublication(item: Partial<Publication> & { id?: string }): Publication {
    let saved: Publication;
    if (item.id && this.publications.some((p) => p.id === item.id)) {
      this.publications = this.publications.map((p) => {
        if (p.id === item.id) {
          saved = { ...p, ...item, updatedAt: new Date().toISOString() } as Publication;
          return saved;
        }
        return p;
      });
    } else {
      saved = {
        id: item.id || `pub_${Date.now()}`,
        titleAf: item.titleAf || '',
        titleAm: item.titleAm || '',
        titleEn: item.titleEn || '',
        descriptionAf: item.descriptionAf || '',
        descriptionAm: item.descriptionAm || '',
        descriptionEn: item.descriptionEn || '',
        fileUrl: item.fileUrl || '#',
        coverImage: item.coverImage || '/uploads/gallery/583874978_1370144934807209_223835636339610176_n.jpg',
        published: item.published ?? true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      this.publications = [saved, ...this.publications];
    }
    saveStorage(STORAGE_KEYS.PUBLICATIONS, this.publications);
    this.notify();
    return saved!;
  }

  public deletePublication(id: string) {
    this.publications = this.publications.filter((p) => p.id !== id);
    saveStorage(STORAGE_KEYS.PUBLICATIONS, this.publications);
    this.notify();
  }

  // FAQs
  public getFaqs(): FaqItem[] {
    return [...this.faqs].sort((a, b) => a.order - b.order);
  }

  public saveFaq(item: Partial<FaqItem> & { id?: string }): FaqItem {
    let saved: FaqItem;
    if (item.id && this.faqs.some((f) => f.id === item.id)) {
      this.faqs = this.faqs.map((f) => {
        if (f.id === item.id) {
          saved = { ...f, ...item, updatedAt: new Date().toISOString() } as FaqItem;
          return saved;
        }
        return f;
      });
    } else {
      saved = {
        id: item.id || `faq_${Date.now()}`,
        order: item.order ?? this.faqs.length + 1,
        questionAf: item.questionAf || '',
        questionAm: item.questionAm || '',
        questionEn: item.questionEn || '',
        answerAf: item.answerAf || '',
        answerAm: item.answerAm || '',
        answerEn: item.answerEn || '',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      this.faqs.push(saved);
    }
    saveStorage(STORAGE_KEYS.FAQS, this.faqs);
    this.notify();
    return saved!;
  }

  public deleteFaq(id: string) {
    this.faqs = this.faqs.filter((f) => f.id !== id);
    saveStorage(STORAGE_KEYS.FAQS, this.faqs);
    this.notify();
  }

  // Settings
  public getSettings(): SiteSetting {
    return { ...this.settings };
  }

  public getSiteSettings(): SiteSetting {
    return this.getSettings();
  }

  public updateSettings(newSettings: Partial<SiteSetting>): SiteSetting {
    this.settings = {
      ...this.settings,
      ...newSettings,
      updatedAt: new Date().toISOString()
    };
    saveStorage(STORAGE_KEYS.SETTINGS, this.settings);
    this.notify();
    return this.settings;
  }

  // Messages
  public getMessages(): ContactMessage[] {
    return [...this.messages].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  public addMessage(msg: {
    name: string;
    email: string;
    phone?: string;
    subject?: string;
    message: string;
  }): ContactMessage {
    const newMsg: ContactMessage = {
      id: `msg_${Date.now()}`,
      name: msg.name,
      email: msg.email,
      phone: msg.phone || null,
      subject: msg.subject || null,
      message: msg.message,
      createdAt: new Date().toISOString(),
      isRead: false
    };
    this.messages = [newMsg, ...this.messages];
    saveStorage(STORAGE_KEYS.MESSAGES, this.messages);
    this.notify();
    return newMsg;
  }

  public addContactMessage(msg: {
    name: string;
    email: string;
    phone?: string;
    subject?: string;
    message: string;
  }): ContactMessage {
    return this.addMessage(msg);
  }

  public markMessageRead(id: string, isRead = true) {
    this.messages = this.messages.map((m) => (m.id === id ? { ...m, isRead } : m));
    saveStorage(STORAGE_KEYS.MESSAGES, this.messages);
    this.notify();
  }

  public deleteMessage(id: string) {
    this.messages = this.messages.filter((m) => m.id !== id);
    saveStorage(STORAGE_KEYS.MESSAGES, this.messages);
    this.notify();
  }

  public resetToDefaults() {
    this.news = initialNews;
    this.events = initialEvents;
    this.directorates = initialDirectorates;
    this.sectors = initialSectors;
    this.gallery = initialGalleryItems;
    this.publications = initialPublications;
    this.faqs = initialFaqItems;
    this.settings = initialSiteSettings;
    this.messages = initialMessages;

    saveStorage(STORAGE_KEYS.NEWS, this.news);
    saveStorage(STORAGE_KEYS.EVENTS, this.events);
    saveStorage(STORAGE_KEYS.DIRECTORATES, this.directorates);
    saveStorage(STORAGE_KEYS.SECTORS, this.sectors);
    saveStorage(STORAGE_KEYS.GALLERY, this.gallery);
    saveStorage(STORAGE_KEYS.PUBLICATIONS, this.publications);
    saveStorage(STORAGE_KEYS.FAQS, this.faqs);
    saveStorage(STORAGE_KEYS.SETTINGS, this.settings);
    saveStorage(STORAGE_KEYS.MESSAGES, this.messages);
    this.notify();
  }
}

export const store = new AppStore();
