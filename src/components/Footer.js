import React, {useState} from "react";

const Footer = () => {

  const [year, setYear] = useState(new Date().getFullYear());

  return (
    <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
      <p className="col-md-4 mb-0 text-muted">&copy; {year} SoFloDevCon</p>

      <a
        href="/"
        className="col-md-4 d-flex align-items-center justify-content-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none"
      >
        Made with <span className="heart">&#9829;</span> by <a href="https://dariedorlus.com/" className="link-dark">Darie</a> and
        <a href="https://www.linkedin.com/in/damianmontero/" className="link-dark">Damian</a> | Powered by <a href="https://synctech.dev/" className="link-dark">SyncTec.dev</a>
      </a>

      <ul className="nav col-md-4 justify-content-end">
        <li className="nav-item">
          <a href="#" className="nav-link px-2 text-muted">
            Speaker Schedule
          </a>
        </li>
        <li className="nav-item">
          <a href="#" className="nav-link px-2 text-muted">
            Maps
          </a>
        </li>
      </ul>
    </footer>
  );
}

export default Footer;