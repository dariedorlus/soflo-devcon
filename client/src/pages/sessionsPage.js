import  { createContext, useState } from 'react';
import { Container } from 'react-bootstrap';
import NavBar  from '../components/NavBar';
import NavBarTime  from '../components/NavBarTimes';
import sessions from '../sessions.json';
import SessionList from '../scenes/SessionList';
const SessionsContext = createContext();

function SessionsPage() {

    const [activeCategory, setActiveCategory] = useState('AI');
    return (
        <div className="schedule content-block">
          <Container>
            <SessionsContext.Provider value={{}}>
              <section className="timetable">
                <NavBar sessions={sessions} activeCategory={activeCategory} setActiveCategory={setActiveCategory} />
                <NavBarTime sessions={sessions} activeCategory={activeCategory} setActiveCategory={setActiveCategory} />
                <SessionList sessions={sessions} activeCategory={activeCategory} />
              </section>
            </SessionsContext.Provider>
          </Container>
        </div>
    );
  }
  
  export default SessionsPage;