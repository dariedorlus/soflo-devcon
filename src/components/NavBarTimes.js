import { useEffect, useState } from "react";
import { Nav } from "react-bootstrap";


const NavBarTime = ({sessions, setActiveCategory, activeCategory}) => {

    const [categories, setCategories] = useState([]);
    
    useEffect(() => {
        if(sessions && sessions.length > 0) {
            const categories = sessions.map(session => session.time);
            const uniqueCategories = [...new Set(categories)];
            setCategories(uniqueCategories);
        }

    }, [sessions]); 

    return (
      <Nav as="nav" variant="tabs" activeKey={activeCategory}>

        {categories.map((category, index) => {
           const active = activeCategory === category ? "active" : "";
          return (
            <Nav.Item key={index} 

            >
              <Nav.Link
                onClick={() => setActiveCategory(category)}
                key={index}
                className={active}
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

export default NavBarTime;