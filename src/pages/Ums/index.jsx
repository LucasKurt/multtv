import { useState, useEffect } from "react";

import api from '../../services'

export default function Ums() {
  const [users, setUsers] = useState();
  const [status, setStatus] = useState(false);
  const [edit, setEdit] = useState(false);
  const [editId, setEditID] = useState(0);
  const [values, setValues] = useState({ username: '', password: '' });

  useEffect(() => {
    api.get('/users')
      .then((response) => {
        setUsers(response.data)
      })
  }, [status]);

  function onChange(e) {
    const { name, value } = e.target
    setValues({
      ...values,
      [name]: value
    })
  }

  function editUser(user) {
    setEdit(true); 
    setEditID(user.id); 
    setValues({ username: user.username, password: user.password })
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  function onSubmit(e) {
    e.preventDefault()

    if (!edit) {
      api.post('/users', values)
        .then(() => {
          setStatus(!status)
          setValues({ username: '', password: '' })
        })
    } else {
      api.put(`/users/${editId}`, values)
        .then(() => {
          setStatus(!status)
          setValues({ username: '', password: '' })
          setEdit(false)
        })
    }

  }

  function deleteUser(id) {

    api.delete(`/users/${id}`)
      .then(() => {
        setStatus(!status)
      })
  }
  
  return (
    <div className="container mt-1">
      <h1>Users Module System</h1>

      <form className="row g-3" onSubmit={onSubmit}>
        <div className="col-md-6">
          <label htmlFor="username" className="form-label">Username</label>
          <input type="text" className="form-control" id="username" name="username" onChange={onChange} value={values.username} />
        </div>
        <div className="col-md-6">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" name="password" onChange={onChange} value={values.password} />
        </div>
        <div className="col-md"><hr /></div>
        <div className="col-12">
          {!edit && <button className="btn btn-outline-secondary ">Create user</button>}
          {edit &&
            <div className="d-flex">
              <button className="btn btn-outline-secondary me-2">Update user {users[editId - 1].username}</button>
              <button className="btn btn-outline-warning" onClick={() => setEdit(false)}>Cancel</button>
            </div>
          }
        </div>
      </form>

      <div className="mt-3">
        {users?.map(user => (
          <div key={user.id} className="card mb-2 shadow-sm">
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <h5 className="card-title">User: {user.username}</h5>
              </div>
              <p className="card-text">Password: {user.password}</p>
              <div className="d-flex justify-content-end pt-2 border-top">
                <button className="btn btn-outline-primary me-2" onClick={() => editUser(user)}>Edit</button>
                <button className="btn btn-outline-danger" onClick={() => deleteUser(user.id)}>Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}