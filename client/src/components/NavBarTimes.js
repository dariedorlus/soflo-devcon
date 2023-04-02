import { Nav } from 'react-bootstrap';

const NavBarTime = ({ conferenceData, setActiveFilter, activeFilter }) => {


  return (
    <Nav as="nav" variant="tabs" activeKey={activeFilter}>
      {conferenceData && conferenceData.times && conferenceData.times.map((times, index) => {
        const active = activeFilter === times.time ? 'active' : '';
        return (
          <Nav.Item key={index}>
            <Nav.Link
              onClick={() => setActiveFilter(times.time)}
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
