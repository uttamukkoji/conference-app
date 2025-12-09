import React from 'react';
import { Link } from 'react-router-dom';
import { Session } from '../typescript/conference-types';

// Helper function to format time from ISO string
export const formatTime = (isoString: string): string => {
  const date = new Date(isoString);
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
};

interface SessionCardAction {
  label: string;
  href?: string;
  onClick?: () => void;
}

interface SessionCardProps {
  session: Session;
  animationDelay?: number;
  dayName?: string; // Optional day badge (e.g., "7th May, 2026")
  action?: SessionCardAction;
}

const SessionCard: React.FC<SessionCardProps> = ({
  session,
  animationDelay = 0,
  dayName,
  action,
}) => {
  // Default action links to session detail page
  const defaultAction: SessionCardAction = {
    label: 'View Details',
    href: `/session/${session.session_id}`,
  };
  const cardAction = action || defaultAction;
  return (
    <div
      className={`program-item ${session.is_popular ? 'popular' : ''}`}
      style={{ animationDelay: `${animationDelay}s` }}
    >
      <div className="program-item-time">
        <span className="time">
          {formatTime(session.session_time.start_time)} -{' '}
          {formatTime(session.session_time.end_time)}
        </span>
        <span className="track">{session.type}</span>
        {dayName && <span className="day-badge">{dayName}</span>}
      </div>
      <div className="program-item-content">
        <h3>{session.title}</h3>
        <p dangerouslySetInnerHTML={{ __html: session.description }} />
        {session.is_popular && (
          <span className="popular-badge">🔥 Popular</span>
        )}
      </div>
      <div className="program-item-action">
        <span className="speakers-count">
          {session.speakers.length} Speaker
          {session.speakers.length > 1 ? 's' : ''}
        </span>
        {cardAction.href ? (
          <Link to={cardAction.href} className="btn-outline-sm">
            {cardAction.label}
          </Link>
        ) : (
          <button className="btn-outline-sm" onClick={cardAction.onClick}>
            {cardAction.label}
          </button>
        )}
      </div>
    </div>
  );
};

export default SessionCard;
