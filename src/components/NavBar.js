import { useEffect, useState } from "react";
import { Nav } from "react-bootstrap";


const NavBar = ({sessions, setActiveCategory, activeCategory}) => {

    const [categories, setCategories] = useState([]);
    
    useEffect(() => {
        if(sessions && sessions.length > 0) {
            const categories = sessions.map(session => session.category);
            const uniqueCategories = [...new Set(categories)];
            setCategories(uniqueCategories);
        }

    }, [sessions]); 

    return (
      <Nav as="nav" variant="tabs" defaultActiveKey="/">
        {categories.map((category, index) => {
          return (
            <Nav.Item key={index} active={activeCategory === category}>
              <Nav.Link
                onClick={() => setActiveCategory(category)}
                key={index}
                href={`/#${category}`}
              >
                {category}
              </Nav.Link>
            </Nav.Item>
          );
        })}
      </Nav>
    ); 
};

export default NavBar;