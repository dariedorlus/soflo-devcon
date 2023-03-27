import  { useState } from 'react';
import { Nav } from "react-bootstrap";

 const MapPage = () =>  {

    const [mapNum, setMapNum] = useState('map1.jpg');

    return (
        <>
        <div className="map content-block" style={{textAlign:"center",position: "sticky",top: "0"}}>

            <Nav.Link  className="btn btn-success" style={{color:"white", width:"48%", display: "inline", marginRight: "10px"}}
                onClick={() => setMapNum('map1.jpg')}
              >Floor1</Nav.Link>
            <Nav.Link  className="btn btn-success" style={{color:"white", width:"48%", display: "inline", marginRight: "10px"}}
                onClick={() => setMapNum('map2.jpg')}
              >Floor2</Nav.Link>            <Nav.Link  className="btn btn-success" style={{color:"white", width:"48%", display: "inline", marginRight: "10px"}}
              onClick={() => setMapNum('map3.jpg')}
            >Floor2</Nav.Link>


        </div>
        <div  style={{transform: "scale(1)"}}>
            <img src={`/maps/${mapNum}`} style={{width:"1ev"}}  />
        </div>
        </>
    );
  }
  
  export default MapPage;