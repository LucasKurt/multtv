import { Link } from 'react-router-dom'

function NavBar() {
  return (
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        {/* <a class="navbar-brand" href="#">Navbar</a> */}
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div class="navbar-nav">
            <Link class="nav-link active" aria-current="page" to="/ams">AMS</Link>
            <Link class="nav-link active" aria-current="page" to="/ums">UMS</Link>            
            <Link class="nav-link active" aria-current="page" to="/sms">SMS</Link>            
            <Link class="nav-link active" aria-current="page" to="/oms">OMS</Link>            
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
