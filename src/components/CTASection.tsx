import React from 'react';
import { Link } from 'react-router-dom';

interface CTAButton {
  label: string;
  href: string;
  variant: 'primary' | 'secondary';
  isExternal?: boolean;
  hasArrow?: boolean;
}

interface CTASectionProps {
  title: string;
  description: string;
  buttons: CTAButton[];
}

const ArrowIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

const CTASection: React.FC<CTASectionProps> = ({
  title,
  description,
  buttons,
}) => {
  const renderButton = (button: CTAButton, index: number) => {
    const className = `btn-${button.variant} btn-large`;
    const content = button.hasArrow ? (
      <>
        <span>{button.label}</span>
        <ArrowIcon />
      </>
    ) : (
      button.label
    );

    if (button.isExternal || button.href.startsWith('#')) {
      return (
        <a key={index} href={button.href} className={className}>
          {content}
        </a>
      );
    }

    return (
      <Link key={index} to={button.href} className={className}>
        {content}
      </Link>
    );
  };

  return (
    <section className="conference-cta">
      <div className="cta-content">
        <h2>{title}</h2>
        <p>{description}</p>
        <div className="cta-buttons">{buttons.map(renderButton)}</div>
      </div>
    </section>
  );
};

export default CTASection;
