import React, { useEffect, useState } from 'react';
import {
  ConferenceFooter,
  ConferenceHeader,
  CTASection,
  PageHero,
  SessionCard,
} from '../components';
import { getDayName, getSectionRes, getSessionRes } from '../helper';
import '../styles/conference.css';
import { ProgramDay, Session } from '../typescript/conference-types';

// Fallback data in case CMS fetch fails
const fallbackProgramData: ProgramDay[] = [
  {
    locale: 'en-us',
    name: '7th May, 2026',
    section_time: {
      end_time: '2026-05-07T18:00:00.000Z',
      start_time: '2026-05-07T08:00:00.000Z',
    },
    title: 'Day 1',
    url: '/day-1',
  },
  {
    locale: 'en-us',
    name: '8th May, 2026',
    section_time: {
      end_time: '2026-05-08T18:00:00.000Z',
      start_time: '2026-05-08T08:00:00.000Z',
    },
    title: 'Day 2',
    url: '/day-2',
  },
];

// Store for program data that can be updated from CMS
let _programData: ProgramDay[] = fallbackProgramData;

// Export programData for other components
export const programData = fallbackProgramData;

// Function to get current program data (use this in other components if needed)
export const getProgramData = (): ProgramDay[] => _programData;

// Fallback sessions data in case CMS fetch fails
const fallbackSessions: Session[] = [
  // Day 1 Sessions
  {
    description: 'Building modern apps with as little JS as possible.',
    is_popular: true,
    locale: 'en-us',
    room: [{ _content_type_uid: 'room', uid: 'blt001main' }],
    session_id: 1001,
    session_time: {
      end_time: '2026-05-07T09:45:00.000Z',
      start_time: '2026-05-07T09:00:00.000Z',
    },
    speakers: [{ _content_type_uid: 'speaker', uid: 'blt001speaker' }],
    title: 'Vanilla-First: Why 2026 Is the Year of Framework Minimalism',
    type: 'Keynote',
    day_id: '/day-1',
  },
  {
    description:
      'AI-powered test generation, auto-fixing flaky tests, hybrid human+AI QA.',
    is_popular: false,
    locale: 'en-us',
    room: [{ _content_type_uid: 'room', uid: 'blt001main' }],
    session_id: 1002,
    session_time: {
      end_time: '2026-05-07T10:45:00.000Z',
      start_time: '2026-05-07T10:00:00.000Z',
    },
    speakers: [
      { _content_type_uid: 'speaker', uid: 'blt002speaker' },
      { _content_type_uid: 'speaker', uid: 'blt003speaker' },
    ],
    title: 'AI-Driven Testing: Smarter QA Pipelines for Modern JavaScript Apps',
    type: 'Breakout Session',
    day_id: '/day-1',
  },
  {
    description:
      'Where JS + Wasm is winning (video, graphics, ML, VR, data processing).',
    is_popular: true,
    locale: 'en-us',
    room: [{ _content_type_uid: 'room', uid: 'blt002track' }],
    session_id: 1003,
    session_time: {
      end_time: '2026-05-07T11:45:00.000Z',
      start_time: '2026-05-07T11:00:00.000Z',
    },
    speakers: [{ _content_type_uid: 'speaker', uid: 'blt004speaker' }],
    title:
      'WebAssembly + JavaScript: Real-World Fusion for High-Performance Apps',
    type: 'Breakout Session',
    day_id: '/day-1',
  },
  {
    description:
      'Practical workflows, tooling integration, and AI-assisted code generation with Claude Code, Cursor, Gemini, GPT-5 and Sonnet.',
    is_popular: true,
    locale: 'en-us',
    room: [{ _content_type_uid: 'room', uid: 'blt001main' }],
    session_id: 1004,
    session_time: {
      end_time: '2026-05-07T13:45:00.000Z',
      start_time: '2026-05-07T13:00:00.000Z',
    },
    speakers: [{ _content_type_uid: 'speaker', uid: 'blt005speaker' }],
    title:
      'The AI-Native Frontend: How LLMs Will Transform JavaScript Development',
    type: 'Keynote',
    day_id: '/day-1',
  },
  {
    description:
      'What React Server Components, Solid, Qwik, Svelte, and others are doing in the server-first world.',
    is_popular: false,
    locale: 'en-us',
    room: [{ _content_type_uid: 'room', uid: 'blt001main' }],
    session_id: 1005,
    session_time: {
      end_time: '2026-05-07T14:45:00.000Z',
      start_time: '2026-05-07T14:00:00.000Z',
    },
    speakers: [
      { _content_type_uid: 'speaker', uid: 'blt006speaker' },
      { _content_type_uid: 'speaker', uid: 'blt007speaker' },
    ],
    title: 'Server Components Everywhere: The New Era of Low-JS Apps',
    type: 'Panel Discussion',
    day_id: '/day-1',
  },
  // Day 2 Sessions
  {
    description:
      'Vercel Edge, Cloudflare Workers, Fastly Compute — architecture patterns for ultra-low latency apps.',
    is_popular: true,
    locale: 'en-us',
    room: [{ _content_type_uid: 'room', uid: 'blt001main' }],
    session_id: 2001,
    session_time: {
      end_time: '2026-05-08T09:45:00.000Z',
      start_time: '2026-05-08T09:00:00.000Z',
    },
    speakers: [{ _content_type_uid: 'speaker', uid: 'blt008speaker' }],
    title:
      'The Edge is the New Backend: Running JavaScript on Distributed Infrastructure',
    type: 'Keynote',
    day_id: '/day-2',
  },
  {
    description:
      'Type inference tricks, safe API design, TS project governance and updates!',
    is_popular: true,
    locale: 'en-us',
    room: [{ _content_type_uid: 'room', uid: 'blt001main' }],
    session_id: 2002,
    session_time: {
      end_time: '2026-05-08T10:45:00.000Z',
      start_time: '2026-05-08T10:00:00.000Z',
    },
    speakers: [{ _content_type_uid: 'speaker', uid: 'blt009speaker' }],
    title:
      'TypeScript in 2026: Advanced Patterns for Large-Scale, High-Reliability Codebases',
    type: 'Breakout Session',
    day_id: '/day-2',
  },
  {
    description:
      'Critical in 2026: securing open-source dependencies and CI/CD.',
    is_popular: false,
    locale: 'en-us',
    room: [{ _content_type_uid: 'room', uid: 'blt002track' }],
    session_id: 2003,
    session_time: {
      end_time: '2026-05-08T11:45:00.000Z',
      start_time: '2026-05-08T11:00:00.000Z',
    },
    speakers: [{ _content_type_uid: 'speaker', uid: 'blt010speaker' }],
    title:
      'JavaScript Supply-Chain Security: SBOMs, Zero-Trust, and Securing Dependencies',
    type: 'Breakout Session',
    day_id: '/day-2',
  },
  {
    description:
      'Atomic design, headless components, cross-framework strategies.',
    is_popular: false,
    locale: 'en-us',
    room: [{ _content_type_uid: 'room', uid: 'blt001main' }],
    session_id: 2004,
    session_time: {
      end_time: '2026-05-08T13:45:00.000Z',
      start_time: '2026-05-08T13:00:00.000Z',
    },
    speakers: [
      { _content_type_uid: 'speaker', uid: 'blt011speaker' },
      { _content_type_uid: 'speaker', uid: 'blt012speaker' },
    ],
    title:
      'Design Systems for 2026: Framework-Agnostic, Headless, and AI-Enhanced',
    type: 'Workshop',
    day_id: '/day-2',
  },
  {
    description:
      'How streaming improves performance, UX, and developer experience.',
    is_popular: true,
    locale: 'en-us',
    room: [{ _content_type_uid: 'room', uid: 'blt001main' }],
    session_id: 2005,
    session_time: {
      end_time: '2026-05-08T14:45:00.000Z',
      start_time: '2026-05-08T14:00:00.000Z',
    },
    speakers: [{ _content_type_uid: 'speaker', uid: 'blt013speaker' }],
    title:
      'htmx | Streaming Everything: HTML, Data, State — The Future of Realtime Web Apps',
    type: 'Keynote',
    day_id: '/day-2',
  },
];

// Store for sessions data that can be updated from CMS
let _sessions: Session[] = fallbackSessions;

// Export sessions for other components
export const sessions = fallbackSessions;

// Function to get current sessions data
export const getSessions = (): Session[] => _sessions;

// Re-export formatTime from SessionCard for backward compatibility
export { formatTime } from '../components/SessionCard';

// Helper function to get sessions for a specific day
const getSessionsForDay = (
  dayUrl: string,
  sessionsList: Session[]
): Session[] => {
  return sessionsList.filter((session) => session.day_id === dayUrl);
};

const ProgramPage: React.FC = () => {
  const [activeDay, setActiveDay] = useState(0);
  const [programDays, setProgramDays] =
    useState<ProgramDay[]>(fallbackProgramData);
  const [sessionsList, setSessionsList] = useState<Session[]>(fallbackSessions);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch sections and sessions in parallel
        const [sections, sessionsData] = await Promise.all([
          getSectionRes(),
          getSessionRes(),
        ]);

        // Process sections
        if (sections && sections.length > 0) {
          const mappedDays: ProgramDay[] = sections
            .map((section: any) => ({
              locale: section.locale || 'en-us',
              name: section.name || section.title,
              section_time: section.section_time || {
                end_time: '',
                start_time: '',
              },
              title: section.title,
              url: section.url,
            }))
            .sort((a: ProgramDay, b: ProgramDay) =>
              a.title.localeCompare(b.title)
            );
          setProgramDays(mappedDays);
          _programData = mappedDays;
        }

        // Process sessions
        console.log('fetching sessions data');
        if (sessionsData && sessionsData.length > 0) {
          console.log('sessionsData', sessionsData);

          // Get the mapped days for calculating day_id from session_time
          const days = sections?.length > 0 ? sections : fallbackProgramData;

          const mappedSessions: Session[] = sessionsData.map(
            (session: any, index: number) => {
              // Calculate day_id from session_time by comparing dates (ignoring year)
              let dayId = '/day-1'; // default

              if (session.session_time?.start_time) {
                const sessionDate = new Date(session.session_time.start_time);
                // Get MM-DD only (ignore year)
                const sessionMonthDay = sessionDate.toISOString().slice(5, 10);

                // Find matching section by comparing month and day only
                for (const day of days) {
                  if (day.section_time?.start_time) {
                    const sectionDate = new Date(day.section_time.start_time);
                    const sectionMonthDay = sectionDate
                      .toISOString()
                      .slice(5, 10);
                    console.log('sectionMonthDay', sectionMonthDay);

                    if (sessionMonthDay === sectionMonthDay) {
                      dayId = day.url;
                      break;
                    }
                  }
                }
              }

              console.log(`Session "${session.title}" mapped to day: ${dayId}`);

              return {
                description: session.description || '',
                is_popular: session.is_popular || false,
                locale: session.locale || 'en-us',
                room: session.room || [],
                session_id: session.session_id || index + 1,
                session_time: session.session_time || {
                  end_time: '',
                  start_time: '',
                },
                speakers: session.speakers || [],
                title: session.title || '',
                type: session.type || 'Session',
                day_id: dayId,
              };
            }
          );

          // Sort sessions by start_time
          mappedSessions.sort((a, b) => {
            const timeA = new Date(a.session_time.start_time).getTime();
            const timeB = new Date(b.session_time.start_time).getTime();
            return timeA - timeB;
          });

          setSessionsList(mappedSessions);
          _sessions = mappedSessions;
        }
      } catch (error) {
        console.error('Failed to fetch data from CMS:', error);
        // Keep using fallback data
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="conference">
      <ConferenceHeader />

      <PageHero
        title="Program"
        description="Two days of cutting-edge JavaScript talks, workshops, and networking with the best minds in the industry."
      />

      {/* Day Tabs */}
      <section className="program-section">
        <div className="program-container">
          {loading ? (
            <div className="loading-state">Loading program...</div>
          ) : (
            <>
              <div className="day-tabs">
                {programDays.map((day, index) => (
                  <button
                    key={day.url}
                    className={`day-tab ${activeDay === index ? 'active' : ''}`}
                    onClick={() => setActiveDay(index)}
                  >
                    <span className="day-label">{day.title}</span>
                    <span className="day-date">{day.name}</span>
                  </button>
                ))}
              </div>

              {/* Program List */}
              <div className="program-list">
                {programDays[activeDay] &&
                  getSessionsForDay(
                    programDays[activeDay].url,
                    sessionsList
                  ).map((session, index) => (
                    <SessionCard
                      key={session.session_id}
                      session={session}
                      animationDelay={index * 0.1}
                      dayName={getDayName(session.day_id, programDays)}
                      action={{
                        label: 'View Session',
                        href: `/session/${session.session_id}`,
                      }}
                    />
                  ))}
              </div>
            </>
          )}
        </div>
      </section>

      <CTASection
        title="Don't Miss Out!"
        description="Secure your spot at the #1 JavaScript Conference on the planet."
        buttons={[
          {
            label: 'Get Tickets',
            href: '#tickets',
            variant: 'primary',
            hasArrow: true,
          },
          { label: 'View Speakers', href: '/speakers', variant: 'secondary' },
        ]}
      />

      <ConferenceFooter />
    </div>
  );
};

export default ProgramPage;
