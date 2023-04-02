import { createContext, useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import NavBar from '../components/NavBar';
import NavBarTime from '../components/NavBarTimes';
import SessionList from '../scenes/SessionList';
const SessionsContext = createContext();

function SessionsPage() {
  const [conferenceData, setConferenceData] = useState([]);
  const [activeFilter, setActiveFilter] = useState('Artificial Intelligence');
  const [isStartTimeFilter, setIsStartTimeFilter] = useState(false);


  useEffect(() => {
    const getData = async () => {
      const ConferenceData = await(await fetch(`${process.env.REACT_APP_API_URL}/conference/1`)).json()
      //setActiveFilter(ConferenceData.tracks[0].trackName)
      setConferenceData(ConferenceData);
     
      console.log("ActiveFilter: ",activeFilter)
    };

    getData();
  }, []);

  return (
    <div className="schedule content-block">
      <Container>
        <SessionsContext.Provider value={{}}>
          <section className="timetable">
            {!conferenceData ? 
            <h1>Loading....</h1>
            :
            <> 
                       
              <NavBar
                conferenceData={conferenceData}
                activeFilter={activeFilter}
                setActiveFilter={setActiveFilter}
                setIsStartTimeFilter={ () => setIsStartTimeFilter(false)} //intentional error to remind me where i left off
              />
            
              <NavBarTime
                conferenceData={conferenceData}
                activeFilter={activeFilter}
                setActiveFilter={setActiveFilter}
              />
              
              <SessionList conferenceData={conferenceData} activeFilter={activeFilter} />   
            </>
            }

          </section>
        </SessionsContext.Provider>
      </Container>
    </div>
  );
}

export default SessionsPage;
