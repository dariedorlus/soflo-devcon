import  { useState } from 'react';

 const MapPage = () =>  {

    const [mapNum, setMapNum] = useState('map1.jpg');

    return (
        <>
        <div className="map content-block" style={{textAlign:"center",position: "sticky",top: "0"}}>
            <button onClick={() => setMapNum('map1.jpg')}>Floor1</button>
            <button onClick={() => setMapNum('map2.jpg')}>Floor2</button>
            <button onClick={() => setMapNum('map3.jpg')}>Floor3</button>
        </div>
        <div  style={{transform: "scale(1)"}}>
            <img src={`/maps/${mapNum}`} style={{width:"1ev"}}  />
        </div>
        </>
    );
  }
  
  export default MapPage;