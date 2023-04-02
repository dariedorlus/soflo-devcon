import { Nav } from 'react-bootstrap';

const NavBarTime = ({ conferenceData, setActiveCategory, activeCategory }) => {


  return (
    <Nav as="nav" variant="tabs" activeKey={activeCategory}>
      {conferenceData && conferenceData.times && conferenceData.times.map((times, index) => {
        const active = activeCategory === times.time ? 'active' : '';
        return (
          <Nav.Item key={index}>
            <Nav.Link
              onClick={() => setActiveCategory(times.time)}
              key={index}
              className={active}
              href={`/#${times.time}`}>
              {times.time}
            </Nav.Link>
          </Nav.Item>
        );
      })}
    </Nav>
  );
};

export default NavBarTime;
