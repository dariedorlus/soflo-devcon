import React, {useState} from "react";
import { Nav } from "react-bootstrap";

const Footer = () => {

  const [year] = useState(new Date().getFullYear());

  return (
    <div className="container">
      <footer className="py-3 my-4">
        <Nav as="ul" className="justify-content-center border-bottom pb-3 mb-3">
          <Nav.Item as="li">
            <Nav.Link href={"/"} className="nav-link px-2 text-muted">
              Sessions
            </Nav.Link>
          </Nav.Item>
          <Nav.Item as="li">
            <Nav.Link href={"/map"} className="nav-link px-2 text-muted">
              Maps
            </Nav.Link>
          </Nav.Item>
        </Nav>
        <p className="text-center align-items-center text-muted">
          &copy; {year} SoFloDevCon{" "}
        </p>
        <p className="text-center align-items-center text-muted">
          {" "}
          Made with <span className="heart">&#9829;</span> by {" "}
          <a href="https://dariedorlus.com/" className="link-dark">
            Darie
          </a>{" "}
          and {" "}
          <a
            href="https://www.linkedin.com/in/damianmontero/"
            className="link-dark"
          >
            Damian
          </a>{" "}
          | Powered by{" "}
          <a href="https://synctech.dev/" className="link-dark">
            SyncTech.dev
          </a>
        </p>
      </footer>
    </div>
  );
}

export default Footer;