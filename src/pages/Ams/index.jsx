import { useState, useEffect } from "react";

import api from '../../services'

export default function Ams() {
  const [users, setUsers] = useState();
  const [status, setStatus] = useState(false);
  const [edit, setEdit] = useState(false);
  const [editId, setEditID] = useState(0);
  const [values, setValues] = useState({ access: "Operador Signal" });

  useEffect(() => {
    api.get('/users')
      .then((response) => {
        setUsers(response.data)
      })
  }, [status]);

  function editAccess(id) {
    setEdit(true)
    setEditID(id)
  }

  function onChange(e) {
    setValues({ access: e.target.value })
  }

  function onSubmit(e) {
    e.preventDefault()

    if (edit) {
      api.put(`/users/${editId}`, values)
        .then(() => {
          setStatus(!status)          
          setValues({ access: "Operador Signal" })
          setEdit(false)
        })
    }
  }

  return (
    <div className="container mt-1">
      <h1>Authorization Management System</h1>

      {edit && <form onSubmit={onSubmit} className="d-flex">
        <div className="d-flex flex-column">
          <div className="col">
            <label htmlFor="access" className="form-label">Access {users[editId - 1].username}</label>
            <select className="form-select" id="access" name="access" onChange={onChange} value={values.access}>
              <option defaultValue="Operador Signal">Operador Signal</option>
              <option value="Operador Ativo">Operador Ativo</option>
              <option value="Root">Root</option>
            </select>
          </div>
          <div className="d-flex mt-2">
            <button className="btn btn-outline-danger my-auto me-2" onClick={() => { setEdit(false) }}>Exit</button>
            <button type="submit" className="btn btn-outline-primary my-auto">Save changes</button>
          </div>
        </div>
      </form>}

      <div className="mt-3">
        {users?.map(user => (
          <div key={user.id} className="card mb-2 shadow-sm">
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <h5 className="card-title">User: {user.username}</h5>
                <h6>Access: {user.access}</h6>
              </div>
              <p className="card-text">Password: {user.password}</p>
              <div className="d-flex justify-content-between pt-2 border-top">
                <button className="btn btn-outline-primary mt-auto me-2" onClick={() => editAccess(user.id)}>Edit access</button>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}