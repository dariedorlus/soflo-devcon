const Session = ({data}) => {
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
                      currentTarget.src="/noimage.jpg";
                    }}
                />
              </div>
              <div className="timetable-item-main">
                <div className="timetable-item-time">{data.time}</div>
                <div className="timetable-item-topic">{data.topic}</div>
                <div className="timetable-item-name">{data.speaker}</div>
                <div className="timetable-item-room">{data.room}</div>
                
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
}

export default Session;