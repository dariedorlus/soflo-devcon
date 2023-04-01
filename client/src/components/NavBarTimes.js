import { Nav } from 'react-bootstrap';

const NavBarTime = ({ sessions, setActiveCategory, activeCategory }) => {
  const startTimes = [
    '8:30AM',
    '9:45AM',
    '11:00AM',
    '12:00PM',
    '1:30PM',
    '2:45PM',
    '4:00PM',
  ]; // This should be populated from the sessions data

  return (
    <Nav as="nav" variant="tabs" activeKey={activeCategory}>
      {startTimes.map((category, index) => {
        const active = activeCategory === category ? 'active' : '';
        return (
          <Nav.Item key={index}>
            <Nav.Link
              onClick={() => setActiveCategory(category)}
              key={index}
              className={active}
              href={`/#${category}`}>
              {category}
            </Nav.Link>
          </Nav.Item>
        );
      })}
    </Nav>
  );
};

export default NavBarTime;
