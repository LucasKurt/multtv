import { Link, useNavigate } from 'react-router-dom'

import brand from "../../assets/img/BANNER_200_100.jpg"

function NavBar() {
  const navigate = useNavigate()
  const token = localStorage.getItem("token")?.split(",")
  function onClick() {
    localStorage.removeItem("token")
    navigate("/")
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <img src={brand} alt="brand" width={100} />
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav me-auto">
            {token?.includes("ams") && <Link className="nav-link active" aria-current="page" to="/ams">AMS</Link>}
            {token?.includes("ums") && <Link className="nav-link active" aria-current="page" to="/ums">UMS</Link>}
            {token?.includes("sms") && <Link className="nav-link active" aria-current="page" to="/sms">SMS</Link>}
            {token?.includes("oms") && <Link className="nav-link active" aria-current="page" to="/oms">OMS</Link>}
            {token?.includes("cms") && <Link className="nav-link active" aria-current="page" to="/cms">CMS</Link>}
            {token?.includes("crm") && <Link className="nav-link active" aria-current="page" to="/crm">CMS</Link>}
          </div>
          {token && <button className='btn btn-outline-danger' onClick={onClick}>Log out</button>}
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
