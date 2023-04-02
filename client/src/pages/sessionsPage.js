import { createContext, useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import NavBar from '../components/NavBar';
import NavBarTime from '../components/NavBarTimes';
import SessionList from '../scenes/SessionList';
const SessionsContext = createContext();

function SessionsPage() {
  const [conferenceData, setConferenceData] = useState([]);
  const [activeFilter, setActiveFilter] = useState('Artificial Intelligence');


  useEffect(() => {
    const getData = async () => {
      const ConferenceData = await(await fetch(`${process.env.REACT_APP_API_URL}/conference/1`)).json()
      setConferenceData(ConferenceData);
      // find that's the next (or current) session
      let CurrentTimeSlot = "08:00"
      var today = new Date();
      var CurrentFirstTime =  Number(today.getHours())
      ConferenceData.times.map(timeSlot => {
        const firstPartOfTime = Number(timeSlot.time.substr(0,timeSlot.time.indexOf(":")))
        
        if (firstPartOfTime <= CurrentFirstTime) {
          console.log("Yep, ",firstPartOfTime,CurrentFirstTime)
          CurrentTimeSlot = timeSlot.time;
        }
      })
      console.log("CurrentTimeSlot",CurrentTimeSlot)
      setActiveFilter(CurrentTimeSlot)
    
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
