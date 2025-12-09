import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

interface NavLink {
  href: string;
  label: string;
  isExternal?: boolean;
  isHashLink?: boolean;
}

interface ConferenceHeaderProps {
  navLinks?: NavLink[];
  ctaLabel?: string;
  ctaHref?: string;
}

const defaultNavLinks: NavLink[] = [
  { href: '/speakers', label: 'Speakers' },
  { href: '/program', label: 'Program' },
  { href: '/#about', label: 'About', isHashLink: true },
  { href: '/#sponsors', label: 'Sponsors', isHashLink: true },
];

const ConferenceHeader: React.FC<ConferenceHeaderProps> = ({
  navLinks = defaultNavLinks,
  ctaLabel = 'Get Tickets',
  ctaHref = '#tickets',
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (href: string): boolean => {
    if (href.startsWith('/#')) return false;
    return location.pathname === href;
  };

  return (
    <header className="conference-header">
      <nav className="conference-nav">
        <Link to="/" className="conference-logo">
          <span className="logo-js">CS</span>
          <span className="logo-world">Conference</span>
        </Link>

        <button
          className="mobile-menu-btn"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <ul className={`conference-nav-links ${mobileMenuOpen ? 'open' : ''}`}>
          {navLinks.map((link) => (
            <li key={link.href}>
              {link.isExternal || link.isHashLink ? (
                <a
                  href={link.href}
                  className={isActive(link.href) ? 'active' : ''}
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  to={link.href}
                  className={isActive(link.href) ? 'active' : ''}
                >
                  {link.label}
                </Link>
              )}
            </li>
          ))}
          <li>
            <a href={ctaHref} className="nav-cta">
              {ctaLabel}
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default ConferenceHeader;
