import { format, add } from 'date-fns';

const Session = ({ data }) => {
  return (
    <>
      {data && (
        <div className="col-md-6">
          <div className="timetable-item">
            <div className="timetable-item-img">
              <img
                src={data.speakerPicture}
                alt="Conference Speaker"
                onError={({ currentTarget }) => {
                  currentTarget.onerror = null; // prevents looping
                  currentTarget.src = 'https://upload.wikimedia.org/wikipedia/commons/2/2c/Default_pfp.svg';
                }}
              />
            </div>
            <div className="timetable-item-main">
              <div className="timetable-item-time">
              {data.startTime}
              </div>
              <div className="timetable-item-topic">Title: {data.title}</div>
              <div className="timetable-item-name">Speaker's Name: {data.speakerName}</div>
              <div className="timetable-item-topic">
                Track: {data.category}
              </div>
              <div className="timetable-item-room">{`${data.roomName} ${
                data.floor || 'N/A'
              }`}</div>
              <div className="timetable-item-like">
                <i className="fa fa-heart-o" aria-hidden="true"></i>
                <i className="fa fa-heart" aria-hidden="true"></i>
                {/* <div className="timetable-item-like-count">11</div> */}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Session;
