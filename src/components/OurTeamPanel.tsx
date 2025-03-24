import React, { useState } from 'react';
import teamMembers from '../../content/team';
import { Box, Tooltip, GridItem, Container } from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { TeamFilter } from './Quiz';
// import Img from "gatsby-image"

interface HeadshotProps {
  member: any;
}

const Headshot = ({ member }: HeadshotProps) => {
  return (
    <motion.div
      layout
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      className="image headshot"
    >
      <Tooltip label={<em>{member.name}</em>}>
        <a href={`/about#${member.id}`}>
          <img src={member.image} alt={member.name} />
          {/* <Img src={member.image} /> */}
        </a>
      </Tooltip>
    </motion.div>
  );
};

export interface IProps {}

const OurTeamPanel: React.FC<IProps> = () => {
  const allMembers = Array.from(teamMembers).reverse();
  const [filtered, setFiltered] = useState(allMembers);

  return (
    <>
      <section className="wrapper style1 align-center">
        <div className="inner" style={{ padding: '1rem' }}>
          <h2>Our Team</h2>
        </div>

        <TeamFilter allMembers={allMembers} setFiltered={setFiltered} />

        {filtered.length < 1 && (
          <div className="quiz-provider-not-found">
            <h3>No providers found that match your criteria</h3>
            <p>
              Please call us at <a href="tel:7049803082">(704) 980-3082</a> to get a personalized consultation on who
              may be the best fit for you!
            </p>
          </div>
        )}

        <div style={{ clear: 'both' }}>
          <section className="spotlight style2" style={{ padding: '0rem' }}>
            <Box as={Container} mb={14} mt={4} p={0}>
              <motion.div layout className="member-grid">
                <AnimatePresence>
                  {(filtered.length ? filtered : allMembers).map((member) => (
                    <Headshot member={member} key={member.id} />
                  ))}
                </AnimatePresence>
              </motion.div>
            </Box>
          </section>
        </div>
      </section>
    </>
  );
};

export default OurTeamPanel;
