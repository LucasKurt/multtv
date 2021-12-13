import { useState, useEffect } from "react";

import api from '../../services'

export default function Oms() {
  const [operation, setOperation] = useState();
  const [status, setStatus] = useState(false);
  const [values, setValues] = useState({iptv: ''});

  useEffect(() => {
    api.get('/iptv')
      .then((response) => {
        setOperation(response.data)
      })
  }, [status]);

  function onChange(e) {
    const { name, value } = e.target
    setValues({
      ...values,
      [name]: value
    })
  }

  function onSubmit(e) {
    e.preventDefault()

    api.post('/iptv', values)
    .then(() => {
      setStatus(!status)
      setValues({iptv: ''})
    })

  }

  function deleteUser(id) {

    api.delete(`/iptv/${id}`)
      .then(() => {
        setStatus(!status)
      })
  }
  
  return (
    <div className="container mt-1">
      <h1>Operator Management System</h1>

      <form className="row g-3" onSubmit={onSubmit}>
        <div className="col-md-12">
          <label htmlFor="iptv" className="form-label">Iptv</label>
          <input type="text" className="form-control" id="iptv" name="iptv" onChange={onChange} value={values.iptv} />
        </div>
        <div className="col-md"><hr /></div>
        <div className="col-12">
          <button className="btn btn-outline-secondary ">Create operation</button>
        </div>
      </form>

      <div className="mt-3">
        {operation?.map(user => (
          <div key={user.id} className="card mb-2 shadow-sm">
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <h5 className="card-title">Operation: {user.iptv}</h5>
                <h6>Status: {user.status?'active':'inative'}</h6>
              </div>
              <div className="d-flex justify-content-end pt-2 border-top">
                <button className="btn btn-outline-danger" onClick={() => deleteUser(user.id)}>Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}