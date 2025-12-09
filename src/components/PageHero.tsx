import React from 'react';

interface PageHeroProps {
  tag?: string;
  title: string;
  description: string;
}

const PageHero: React.FC<PageHeroProps> = ({
  tag = 'Conference 2026',
  title,
  description,
}) => {
  return (
    <section className="program-hero">
      <div className="program-hero-content">
        <span className="section-tag">{tag}</span>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
    </section>
  );
};

export default PageHero;
