import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"

import api from '../../services'

import './styles.css';
import logo from '../../assets/img/Round - 100x100.png';

const Login = () => {
  const [values, setValues] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  function onChange(e) {
    const { name, value } = e.target
    setValues({
      ...values,
      [name]: value
    })
  }

  function onSubmit(e) {
    e.preventDefault()

    if (values.username === "user" && values.password === "123456") {
      api.get('/users')
        .then((response) => {
          let user = response.data[0]
          localStorage.setItem("token", user.permissions)
          navigate(`/${user.permissions[0]}`)
        })
    }
  }

  useEffect(() => {
    let token = localStorage.getItem("token")
    token && navigate(`/${token.substring(0,3)}`)
  }, [navigate]);


  return (
    <div className="login text-center d-flex">
      <div className="form-signin">
        <form onSubmit={onSubmit}>
          <img className="mb-4" src={logo} alt="Logo" />
          <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
          <div className="form-floating">
            <input type="text" className="form-control" id="floatingInput" placeholder="username" name="username" onChange={onChange} value={values.username} />
            <label htmlFor="floatingInput">Username</label>
          </div>
          <div className="form-floating">
            <input type="password" className="form-control" id="floatingPassword" placeholder="Password" name="password" onChange={onChange} value={values.password} />
            <label htmlFor="floatingPassword">Password</label>
          </div>
          <button className="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
          <p className="mt-5 mb-3 text-muted">© 2017–2021</p>
        </form>
      </div>
    </div>
  );
}

export default Login;
