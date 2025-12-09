// ===== Conference Types =====

export interface Image {
  url: string;
  filename?: string;
}

export interface ConferenceLink {
  href: string;
  title: string;
}

export interface ConferenceEvent {
  end_time: string;
  start_time: string;
}

export interface Conference {
  title: string;
  timezone: string;
  description: string;
  conferecne_images: Image[];
  conference_links: ConferenceLink[];
  conference_event: ConferenceEvent;
}

// ===== Speaker Types =====

export interface ProfileImage {
  filename: string;
  url: string;
}

export interface Speaker {
  title: string;
  url: string;
  full_name: string;
  tags: string[];
  is_featured: boolean;
  profile_image: ProfileImage;
  bio?: string;
}

// ===== Sponsor Types =====

export interface SponsorImage {
  url: string;
}

export interface SponsorLink {
  href: string;
  title: string;
}

export interface Sponsor {
  area_focus: string;
  bio: string;
  booth_number: number;
  display_image: SponsorImage;
  link: SponsorLink;
  locale: string;
  logo: SponsorImage;
  participation: string;
  sort_order: number;
  title: string;
}

// ===== Feature Types =====

export interface Feature {
  icon: string;
  title: string;
  description: string;
}

// ===== Program Types =====

export interface ContentReference {
  _content_type_uid: string;
  uid: string;
}

export interface SessionTime {
  end_time: string;
  start_time: string;
}

export interface Session {
  description: string;
  is_popular: boolean;
  locale: string;
  room: ContentReference[];
  session_id: number;
  session_time: SessionTime;
  speakers: (Speaker | ContentReference)[];
  title: string;
  type: string;
  day_id: string;
}

export interface SectionTime {
  end_time: string;
  start_time: string;
}

export interface ProgramDay {
  locale: string;
  name: string;
  section_time: SectionTime;
  title: string;
  url: string;
}
