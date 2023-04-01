import { useEffect, useState } from 'react';
import { Nav } from 'react-bootstrap';

const NavBar = ({ sessions, setActiveFilter, activeFilter }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (sessions && sessions.length > 0) {
      const categories = sessions.map((session) => session.category);
      const uniqueCategories = [...new Set(categories)];
      setCategories(uniqueCategories);
    }
  }, [sessions]);

  return (
    <Nav as="nav" variant="tabs" activeKey={activeFilter}>
      {categories.map((category, index) => {
        const active = activeFilter === category ? 'active' : '';
        return (
          <Nav.Item key={index}>
            <Nav.Link
              onClick={() => setActiveFilter(category)}
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

export default NavBar;
