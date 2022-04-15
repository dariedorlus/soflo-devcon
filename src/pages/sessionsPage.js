import  { createContext, useState } from 'react';
import { Container } from 'react-bootstrap';
import NavBar  from '../components/NavBar';
import sessions from '../sessions.json';
import SessionList from '../scenes/SessionList';
const SessionsContext = createContext();

function sessionsPage() {

    const [activeCategory, setActiveCategory] = useState('AI');
    return (
        <div className="schedule content-block">
          <Container>
            <SessionsContext.Provider value={{}}>
              <section className="timetable">
                <NavBar sessions={sessions} setActiveCategory={setActiveCategory} />
                <SessionList sessions={sessions} activeCategory={activeCategory} />
              </section>
            </SessionsContext.Provider>
          </Container>
        </div>
    );
  }
  
  export default sessionsPage;