export interface ColorPalette {
  primary: string;      // ex: #D89B9E (Rosa Seco)
  primaryDark: string;  // ex: #C48185
  bg: string;           // ex: #FAF6F0 (Off-white)
  surface: string;      // ex: #F3E8DC (Areia / Bege)
  text: string;         // ex: #5C3A31 (Marrom Café)
  accent: string;       // ex: #7C7859 (Verde Oliva)
}

export interface ThemeConfig {
  colors: ColorPalette;
  pattern?: "dots" | "none";
}

export interface SeoConfig {
  title: string;
  description: string;
  ogImage?: string;
}

export interface HeroConfig {
  tagline: string;
  badgeSubtitle: string;
  title: string;
  badgeFooter: string;
  countdownTarget: string; // ISO date string ou data compatível
  countdownLabel?: string;
  quickLinks?: {
    rsvpLabel?: string;
    giftsLabel?: string;
  };
}

export interface StoryConfig {
  subtitle: string;
  title: string;
  paragraphs: string[];
  signature: string;
}

export interface EventInfoConfig {
  subtitle?: string;
  title?: string;
  dateDisplay: string;
  timeDisplay: string;
  dressCode?: string;
  locationName: string;
  address: string;
  googleMapsUrl?: string;
  wazeUrl?: string;
}

export interface DiaperGuideItem {
  size: string;
  quantity: string;
  extra: string;
  isHighlight?: boolean;
}

export interface DiaperGuideConfig {
  title?: string;
  items: DiaperGuideItem[];
  brandsNote?: string;
}

export interface PixConfig {
  title?: string;
  description?: string;
  key: string;
  keyType?: "email" | "cpf" | "phone" | "random";
}

export interface ExternalGiftList {
  name: string;
  url: string;
}

export interface GiftsConfig {
  subtitle?: string;
  title?: string;
  description?: string;
  diaperGuide?: DiaperGuideConfig;
  pix?: PixConfig;
  externalLists?: ExternalGiftList[];
}

export interface RsvpConfig {
  subtitle?: string;
  title?: string;
  description?: string;
  whatsappNumber: string;
  companionOptions?: string[];
  defaultMessagePrefix?: string;
}

export interface FooterConfig {
  title: string;
  subtitle: string;
}

export interface LandingConfig {
  slug: string;
  templateId: "baby-shower-boho" | string;
  seo: SeoConfig;
  theme: ThemeConfig;
  hero: HeroConfig;
  story?: StoryConfig;
  event: EventInfoConfig;
  gifts?: GiftsConfig;
  rsvp: RsvpConfig;
  footer?: FooterConfig;
}

