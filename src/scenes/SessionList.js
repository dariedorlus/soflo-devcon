import { useEffect, useState } from "react";
import { Row } from "react-bootstrap";
import Session from "../components/Session";


const SessionList = ({sessions, activeCategory}) => {

    const [filteredSessions, setFilteredSessions] = useState([]);

    useEffect(() => {
        if(sessions && sessions.length > 0) {
          let selectedSessions = [];
          if (activeCategory.indexOf("-") ===-1) {
            console.log("Yes")
             selectedSessions = sessions.filter(session => session.category === activeCategory).sort((a, b) => a.session - b.session);
          } else {
            console.log("no")
            selectedSessions = sessions.filter(session => session.time === activeCategory).sort((a, b) => a.session - b.session);
          }
            setFilteredSessions(selectedSessions);
        }

    } , [activeCategory]);

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
}
export default SessionList;