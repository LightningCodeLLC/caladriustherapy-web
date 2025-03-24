import * as React from 'react';
import type { HeadFC, PageProps } from 'gatsby';
import { SEO } from '../components/SEO';
import Layout from '../components/Layout';
import { StaticImage } from 'gatsby-plugin-image';
import { Text, Button } from '@chakra-ui/react';
import teamMembers from '../../content/team';
const AboutPage: React.FC<PageProps> = () => {
  // set showbio to false for all members to start - it's a dict with team member id as the key
  const [showBio, setShowBio] = React.useState(
    teamMembers.reduce(
      (acc, curr) => ({ ...acc, [curr.id]: false }),
      {} as Record<(typeof teamMembers)[number]['id'], boolean>
    )
  );
  return (
    <>
      <Layout>
        <section className="wrapper style1 align-center">
          <div className="inner" style={{ padding: '6rem 2.5rem 2.5rem 2.5rem' }}>
            <h1>our team</h1>
          </div>
        </section>
        {teamMembers.map((member, index) => {
          return (
            <section
              className="spotlight style2 orient-right content-align-left image-position-center about-member-section"
              id={member.id}
            >
              <div className="content">
                <span>
                  <h2 style={{ display: 'inline' }}>
                    {member.name}
                    {member.letters && <>, {member.letters}</>}
                  </h2>
                </span>
                {member.title && <h4>{member.title}</h4>}
                <ul className="actions">
                  {member.email && (
                    <li>
                      <a
                        href={`mailto:${member.email}`}
                        className="button small solid icon fas fa-envelope"
                      >
                        Email
                      </a>
                    </li>
                  )}
                  {member.linkedin && (
                    <li>
                      <a
                        href={member.linkedin}
                        className="button small solid icon brands fas fa-linkedin"
                      >
                        LinkedIn
                      </a>
                    </li>
                  )}
                  {member.psychologytoday && (
                    <li>
                      <a
                        href={member.psychologytoday}
                        className="button small solid icon fas fa-external-link-alt"
                      >
                        PsychologyToday
                      </a>
                    </li>
                  )}
                  {member.instagram && (
                    <li>
                      <a
                        href={member.instagram}
                        className="button small solid icon brands fas fa-instagram"
                      >
                        Instagram
                      </a>
                    </li>
                  )}
                  {member.tiktok && (
                    <li>
                      <a
                        href={member.tiktok}
                        className="button small solid icon brands fas fa-tiktok"
                      >
                        TikTok
                      </a>
                    </li>
                  )}
                </ul>

                {member.badges && (
                  <div style={{ margin: '1rem 0' }}>
                    {member.badges.map((badge) => (
                      <img src={badge} alt={badge} style={{ height: '100px', margin: '0 0.5rem 0 0' }} />
                    ))}
                  </div>
                )}
                <p>{member.tagline}</p>
                <Text noOfLines={showBio[member.id] ? 0 : 5}>
                  <div dangerouslySetInnerHTML={{ __html: member.bio }} />
                </Text>
                <ul className="actions stacked">
                  <li>
                    <a
                      className={
                        showBio[member.id] ? 'button icon solid fa-chevron-up' : 'button icon solid fa-chevron-down'
                      }
                      onClick={() =>
                        setShowBio({
                          ...showBio,
                          [member.id]: !showBio[member.id],
                        })
                      }
                    >
                      {showBio[member.id] ? 'Collapse' : `Learn More About ${member.name.split(' ')[0]}`}
                    </a>
                  </li>
                </ul>
              </div>
              <div className="image">
                <img src={member.image} alt={member.name} />
              </div>
            </section>
          );
        })}
      </Layout>
    </>
  );
};

export default AboutPage;

export const Head: HeadFC = () => <SEO />;
