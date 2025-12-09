import React, { useEffect, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import {
  ConferenceFooter,
  ConferenceHeader,
  CTASection,
  SessionCard,
  SpeakerCard,
} from '../components';
import {
  getDayName,
  getDefaultSpeakerImage,
  getSessionsBySpeakerUidRes,
  getSpeakerByUrlRes,
  getSpeakersRes,
} from '../helper';
import '../styles/conference.css';
import { Session, Speaker } from '../typescript/conference-types';
import { programData } from './program';

const SpeakerDetailPage: React.FC = () => {
  const { url } = useParams<{ url: string }>();
  const [speaker, setSpeaker] = useState<Speaker | null>(null);
  const [speakerSessions, setSpeakerSessions] = useState<Session[]>([]);
  const [relatedSpeakers, setRelatedSpeakers] = useState<Speaker[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch speaker and sessions from SDK
  useEffect(() => {
    const fetchSpeakerData = async () => {
      if (!url) {
        setLoading(false);
        return;
      }

      try {
        // Fetch speaker by URL
        const speakerData = await getSpeakerByUrlRes(`/${url}`);

        if (speakerData) {
          const mappedSpeaker: Speaker = {
            title: speakerData.title || '',
            url: speakerData.url || '',
            full_name: speakerData.full_name || speakerData.title || '',
            tags: speakerData.tags || [],
            is_featured: speakerData.is_featured || false,
            profile_image: speakerData.profile_image || {
              url: '',
              filename: '',
            },
            bio: speakerData.bio || '',
          };
          setSpeaker(mappedSpeaker);

          // Fetch sessions for this speaker using speaker UID
          if (speakerData.uid) {
            const sessionsData = await getSessionsBySpeakerUidRes(
              speakerData.uid
            );

            if (sessionsData && sessionsData.length > 0) {
              const mappedSessions: Session[] = sessionsData.map(
                (session: any, index: number) => {
                  // Calculate day_id from session_time
                  let dayId = '/day-1';
                  if (session.session_time?.start_time) {
                    const sessionDate = new Date(
                      session.session_time.start_time
                    );
                    const sessionMonthDay = sessionDate
                      .toISOString()
                      .slice(5, 10);
                    for (const day of programData) {
                      if (day.section_time?.start_time) {
                        const sectionDate = new Date(
                          day.section_time.start_time
                        );
                        const sectionMonthDay = sectionDate
                          .toISOString()
                          .slice(5, 10);
                        if (sessionMonthDay === sectionMonthDay) {
                          dayId = day.url;
                          break;
                        }
                      }
                    }
                  }

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

              // Sort by start_time
              mappedSessions.sort((a, b) => {
                const timeA = new Date(a.session_time.start_time).getTime();
                const timeB = new Date(b.session_time.start_time).getTime();
                return timeA - timeB;
              });

              setSpeakerSessions(mappedSessions);
            }
          }

          // Fetch related speakers
          const allSpeakers = await getSpeakersRes();
          if (allSpeakers && allSpeakers.length > 0) {
            const related = allSpeakers
              .filter(
                (s: any) =>
                  s.url !== mappedSpeaker.url &&
                  ((s.tags || []).some((tag: string) =>
                    mappedSpeaker.tags.includes(tag)
                  ) ||
                    s.is_featured)
              )
              .slice(0, 4)
              .map((s: any) => ({
                title: s.title || '',
                url: s.url || '',
                full_name: s.full_name || s.title || '',
                tags: s.tags || [],
                is_featured: s.is_featured || false,
                profile_image: s.profile_image || { url: '', filename: '' },
                bio: s.bio || '',
              }));
            setRelatedSpeakers(related);
          }
        }
      } catch (error) {
        console.error('Failed to fetch speaker data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSpeakerData();
  }, [url]);

  // Loading state
  if (loading) {
    return (
      <div className="conference">
        <ConferenceHeader />
        <div className="loading-state">
          <p>Loading speaker...</p>
        </div>
        <ConferenceFooter />
      </div>
    );
  }

  // If speaker not found, redirect to speakers list
  if (!speaker) {
    return <Navigate to="/speakers" replace />;
  }

  return (
    <div className="conference">
      <ConferenceHeader />

      {/* Breadcrumb */}
      <div className="breadcrumb-section">
        <div className="breadcrumb-container">
          <Link to="/">Home</Link>
          <span className="breadcrumb-separator">/</span>
          <Link to="/speakers">Speakers</Link>
          <span className="breadcrumb-separator">/</span>
          <span className="breadcrumb-current">{speaker.full_name}</span>
        </div>
      </div>

      {/* Speaker Detail Section */}
      <section className="speaker-detail-section">
        <div className="speaker-detail-container">
          <div className="speaker-detail-header">
            <div className="speaker-detail-image">
              <img
                src={
                  speaker.profile_image?.url ||
                  getDefaultSpeakerImage(speaker.full_name)
                }
                alt={speaker.full_name}
                onError={(e) => {
                  e.currentTarget.src = getDefaultSpeakerImage(
                    speaker.full_name
                  );
                }}
              />
              {speaker.is_featured && (
                <span className="featured-badge-large">
                  ⭐ Featured Speaker
                </span>
              )}
            </div>
            <div className="speaker-detail-info">
              <h1>{speaker.full_name}</h1>
              <p className="speaker-detail-title">{speaker.title}</p>
              {speaker.tags.length > 0 && (
                <div className="speaker-detail-tags">
                  {speaker.tags.map((tag) => (
                    <span key={tag} className="speaker-detail-tag">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
              <div className="speaker-detail-actions">
                <a href="#sessions" className="btn-primary">
                  View Sessions
                </a>
                <a href="#twitter" className="btn-secondary">
                  Follow on Twitter
                </a>
              </div>
            </div>
          </div>

          <div className="speaker-detail-content">
            <div className="speaker-bio-section">
              <h2>About {speaker.full_name}</h2>
              <p className="speaker-bio-text">
                {speaker.bio ||
                  `${speaker.full_name} is a renowned expert in the JavaScript ecosystem. With years of experience in building and maintaining critical open-source projects, they have made significant contributions to the developer community.`}
              </p>
              <p className="speaker-bio-text">
                Join {speaker.full_name} at the Conference to learn from their
                expertise and gain insights into the latest trends in JavaScript
                development.
              </p>
            </div>

            <div className="speaker-sessions-section" id="sessions">
              <h2>Sessions ({speakerSessions.length})</h2>
              {speakerSessions.length > 0 ? (
                <div className="program-list">
                  {speakerSessions.map((session, index) => (
                    <SessionCard
                      key={session.session_id}
                      session={session}
                      animationDelay={index * 0.1}
                      dayName={getDayName(session.day_id, programData)}
                      action={{
                        label: 'View Session',
                        href: `/session/${session.session_id}`,
                      }}
                    />
                  ))}
                </div>
              ) : (
                <p className="no-sessions">
                  Sessions for {speaker.full_name} will be announced soon.
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Related Speakers */}
      {relatedSpeakers.length > 0 && (
        <section className="related-speakers-section">
          <div className="related-speakers-container">
            <h2>Other Speakers You May Like</h2>
            <div className="related-speakers-grid">
              {relatedSpeakers.map((relatedSpeaker) => (
                <SpeakerCard
                  key={relatedSpeaker.url}
                  speaker={relatedSpeaker}
                  variant="related"
                />
              ))}
            </div>
          </div>
        </section>
      )}

      <CTASection
        title="Don't Miss Out!"
        description={`Get your ticket now and see ${speaker.full_name} live at the Conference.`}
        buttons={[
          { label: 'Get Tickets', href: '#tickets', variant: 'primary' },
          {
            label: 'View All Speakers',
            href: '/speakers',
            variant: 'secondary',
          },
        ]}
      />

      <ConferenceFooter />
    </div>
  );
};

export default SpeakerDetailPage;
