import { Link } from 'react-router-dom'

function NavBar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        {/* <a className="navbar-brand" href="#">Navbar</a> */}
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <Link className="nav-link active" aria-current="page" to="/ams">AMS</Link>
            <Link className="nav-link active" aria-current="page" to="/ums">UMS</Link>            
            <Link className="nav-link active" aria-current="page" to="/sms">SMS</Link>            
            <Link className="nav-link active" aria-current="page" to="/oms">OMS</Link>            
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
