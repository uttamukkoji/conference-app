import React from 'react';
import { Link } from 'react-router-dom';
import { getDefaultSpeakerImage } from '../helper';
import { Speaker } from '../typescript/conference-types';

type SpeakerCardVariant = 'default' | 'list' | 'related';

interface SpeakerCardProps {
  speaker: Speaker;
  variant?: SpeakerCardVariant;
  animationDelay?: number;
}

const SpeakerCard: React.FC<SpeakerCardProps> = ({
  speaker,
  variant = 'default',
  animationDelay = 0,
}) => {
  const defaultImage = getDefaultSpeakerImage(speaker.full_name);

  if (variant === 'related') {
    return (
      <Link to={`/speakers${speaker.url}`} className="related-speaker-card">
        <img
          src={speaker.profile_image?.url || defaultImage}
          alt={speaker.full_name}
          onError={(e) => {
            e.currentTarget.src = defaultImage;
          }}
        />
        <h4>{speaker.full_name}</h4>
        <p>{speaker.title}</p>
      </Link>
    );
  }

  if (variant === 'list') {
    return (
      <Link
        to={`/speakers${speaker.url}`}
        className={`speaker-list-card ${speaker.is_featured ? 'featured' : ''}`}
        style={{ animationDelay: `${animationDelay}s` }}
      >
        <div className="speaker-list-image">
          <img
            src={speaker.profile_image?.url || defaultImage}
            alt={speaker.full_name}
            onError={(e) => {
              e.currentTarget.src = defaultImage;
            }}
          />
          {speaker.is_featured && (
            <span className="featured-badge">⭐ Featured</span>
          )}
        </div>
        <div className="speaker-list-info">
          <h3>{speaker.full_name}</h3>
          <p className="speaker-list-title">{speaker.title}</p>
          {speaker.tags.length > 0 && (
            <div className="speaker-list-tags">
              {speaker.tags.slice(0, 3).map((tag) => (
                <span key={tag} className="speaker-list-tag">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </Link>
    );
  }

  // Default variant (used on conference page)
  return (
    <div
      className={`speaker-card ${speaker.is_featured ? 'featured' : ''}`}
      style={{ animationDelay: `${animationDelay}s` }}
    >
      <div className="speaker-image-wrapper">
        <a href={`/speakers${speaker.url}`}>
          <img
            src={speaker.profile_image?.url || defaultImage}
            alt={speaker.full_name}
            className="speaker-image"
            onError={(e) => {
              e.currentTarget.src = defaultImage;
            }}
          />
          <div className="speaker-overlay">
            <span>View Profile</span>
          </div>
        </a>
      </div>
      <div className="speaker-info">
        <h4>{speaker.full_name}</h4>
        <p className="speaker-role">{speaker.title}</p>
        {speaker.tags.length > 0 && (
          <div className="speaker-tags">
            {speaker.tags.map((tag) => (
              <span key={tag} className="speaker-tag">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SpeakerCard;
