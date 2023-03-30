import { format, add } from 'date-fns';

const Session = ({ data }) => {
  debugger;
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
                  currentTarget.src = '/noimage.jpg';
                }}
              />
            </div>
            <div className="timetable-item-main">
              <div className="timetable-item-time">
                {format(new Date(data.startTime), 'hh mm a..aa')}
                {` - `}
                {add(new Date(data.startTime), {
                  minutes: data.talkLengthInMinutes,
                }).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                  hour12: true,
                  timeStyle: 'short',
                })}
              </div>
              <div className="timetable-item-topic">{data.title}</div>
              <div className="timetable-item-name">{data.speakerName}</div>
              <div className="timetable-item-topic">
                Category: {data.category}
              </div>
              <div className="timetable-item-room">{`${data.roomName} ${
                data.floor || ''
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
