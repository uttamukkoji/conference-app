import React, { useEffect, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import {
  ConferenceFooter,
  ConferenceHeader,
  CTASection,
  formatTime,
  SessionCard,
  SpeakerCard,
} from '../components';
import { getDayName, getSessionByIdRes, getSessionRes } from '../helper';
import '../styles/conference.css';
import { Session, Speaker } from '../typescript/conference-types';
import { programData } from './program';
import { speakersData } from './speakers';

// Room mapping for display
const roomNames: Record<string, string> = {
  blt001main: 'Main Stage',
  blt002track: 'Track 2',
};

const SessionDetailPage: React.FC = () => {
  const { sessionId } = useParams<{ sessionId: string }>();
  const [session, setSession] = useState<Session | null>(null);
  const [relatedSessions, setRelatedSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch session data from SDK
  useEffect(() => {
    const fetchSessionData = async () => {
      if (!sessionId) {
        setLoading(false);
        return;
      }

      try {
        const sessionIdNum = Number.parseInt(sessionId, 10);

        // Fetch session by ID
        const sessionData = await getSessionByIdRes(sessionIdNum);
        console.log('sessionData', sessionData);
        if (sessionData) {
          // Calculate day_id from session_time
          let dayId = '/day-1';
          if (sessionData.session_time?.start_time) {
            const sessionDate = new Date(sessionData.session_time.start_time);
            const sessionMonthDay = sessionDate.toISOString().slice(5, 10);

            for (const day of programData) {
              if (day.section_time?.start_time) {
                const sectionDate = new Date(day.section_time.start_time);
                const sectionMonthDay = sectionDate.toISOString().slice(5, 10);
                if (sessionMonthDay === sectionMonthDay) {
                  dayId = day.url;
                  break;
                }
              }
            }
          }

          const mappedSession: Session = {
            description: sessionData.description || '',
            is_popular: sessionData.is_popular || false,
            locale: sessionData.locale || 'en-us',
            room: sessionData.room || [],
            session_id: sessionData.session_id || sessionIdNum,
            session_time: sessionData.session_time || {
              end_time: '',
              start_time: '',
            },
            speakers: sessionData.speakers || [],
            title: sessionData.title || '',
            type: sessionData.type || 'Session',
            day_id: dayId,
          };

          setSession(mappedSession);

          // Fetch related sessions
          const allSessions = await getSessionRes();
          if (allSessions && allSessions.length > 0) {
            const related = allSessions
              .filter(
                (s: any) =>
                  s.session_id !== sessionIdNum &&
                  (s.type === mappedSession.type ||
                    s.session_time?.start_time?.slice(5, 10) ===
                      sessionMonthDay(mappedSession))
              )
              .slice(0, 3)
              .map((s: any) => ({
                description: s.description || '',
                is_popular: s.is_popular || false,
                locale: s.locale || 'en-us',
                room: s.room || [],
                session_id: s.session_id,
                session_time: s.session_time || {
                  end_time: '',
                  start_time: '',
                },
                speakers: s.speakers || [],
                title: s.title || '',
                type: s.type || 'Session',
                day_id: calculateDayId(s),
              }));
            setRelatedSessions(related);
          }
        }
      } catch (error) {
        console.error('Failed to fetch session:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSessionData();
  }, [sessionId]);

  // Helper to get month-day from session
  const sessionMonthDay = (sess: Session): string => {
    if (sess.session_time?.start_time) {
      return new Date(sess.session_time.start_time).toISOString().slice(5, 10);
    }
    return '';
  };

  // Helper to calculate day_id
  const calculateDayId = (sess: any): string => {
    let dayId = '/day-1';
    if (sess.session_time?.start_time) {
      const sessionDate = new Date(sess.session_time.start_time);
      const sessMonthDay = sessionDate.toISOString().slice(5, 10);
      for (const day of programData) {
        if (day.section_time?.start_time) {
          const sectionDate = new Date(day.section_time.start_time);
          const sectionMonthDay = sectionDate.toISOString().slice(5, 10);
          if (sessMonthDay === sectionMonthDay) {
            dayId = day.url;
            break;
          }
        }
      }
    }
    return dayId;
  };

  // Loading state
  if (loading) {
    return (
      <div className="conference">
        <ConferenceHeader />
        <div className="loading-state">
          <p>Loading session...</p>
        </div>
        <ConferenceFooter />
      </div>
    );
  }

  // If session not found, redirect to program page
  if (!session) {
    return <Navigate to="/program" replace />;
  }

  // Get day information
  const day = programData.find((d) => d.url === session.day_id);

  // Get speakers for this session
  const sessionSpeakers: Speaker[] = session.speakers
    .map((speakerRef) => {
      // If it's already a Speaker object (with full data from SDK)
      if ('full_name' in speakerRef) {
        return speakerRef as Speaker;
      }
      // If it's a reference, try to match from speakersData
      if ('uid' in speakerRef) {
        // Extract speaker index from UID (e.g., "blt001speaker" -> 0)
        const match = (speakerRef.uid as string).match(/blt(\d+)speaker/);
        if (match) {
          const index = Number.parseInt(match[1], 10) - 1;
          return speakersData[index];
        }
      }
      return null;
    })
    .filter((s): s is Speaker => s !== null && s !== undefined);

  // Get room name
  const roomName =
    session.room.length > 0
      ? roomNames[session.room[0].uid] || 'Conference Room'
      : 'TBA';

  // Format date for display
  const formatDate = (isoString: string): string => {
    const date = new Date(isoString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="conference">
      <ConferenceHeader />

      {/* Breadcrumb */}
      <div className="breadcrumb-section">
        <div className="breadcrumb-container">
          <Link to="/">Home</Link>
          <span className="breadcrumb-separator">/</span>
          <Link to="/program">Program</Link>
          <span className="breadcrumb-separator">/</span>
          <span className="breadcrumb-current">{session.title}</span>
        </div>
      </div>

      {/* Session Detail Section */}
      <section className="session-detail-section">
        <div className="session-detail-container">
          {/* Session Header */}
          <div className="session-detail-header">
            <div className="session-detail-meta">
              <span className="session-type-badge">{session.type}</span>
              {session.is_popular && (
                <span className="session-popular-badge">🔥 Popular</span>
              )}
            </div>
            <h1>{session.title}</h1>
            <div className="session-detail-info">
              <div className="session-info-item">
                <span className="info-icon">📅</span>
                <span>
                  {day?.name || formatDate(session.session_time.start_time)}
                </span>
              </div>
              <div className="session-info-item">
                <span className="info-icon">🕐</span>
                <span>
                  {formatTime(session.session_time.start_time)} -{' '}
                  {formatTime(session.session_time.end_time)}
                </span>
              </div>
              <div className="session-info-item">
                <span className="info-icon">📍</span>
                <span>{roomName}</span>
              </div>
            </div>
            <div className="session-detail-actions">
              <a href="#tickets" className="btn-primary">
                Get Tickets
              </a>
              <a href="#calendar" className="btn-secondary">
                Add to Calendar
              </a>
            </div>
          </div>

          {/* Session Content */}
          <div className="session-detail-content">
            {/* Description */}
            <div className="session-description-section">
              <h2>About This Session</h2>
              <p
                className="session-description-text"
                dangerouslySetInnerHTML={{ __html: session.description }}
              />
              <p className="session-description-text">
                Join us for this {session.type.toLowerCase()} where industry
                experts will share insights and practical knowledge that you can
                apply immediately to your projects.
              </p>
            </div>

            {/* Speakers */}
            {sessionSpeakers.length > 0 && (
              <div className="session-speakers-section">
                <h2>
                  Speaker{sessionSpeakers.length > 1 ? 's' : ''} (
                  {sessionSpeakers.length})
                </h2>
                <div className="session-speakers-grid">
                  {sessionSpeakers.map((speaker) => (
                    <SpeakerCard
                      key={speaker.url}
                      speaker={speaker}
                      variant="list"
                    />
                  ))}
                </div>
              </div>
            )}

            {/* What You'll Learn */}
            <div className="session-learn-section">
              <h2>What You&apos;ll Learn</h2>
              <ul className="session-learn-list">
                <li>
                  <span className="learn-icon">✓</span>
                  Latest trends and best practices in JavaScript development
                </li>
                <li>
                  <span className="learn-icon">✓</span>
                  Practical techniques you can apply to your projects
                </li>
                <li>
                  <span className="learn-icon">✓</span>
                  Insights from industry experts and framework creators
                </li>
                <li>
                  <span className="learn-icon">✓</span>
                  Q&A opportunity with the speakers
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Related Sessions */}
      {relatedSessions.length > 0 && (
        <section className="related-sessions-section">
          <div className="related-sessions-container">
            <h2>Related Sessions</h2>
            <div className="program-list">
              {relatedSessions.map((relatedSession, index) => (
                <SessionCard
                  key={relatedSession.session_id}
                  session={relatedSession}
                  animationDelay={index * 0.1}
                  dayName={getDayName(relatedSession.day_id, programData)}
                  action={{
                    label: 'View Details',
                    href: `/session/${relatedSession.session_id}`,
                  }}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      <CTASection
        title="Don't Miss This Session!"
        description="Secure your spot at the Conference and attend this session live."
        buttons={[
          { label: 'Get Tickets', href: '#tickets', variant: 'primary' },
          {
            label: 'Back to Program',
            href: '/program',
            variant: 'secondary',
          },
        ]}
      />

      <ConferenceFooter />
    </div>
  );
};

export default SessionDetailPage;
