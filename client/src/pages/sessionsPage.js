import { createContext, useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import NavBar from '../components/NavBar';
import NavBarTime from '../components/NavBarTimes';
import SessionList from '../scenes/SessionList';
const SessionsContext = createContext();

function SessionsPage() {
  const [sessions, setSessions] = useState([]);
  const [activeFilter, setActiveFilter] = useState('AI');
  const [isStartTimeFilter, setIsStartTimeFilter] = useState(false);

  useEffect(() => {
    const getSessions = async () => {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/sessions`);
      const data = await response.json();
      setSessions(data);
    };

    getSessions();
  }, []);

  return (
    <div className="schedule content-block">
      <Container>
        <SessionsContext.Provider value={{}}>
          <section className="timetable">
            <NavBar
              sessions={sessions}
              activeFilter={activeFilter}
              setActiveFilter={setActiveFilter}
              setIsStartTimeFilter={ () => setIsStartTimeFilter(false)} //intentional error to remind me where i left off
            />
            <NavBarTime
              sessions={sessions}
              activeFilter={activeFilter}
              setActiveFilter={setActiveFilter}
            />
            <SessionList sessions={sessions} activeFilter={activeFilter} />
          </section>
        </SessionsContext.Provider>
      </Container>
    </div>
  );
}

export default SessionsPage;
