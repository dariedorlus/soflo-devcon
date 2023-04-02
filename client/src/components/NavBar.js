import { useEffect, useState } from 'react';
import { Nav } from 'react-bootstrap';

const NavBar = ({ conferenceData, setActiveFilter, activeFilter }) => {

  return (
    <Nav as="nav" variant="tabs" activeKey={activeFilter}>
      {conferenceData.tracks && conferenceData.tracks.map((track, index) => {
        const active = activeFilter === track.trackName ? 'active' : '';
        return (
          <Nav.Item key={index}>
            <Nav.Link
              onClick={() => setActiveFilter(track.trackName)}
              key={index}
              className={active}
              href={`/#${track.trackName}`}>
              {track.trackName}
            </Nav.Link>
          </Nav.Item>
        );
      })}
    </Nav>
  );
};

export default NavBar;
