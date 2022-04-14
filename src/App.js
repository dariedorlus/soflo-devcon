import React, { createContext, useState } from 'react';
import { Container } from 'react-bootstrap';
import NavBar  from './components/NavBar';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import sessions from './sessions.json';
import SessionList from './scenes/SessionList';

export const SessionsContext = createContext();

function App() {
  const [activeCategory, setActiveCategory] = useState('AI');
  
  return (
    <main className="idance">
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
      
    </main>
  );
}

export default App;
