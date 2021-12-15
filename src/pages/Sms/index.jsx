import { useState, useEffect } from "react";

import api from '../../services'

export default function Sms() {

  const [operation, setOperation] = useState();
  const [edit, setEdit] = useState(false);
  const [editId, setEditID] = useState(0);
  const [status, setStatus] = useState(false);
  const [values, setValues] = useState({"status": false});

  useEffect(() => {
    api.get('/iptv')
      .then((response) => {
        setOperation(response.data)
      })
  }, [status]);

  function changeStatus(id) {
    setEdit(true)
    setEditID(id)
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  function onChange(e) {
    setValues({ status: e.target.value })
  }

  function onSubmit(e) {
    e.preventDefault()

    if (edit) {
      api.put(`/iptv/${editId}`, values)
        .then(() => {
          setStatus(!status)          
          setValues({ "status": false })
          setEdit(false)
        })
    }
  }

  return(
    <div className="container mt-1">
      <h1>Status Management System</h1>

      {edit && <form onSubmit={onSubmit} className="d-flex">
        <div className="d-flex flex-column">
          <div className="col">
            <label htmlFor="access" className="form-label">Operation {operation[editId - 1].iptv}</label>
            <select className="form-select" id="access" name="access" onChange={onChange} value={values.access}>
              <option defaultValue={false}>Inactive</option>
              <option value={true}>Active</option>
            </select>
          </div>
          <div className="d-flex mt-2">
            <button className="btn btn-outline-danger my-auto me-2" onClick={() => { setEdit(false) }}>Exit</button>
            <button type="submit" className="btn btn-outline-primary my-auto">Save changes</button>
          </div>
        </div>
      </form>}

      <div className="mt-3">
        {operation?.map(user => (
          <div key={user.id} className="card mb-2 shadow-sm">
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <h5 className="card-title">Operation: {user.iptv}</h5>
                <h6>Status: {user.status?'active':'inative'}</h6>
              </div>
              <div className="d-flex justify-content-start pt-2 border-top">
                <button className="btn btn-outline-primary" onClick={() => changeStatus(user.id)}>Change status</button>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}