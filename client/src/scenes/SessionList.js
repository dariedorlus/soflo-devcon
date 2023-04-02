import { useEffect, useState } from 'react';
import { Row } from 'react-bootstrap';
import Session from '../components/Session';

const SessionList = ({ conferenceData, activeFilter, isStartTimeFilter = false }) => {
  const [filteredSessions, setFilteredSessions] = useState([]);

  useEffect(() => {
    if (conferenceData && conferenceData.sessions && conferenceData.sessions.length > 0) {
      let selectedSessions = [];
      if (!isStartTimeFilter) {
        selectedSessions = conferenceData.sessions
          .filter((session) => session.category === activeFilter)
          .sort((a, b) => a.session - b.session);
      } else {
        selectedSessions = conferenceData.sessions
          .filter((session) => session.time === activeFilter)
          .sort((a, b) => a.session - b.session);
      }
      setFilteredSessions(selectedSessions);
    }
  }, [activeFilter]);

  return (
    <div className="tab-content">
      <div className="tab-pane show active">
        <Row>
          {filteredSessions &&
            filteredSessions.length > 0 &&
            filteredSessions.map((session, index) => (
              <Session data={session} key={index} />
            ))}
        </Row>
      </div>
    </div>
  );
};
export default SessionList;
