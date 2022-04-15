

const Footer = () => {


  return (
    <footer class="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
      <p class="col-md-4 mb-0 text-muted">&copy; {(new Date()).getFullYear} SoFloDevCon</p>

      <a
        href="/"
        class="col-md-4 d-flex align-items-center justify-content-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none"
      >
        Made with <span class="heart">&#9829;</span> by <a href="https://dariedorlus.com/" class="link-dark">Darie</a> and
        <a href="https://www.linkedin.com/in/damianmontero/" class="link-dark">Damian</a> | Powered by <a href="https://synctech.dev/" class="link-dark">SyncTec.dev</a>
      </a>

      <ul class="nav col-md-4 justify-content-end">
        <li class="nav-item">
          <a href="#" class="nav-link px-2 text-muted">
            Speaker Schedule
          </a>
        </li>
        <li class="nav-item">
          <a href="#" class="nav-link px-2 text-muted">
            Maps
          </a>
        </li>
      </ul>
    </footer>
  );
}

export default Footer;