import React, { useEffect, useState } from 'react';
import { ConferenceFooter, ConferenceHeader, SpeakerCard } from '../components';
import { getSpeakersRes } from '../helper';
import '../styles/conference.css';
import {
  Conference,
  Feature,
  Speaker,
  Sponsor,
} from '../typescript/conference-types';

const conferenceData: Conference = {
  title: 'Conference 2026',
  timezone: 'US',
  description:
    '<div class="stylizedpageheader section" style="box-sizing: border-box; transition: all 0.5s ease 0s; margin-bottom: 0px; color: rgb(245, 239, 239); font-family: proxima_novalight; background-color: rgb(255, 255, 255);"><div class="stylized-header section-custom" style="box-sizing: border-box; transition: all 0.5s ease 0s; margin-top: 25px; margin-bottom: 0px; width: 1280px; display: inline-block;"><div class="container-fluid " style="box-sizing: border-box; transition: all 0.5s ease 0s; margin-right: auto; margin-bottom: 0px; margin-left: auto; max-width: 100%; padding-right: 25px !important; padding-left: 25px !important;"><div class="row" style="box-sizing: border-box; transition: all 0.5s ease 0s; margin-bottom: 0px;"><div class="col-md-12" style="box-sizing: border-box; transition: all 0.5s ease 0s; margin-bottom: 0px; padding-right: 0px; padding-left: 0px; width: 1230px;"><h1 style="box-sizing: border-box; transition: all 0.5s ease 0s; margin-bottom: 0px; font-size: 25px; font-family: proxima_novaregular; font-weight: 500; line-height: 1.1; color: rgb(242, 234, 234);">Learn More About Conference 2018</h1><p style="box-sizing: border-box; transition: all 0.5s ease 0s; margin-top: 10px; margin-bottom: 0px; font-family: proxima_novaregular; color: rgb(86, 86, 86); font-size: 18px; line-height: normal; text-align: justify;">Conference 2018 US brings you five days of innovation to accelerate your journey to a software-defined business—from mobile devices to the data center and the cloud.&nbsp; Explore Conference&nbsp;2018.</p></div></div></div></div></div>\n<div class="paragraphText parbase section" style="box-sizing: border-box; transition: all 0.5s ease 0s; margin-bottom: 0px; font-size: 0px; color: rgb(51, 51, 51); font-family: proxima_novalight; background-color: rgb(255, 255, 255); text-align: justify;"><div class="section-custom " style="box-sizing: border-box; transition: all 0.5s ease 0s; margin-top: 25px; margin-bottom: 25px; width: 1280px; display: inline-block; text-align: justify;"><div class="container-fluid" style="box-sizing: border-box; transition: all 0.5s ease 0s; margin-right: auto; margin-bottom: 0px; margin-left: auto; max-width: 100%; padding-right: 25px !important; padding-left: 25px !important; text-align: justify;"><div class="row" style="box-sizing: border-box; transition: all 0.5s ease 0s; margin-bottom: 0px; text-align: justify;"><div class="col-md-12" style="box-sizing: border-box; transition: all 0.5s ease 0s; margin-bottom: 0px; padding-right: 0px; padding-left: 0px; width: 1230px; text-align: justify;"><p style="box-sizing: border-box; transition: all 0.5s ease 0s; margin-bottom: 0px; font-family: proxima_novaregular; color: rgb(86, 86, 86); font-size: 18px; line-height: normal; text-align: justify;">Technology-driven innovation&nbsp;is disrupting every market and industry. And it\'s being created by people like you. You unlock value from today\'s technologies while anticipating a rapidly approaching technological future. That\'s why we created an event with you and your peers in mind. At Conference&nbsp;2018,&nbsp;&nbsp;premier digital infrastructure event, you can find what you need to launch the digital transformation that relies on you.</p><p style="box-sizing: border-box; transition: all 0.5s ease 0s; margin-bottom: 0px; font-family: proxima_novaregular; color: rgb(86, 86, 86); font-size: 18px; line-height: normal; text-align: justify;">No matter what path you\'re on, you\'ll discover the technology, learn the trends, and meet the people that are shaping the future of digital business and taking IT to the next level. Welcome to a world where it all begins with you. Welcome to Conference&nbsp;2018.</p></div></div></div></div></div>',
  conferecne_images: [
    {
      url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1920&q=80',
      filename: 'conference-main.jpg',
    },
    {
      url: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=1920&q=80',
      filename: 'conference-stage.jpg',
    },
  ],
  conference_links: [
    { href: '#tickets', title: 'Get Tickets' },
    { href: '#sponsors', title: 'Become a Sponsor' },
  ],
  conference_event: {
    end_time: '2018-08-30T14:30:00.000Z',
    start_time: '2018-08-26T01:30:00.000Z',
  },
};

// Fallback speakers data
const fallbackSpeakers: Speaker[] = [
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
  },
  {
    title: 'Creator of Vue & Vite',
    url: '/evan-you',
    full_name: 'Evan You',
    tags: ['vue', 'vite'],
    is_featured: true,
    profile_image: {
      filename: 'evan-you.jpg',
      url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face',
    },
  },
  {
    title: 'Founding Engineer @ Astro',
    url: '/ben-holmes',
    full_name: 'Ben Holmes',
    tags: ['astro', 'frontend'],
    is_featured: false,
    profile_image: {
      filename: 'ben-holmes.jpg',
      url: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&h=300&fit=crop&crop=face',
    },
  },
  {
    title: 'Creator of SolidJS',
    url: '/ryan-carniato',
    full_name: 'Ryan Carniato',
    tags: ['solidjs', 'signals'],
    is_featured: true,
    profile_image: {
      filename: 'ryan-carniato.jpg',
      url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop&crop=face',
    },
  },
  {
    title: 'Senior Director of Engineering @ Google',
    url: '/sarah-drasner',
    full_name: 'Sarah Drasner',
    tags: ['vue', 'google', 'animations'],
    is_featured: true,
    profile_image: {
      filename: 'sarah-drasner.jpg',
      url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&fit=crop&crop=face',
    },
  },
  {
    title: 'Angular Core Team @ Google',
    url: '/minko-gechev',
    full_name: 'Minko Gechev',
    tags: ['angular', 'google'],
    is_featured: false,
    profile_image: {
      filename: 'minko-gechev.jpg',
      url: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&h=300&fit=crop&crop=face',
    },
  },
  {
    title: 'Creator of Nuxt.js',
    url: '/sebastien-chopin',
    full_name: 'Sebastien Chopin',
    tags: ['nuxt', 'vue'],
    is_featured: true,
    profile_image: {
      filename: 'sebastien-chopin.jpg',
      url: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&h=300&fit=crop&crop=face',
    },
  },
  {
    title: 'Co-Founder @ GitHub',
    url: '/scott-chacon',
    full_name: 'Scott Chacon',
    tags: ['github', 'git'],
    is_featured: true,
    profile_image: {
      filename: 'scott-chacon.jpg',
      url: 'https://images.unsplash.com/photo-1463453091185-61582044d556?w=300&h=300&fit=crop&crop=face',
    },
  },
];

const sponsors: Sponsor[] = [
  {
    area_focus: 'CMS',
    bio: 'Contentstack is a headless content management system that provides REST APIs to deliver content to any channel.',
    booth_number: 1234,
    display_image: {
      url: 'https://images.contentstack.io/v3/assets/bltc94709340b84bdd2/blt0e7077211f2c53dc/5e9007f416db9607e2b7e0d8/Integrate-with-bg.png',
    },
    link: {
      href: 'http://contentstack.com',
      title: 'Website',
    },
    locale: 'en-us',
    logo: {
      url: 'https://images.contentstack.io/v3/assets/bltc94709340b84bdd2/blt8fbd68b8ef53ae63/5e90081e60e26d07e9178f48/contentstack.png',
    },
    participation: '',
    sort_order: 1,
    title: 'Contentstack',
  },
  {
    area_focus: 'Jobs',
    bio: 'VueJobs is the official job board for Vue.js developers.',
    booth_number: 1001,
    display_image: {
      url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400',
    },
    link: {
      href: 'https://vuejobs.com',
      title: 'Website',
    },
    locale: 'en-us',
    logo: {
      url: 'https://vuejobs.com/img/logo.svg',
    },
    participation: 'Gold',
    sort_order: 2,
    title: 'VueJobs',
  },
  {
    area_focus: 'CMS',
    bio: 'Storyblok is a headless CMS with a visual editor for developers and marketers.',
    booth_number: 1002,
    display_image: {
      url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400',
    },
    link: {
      href: 'https://storyblok.com',
      title: 'Website',
    },
    locale: 'en-us',
    logo: {
      url: 'https://a.storyblok.com/f/88751/x/5e3c4d3e1c/storyblok-logo.svg',
    },
    participation: 'Platinum',
    sort_order: 3,
    title: 'Storyblok',
  },
  {
    area_focus: 'Education',
    bio: 'Vue Mastery is the ultimate learning resource for Vue.js developers.',
    booth_number: 1003,
    display_image: {
      url: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400',
    },
    link: {
      href: 'https://vuemastery.com',
      title: 'Website',
    },
    locale: 'en-us',
    logo: {
      url: 'https://firebasestorage.googleapis.com/v0/b/vue-mastery.appspot.com/o/flamelink%2Fmedia%2Fvue-mastery-logo.png',
    },
    participation: 'Gold',
    sort_order: 4,
    title: 'Vue Mastery',
  },
  {
    area_focus: 'Framework',
    bio: 'Nuxt Labs is the company behind Nuxt.js, the intuitive Vue framework.',
    booth_number: 1004,
    display_image: {
      url: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400',
    },
    link: {
      href: 'https://nuxt.com',
      title: 'Website',
    },
    locale: 'en-us',
    logo: {
      url: 'https://nuxt.com/assets/design-kit/logo/icon-green.svg',
    },
    participation: 'Platinum',
    sort_order: 5,
    title: 'Nuxt Labs',
  },
  {
    area_focus: 'Monitoring',
    bio: 'Sentry is application monitoring software that helps developers find and fix crashes in real time.',
    booth_number: 1005,
    display_image: {
      url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400',
    },
    link: {
      href: 'https://sentry.io',
      title: 'Website',
    },
    locale: 'en-us',
    logo: {
      url: 'https://sentry-brand.storage.googleapis.com/sentry-logo-black.svg',
    },
    participation: 'Gold',
    sort_order: 6,
    title: 'Sentry',
  },
  {
    area_focus: 'Infrastructure',
    bio: 'Cloudflare provides content delivery network services, DDoS mitigation, and distributed DNS.',
    booth_number: 1006,
    display_image: {
      url: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400',
    },
    link: {
      href: 'https://cloudflare.com',
      title: 'Website',
    },
    locale: 'en-us',
    logo: {
      url: 'https://www.cloudflare.com/img/logo-cloudflare.svg',
    },
    participation: 'Platinum',
    sort_order: 7,
    title: 'Cloudflare',
  },
  {
    area_focus: 'Components',
    bio: 'Bryntum provides high-performance JavaScript UI components for scheduling and project management.',
    booth_number: 1007,
    display_image: {
      url: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=400',
    },
    link: {
      href: 'https://bryntum.com',
      title: 'Website',
    },
    locale: 'en-us',
    logo: {
      url: 'https://bryntum.com/wp-content/uploads/2020/05/bryntum-logo.svg',
    },
    participation: 'Silver',
    sort_order: 8,
    title: 'Bryntum',
  },
  {
    area_focus: 'Education',
    bio: 'Vue School offers premium tutorials and courses for Vue.js developers.',
    booth_number: 1008,
    display_image: {
      url: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=400',
    },
    link: {
      href: 'https://vueschool.io',
      title: 'Website',
    },
    locale: 'en-us',
    logo: {
      url: 'https://vueschool.io/images/logo/vueschool_logo_multicolor.svg',
    },
    participation: 'Gold',
    sort_order: 9,
    title: 'VueSchool',
  },
  {
    area_focus: 'Components',
    bio: 'Progress provides developer tools including Kendo UI components for modern web apps.',
    booth_number: 1009,
    display_image: {
      url: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400',
    },
    link: {
      href: 'https://progress.com',
      title: 'Website',
    },
    locale: 'en-us',
    logo: {
      url: 'https://www.progress.com/content/dam/progress/images/logos/progress-logo.svg',
    },
    participation: 'Silver',
    sort_order: 10,
    title: 'Progress',
  },
];

const features: Feature[] = [
  {
    icon: '⚔️',
    title: 'JavaScript & TypeScript Battle',
    description:
      "Imagine 100's of contestants, numerous battles. Secure your app, attack other players' apps to score. Win the Meter Tall Trophy!",
  },
  {
    icon: '🎤',
    title: 'Key Updates from Authors',
    description:
      'Framework and Tech Creators, Authors & Maintainers update the world on the latest in JavaScript from Deno, Vue, Vite, Angular, and more!',
  },
  {
    icon: '🌍',
    title: 'Largest JS Gathering',
    description:
      '2,000 JavaScript Enthusiasts gather for 2 full days of education, networking, and team bonding with industry peers.',
  },
];

// Helper function to format conference event dates
const formatEventDate = (startTime: string, endTime: string) => {
  const startDate = new Date(startTime);
  const endDate = new Date(endTime);

  const startDay = startDate.getDate();
  const endDay = endDate.getDate();
  const month = startDate.toLocaleString('en-US', { month: 'short' });
  const year = startDate.getFullYear();

  return {
    dateRange: `${startDay}-${endDay} ${month}`,
    year: year.toString(),
  };
};

const ConferencePage: React.FC = () => {
  const [speakers, setSpeakers] = useState<Speaker[]>(
    fallbackSpeakers.slice(0, 9)
  );

  const eventDate = formatEventDate(
    conferenceData.conference_event.start_time,
    conferenceData.conference_event.end_time
  );

  // Fetch speakers from SDK (limit 9)
  useEffect(() => {
    const fetchSpeakers = async () => {
      try {
        const speakersData = await getSpeakersRes();

        if (speakersData && speakersData.length > 0) {
          const mappedSpeakers: Speaker[] = speakersData
            .slice(0, 9) // Limit to 9 speakers
            .map((speaker: any) => ({
              title: speaker.title || '',
              url: speaker.url || '',
              full_name: speaker.full_name || speaker.title || '',
              tags: speaker.tags || [],
              is_featured: speaker.is_featured || false,
              profile_image: speaker.profile_image || { url: '', filename: '' },
              bio: speaker.bio || '',
            }));
          setSpeakers(mappedSpeakers);
        }
      } catch (error) {
        console.error('Failed to fetch speakers:', error);
      }
    };

    fetchSpeakers();
  }, []);

  return (
    <div className="conference">
      {/* Animated Background */}
      <div className="conference-bg-pattern"></div>

      <ConferenceHeader />

      {/* Hero Section */}
      <section
        className="conference-hero"
        style={{
          backgroundImage: conferenceData.conferecne_images[0]
            ? `url(${conferenceData.conferecne_images[0].url})`
            : undefined,
        }}
      >
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1 className="hero-title">
            <span className="title-purple">{conferenceData.title}</span>
          </h1>

          <div className="hero-stats">
            <div className="stat">
              <span className="stat-text">2000+</span>
              <span className="stat-text">Enthusiasts</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat">
              <span className="stat-text">{conferenceData.timezone}</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat">
              <span className="stat-text">{eventDate.dateRange}</span>
              <span className="stat-text">{eventDate.year}</span>
            </div>
          </div>

          <div className="hero-cta">
            {conferenceData.conference_links.map((link, index) => (
              <a
                key={link.href}
                href={link.href}
                className={index === 0 ? 'btn-tickets' : 'btn-sponsor'}
              >
                {link.title.toUpperCase()}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="conference-features">
        <div className="features-grid">
          {features.map((feature) => (
            <div key={feature.title} className="feature-card">
              <div className="feature-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Speakers Section */}
      <section id="speakers" className="conference-speakers">
        <div className="section-header">
          <span className="section-tag">Meet The Experts</span>
          <h2>Previous Educators</h2>
          <p>
            Learn from the creators and maintainers of your favorite frameworks
          </p>
        </div>

        <div className="speakers-grid">
          {speakers.map((speaker, index) => (
            <SpeakerCard
              key={speaker.url}
              speaker={speaker}
              variant="default"
              animationDelay={index * 0.1}
            />
          ))}
        </div>

        <div className="speakers-cta">
          <a href="/speakers" className="btn-outline">
            View All Speakers
          </a>
        </div>
      </section>

      {/* Sponsors Section */}
      <section id="sponsors" className="conference-sponsors">
        <div className="section-header">
          <span className="section-tag">Our Partners</span>
          <h2>{"Last Year's Sponsors"}</h2>
        </div>

        <div className="sponsors-marquee">
          <div className="marquee-content">
            {[...sponsors, ...sponsors].map((sponsor, index) => (
              <a
                key={`${sponsor.title}-${index}`}
                href={sponsor.link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="sponsor-item"
              >
                <img
                  src={sponsor.logo.url}
                  alt={sponsor.title}
                  className="sponsor-logo"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.nextElementSibling?.classList.add('show');
                  }}
                />
                <span className="sponsor-name">{sponsor.title}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <ConferenceFooter />
    </div>
  );
};

export default ConferencePage;
