import { addEditableTags } from '@contentstack/utils';
import { getEntry, getEntryByUrl } from '../sdk/entry';
import { BlogPostRes, Page } from '../typescript/pages';
import { FooterRes, HeaderRes } from '../typescript/response';

const liveEdit = process.env.REACT_APP_CONTENTSTACK_LIVE_EDIT_TAGS === 'true';

export const getHeaderRes = async (): Promise<HeaderRes> => {
  const response = (await getEntry({
    contentTypeUid: 'header',
    referenceFieldPath: ['navigation_menu.page_reference'],
    jsonRtePath: ['notification_bar.announcement_text'],
  })) as HeaderRes[][];
  liveEdit && addEditableTags(response[0][0], 'header', true);
  return response[0][0];
};

export const getFooterRes = async (): Promise<FooterRes> => {
  const response = (await getEntry({
    contentTypeUid: 'footer',
    jsonRtePath: ['copyright'],
    referenceFieldPath: undefined,
  })) as FooterRes[][];
  liveEdit && addEditableTags(response[0][0], 'footer', true);
  return response[0][0];
};

export const getAllEntries = async (): Promise<Page[]> => {
  const response = (await getEntry({
    contentTypeUid: 'page',
    jsonRtePath: undefined,
    referenceFieldPath: undefined,
  })) as Page[][];
  liveEdit &&
    response[0].forEach((entry) => addEditableTags(entry, 'blog_post', true));
  return response[0];
};

export const getPageRes = async (entryUrl: string): Promise<Page> => {
  const response = (await getEntryByUrl({
    contentTypeUid: 'page',
    entryUrl,
    referenceFieldPath: ['page_components.from_blog.featured_blogs'],
    jsonRtePath: [
      'page_components.from_blog.featured_blogs.body',
      'page_components.section_with_buckets.buckets.description',
      'page_components.section_with_html_code.description',
    ],
  })) as Page[];
  liveEdit && addEditableTags(response[0], 'page', true);
  return response[0];
};

export const getBlogListRes = async (): Promise<{
  archivedBlogs: BlogPostRes[];
  recentBlogs: BlogPostRes[];
}> => {
  const response = (await getEntry({
    contentTypeUid: 'blog_post',
    referenceFieldPath: ['author', 'related_post'],
    jsonRtePath: ['body'],
  })) as BlogPostRes[][];
  liveEdit &&
    response[0].forEach((entry) => addEditableTags(entry, 'blog_post', true));
  const archivedBlogs = [] as BlogPostRes[];
  const recentBlogs = [] as BlogPostRes[];

  response[0].forEach((blogs) => {
    if (blogs.is_archived) {
      archivedBlogs.push(blogs);
    } else {
      recentBlogs.push(blogs);
    }
  });
  return { archivedBlogs, recentBlogs };
};

export const getBlogPostRes = async (
  entryUrl: string
): Promise<BlogPostRes> => {
  const response = (await getEntryByUrl({
    contentTypeUid: 'blog_post',
    entryUrl,
    referenceFieldPath: ['author', 'related_post'],
    jsonRtePath: ['body', 'related_post.body'],
  })) as BlogPostRes[];
  liveEdit && addEditableTags(response[0], 'blog_post', true);
  return response[0];
};

// Fetch program sections (days)
export const getSectionRes = async (): Promise<any[]> => {
  const response = (await getEntry({
    contentTypeUid: 'section',
    referenceFieldPath: undefined,
    jsonRtePath: undefined,
  })) as any[][];
  liveEdit &&
    response[0].forEach((entry) => addEditableTags(entry, 'section', true));
  return response[0];
};

// Fetch sessions
export const getSessionRes = async (): Promise<any[]> => {
  const response = (await getEntry({
    contentTypeUid: 'session',
    referenceFieldPath: ['speakers', 'room'],
    jsonRtePath: undefined,
  })) as any[][];
  liveEdit &&
    response[0].forEach((entry) => addEditableTags(entry, 'session', true));
  return response[0];
};

// Fetch single session by session_id
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getSessionByIdRes = async (sessionId: number): Promise<any> => {
  const response = (await getEntry({
    contentTypeUid: 'session',
    referenceFieldPath: ['speakers', 'room'],
    jsonRtePath: undefined,
  })) as any[][];

  // Find the session with matching session_id
  const session = response[0]?.find((s) => s.session_id === sessionId);

  if (session) {
    liveEdit && addEditableTags(session, 'session', true);
  }

  return session || null;
};

// Helper to get day name from session day_id
import { ProgramDay } from '../typescript/conference-types';

// Default speaker image placeholder with dynamic name
export const getDefaultSpeakerImage = (name: string): string =>
  `https://ui-avatars.com/api/?name=${encodeURIComponent(
    name
  )}&background=6366f1&color=fff&size=200`;

export const getDayName = (
  dayId: string,
  programData: ProgramDay[]
): string => {
  const day = programData.find((d) => d.url === dayId);
  return day ? day.name : '';
};

// Fetch all speakers
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getSpeakersRes = async (): Promise<any[]> => {
  const response = (await getEntry({
    contentTypeUid: 'speaker',
    referenceFieldPath: undefined,
    jsonRtePath: undefined,
  })) as any[][];
  liveEdit &&
    response[0].forEach((entry) => addEditableTags(entry, 'speaker', true));
  return response[0];
};

// Fetch speaker by URL
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getSpeakerByUrlRes = async (speakerUrl: string): Promise<any> => {
  const response = (await getEntryByUrl({
    contentTypeUid: 'speaker',
    entryUrl: speakerUrl,
    referenceFieldPath: undefined,
    jsonRtePath: undefined,
  })) as any[];
  if (response && response.length > 0) {
    liveEdit && addEditableTags(response[0], 'speaker', true);
    return response[0];
  }
  return null;
};

// Fetch sessions by speaker UID
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getSessionsBySpeakerUidRes = async (
  speakerUid: string
): Promise<any[]> => {
  // Fetch all sessions with speakers reference included
  const response = (await getEntry({
    contentTypeUid: 'session',
    referenceFieldPath: ['speakers', 'room'],
    jsonRtePath: undefined,
  })) as any[][];

  if (!response?.[0]) {
    return [];
  }

  // Filter sessions where speakers array contains the speaker UID
  const filteredSessions = response[0].filter((session) => {
    if (session.speakers && Array.isArray(session.speakers)) {
      return session.speakers.some(
        (speaker: any) => speaker.uid === speakerUid
      );
    }
    return false;
  });

  liveEdit &&
    filteredSessions.forEach((entry) =>
      addEditableTags(entry, 'session', true)
    );

  return filteredSessions;
};
