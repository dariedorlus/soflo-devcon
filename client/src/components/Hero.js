
import { Nav } from "react-bootstrap";
const Hero = () => {
    return (
      <div className="px-1 py-2 my-1 text-center">
       
        <div className="display-3 fw-bold"> <img
          src="./palm-beach-tech.png"
          alt="Tech Hub South Florida Logo"
          width="72"
          height="72"
        />#SoFloDevCon
        </div>
        <div className="display-3 fw-bold">
        <Nav.Link  className="btn btn-success" style={{color:"white", width:"48%", display: "inline", marginRight: "10px"}}
                href={`/`}
              >Sessions</Nav.Link>
          <Nav.Link className="btn btn-success" style={{color:"white", width:"48%", display: "inline"}}
                href={`/map`}
              >Map</Nav.Link>

         </div>
      </div>
    );
}

export default Hero;