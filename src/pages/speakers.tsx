import React, { useEffect, useState } from 'react';
import {
  ConferenceFooter,
  ConferenceHeader,
  CTASection,
  PageHero,
  SpeakerCard,
} from '../components';
import { getSpeakersRes } from '../helper';
import '../styles/conference.css';
import { Speaker } from '../typescript/conference-types';

// Fallback speakers data
const fallbackSpeakersData: Speaker[] = [
  {
    title: 'Jesse St. Laurent',
    url: '/jesse-st-laurent',
    full_name: 'Jesse St. Laurent',
    tags: [],
    is_featured: false,
    profile_image: {
      filename: 'images_(3).jpg',
      url: 'https://images.contentstack.io/v3/assets/bltc94709340b84bdd2/bltc083b7fc98b5e2f1/5e90081cf65d6442b751ea74/images_(3).jpg',
    },
    bio: 'A passionate JavaScript developer with expertise in modern web technologies.',
  },
  {
    title: 'Creator of Node.js',
    url: '/ryan-dahl',
    full_name: 'Ryan Dahl',
    tags: ['nodejs', 'deno'],
    is_featured: true,
    profile_image: {
      filename: 'ryan-dahl.jpg',
      url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face',
    },
    bio: 'Creator of the Node.js JavaScript runtime as well as the Deno JavaScript/TypeScript runtime.',
  },
];

// Store for speakers data that can be updated from CMS
let _speakersData: Speaker[] = fallbackSpeakersData;

// Export speakersData for other components
export const speakersData = fallbackSpeakersData;

// Function to get current speakers data
export const getSpeakersData = (): Speaker[] => _speakersData;

const SpeakersPage: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'featured'>('all');
  const [speakers, setSpeakers] = useState<Speaker[]>(fallbackSpeakersData);
  const [loading, setLoading] = useState(true);

  // Fetch speakers from SDK
  useEffect(() => {
    const fetchSpeakers = async () => {
      try {
        const speakersDataFromCMS = await getSpeakersRes();

        if (speakersDataFromCMS && speakersDataFromCMS.length > 0) {
          const mappedSpeakers: Speaker[] = speakersDataFromCMS.map(
            (speaker: any) => ({
              title: speaker.title || '',
              url: speaker.url || '',
              full_name: speaker.full_name || speaker.title || '',
              tags: speaker.tags || [],
              is_featured: speaker.is_featured || false,
              profile_image: speaker.profile_image || { url: '', filename: '' },
              bio: speaker.bio || '',
            })
          );
          setSpeakers(mappedSpeakers);
          _speakersData = mappedSpeakers;
        }
      } catch (error) {
        console.error('Failed to fetch speakers:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSpeakers();
  }, []);

  const filteredSpeakers =
    filter === 'featured' ? speakers.filter((s) => s.is_featured) : speakers;

  return (
    <div className="conference">
      <ConferenceHeader />

      <PageHero
        title="Speakers"
        description="Meet the industry leaders, framework creators, and JavaScript experts who will be sharing their knowledge at the Conference."
      />

      {/* Speakers List Section */}
      <section className="speakers-list-section">
        <div className="speakers-list-container">
          {loading ? (
            <div className="loading-state">
              <p>Loading speakers...</p>
            </div>
          ) : (
            <>
              {/* Filter Tabs */}
              <div className="filter-tabs">
                <button
                  className={`filter-tab ${filter === 'all' ? 'active' : ''}`}
                  onClick={() => setFilter('all')}
                >
                  All Speakers ({speakers.length})
                </button>
                <button
                  className={`filter-tab ${
                    filter === 'featured' ? 'active' : ''
                  }`}
                  onClick={() => setFilter('featured')}
                >
                  Featured ({speakers.filter((s) => s.is_featured).length})
                </button>
              </div>

              {/* Speakers Grid */}
              <div className="speakers-list-grid">
                {filteredSpeakers.map((speaker, index) => (
                  <SpeakerCard
                    key={speaker.url}
                    speaker={speaker}
                    variant="list"
                    animationDelay={index * 0.05}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      <CTASection
        title="Want to Speak at the Conference?"
        description="Share your knowledge and experience with 2,000+ JavaScript enthusiasts."
        buttons={[
          { label: 'Submit a Talk', href: '#cfp', variant: 'primary' },
          {
            label: 'View Program',
            href: '/program',
            variant: 'secondary',
          },
        ]}
      />

      <ConferenceFooter />
    </div>
  );
};

export default SpeakersPage;
