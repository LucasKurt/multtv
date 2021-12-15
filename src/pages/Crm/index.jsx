import { useState, useEffect } from "react";

import api from '../../services'

export default function Ums() {
  const [subscribers, setSubscribers] = useState();
  const [status, setStatus] = useState(false);
  const [edit, setEdit] = useState(false);
  const [editId, setEditID] = useState(0);
  const [values, setValues] = useState({ name: '', password: '', status: '' });

  useEffect(() => {
    api.get('/subscribers')
      .then((response) => {
        setSubscribers(response.data)
      })
  }, [status]);

  function onChange(e) {
    const { name, value } = e.target
    setValues({
      ...values,
      [name]: value
    })
  }

  function editSubscriber(subscribers) {
    setEdit(true);
    setEditID(subscribers.id);
    setValues({ name: subscribers.name, password: subscribers.password, status: '' })
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  function onSubmit(e) {
    e.preventDefault()

    if (!edit) {
      api.post('/subscribers', values)
        .then(() => {
          setStatus(!status)
          setValues({ name: '', password: '', status: '' })
        })
    } else {
      api.put(`/subscribers/${editId}`, values)
        .then(() => {
          setStatus(!status)
          setValues({ name: '', password: '', status: '' })
          setEdit(false)
        })
    }

  }

  function deleteSubscriber(id) {

    api.delete(`/subscribers/${id}`)
      .then(() => {
        setStatus(!status)
      })
  }

  return (
    <div className="container mt-1">
      <h1>Customer Relationship Management</h1>

      <form className="row g-3" onSubmit={onSubmit}>
        <div className="col-md-5">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" className="form-control" id="name" name="name" value={values.name} onChange={onChange} />
        </div>
        <div className="col-md-5">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="text" className="form-control" id="password" name="password" value={values.password} onChange={onChange} />
        </div>
        <div className="col-md-2">
          <label htmlFor="status" className="form-label">Status</label>
          <select className="form-select" id="status" name="status" onChange={onChange} value={values.status}>
            <option defaultValue={false}>Inactive</option>
            <option value={true}>Active</option>
          </select>
        </div>
        <div className="col-md"><hr /></div>
        <div className="col-12">
          {!edit && <button className="btn btn-outline-secondary ">Create user</button>}
          {edit &&
            <div className="d-flex">
              <button className="btn btn-outline-secondary me-2">Update user {subscribers[editId - 1].username}</button>
              <button className="btn btn-outline-warning" onClick={() => setEdit(false)}>Cancel</button>
            </div>
          }
        </div>
      </form>

      <div className="mt-3">
        {subscribers?.map(subscriber => (
          <div key={subscriber.id} className="card mb-2 shadow-sm">
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <h5 className="card-title">Subscriber: {subscriber.name}</h5>
                <h6>Status {subscriber.status?'active':'inactive'}</h6>
              </div>
              <p className="card-text">Password: {subscriber.password}</p>
              <div className="d-flex justify-content-end pt-2 border-top">
                <button className="btn btn-outline-primary me-2" onClick={() => editSubscriber(subscriber)}>Edit</button>
                <button className="btn btn-outline-danger" onClick={() => deleteSubscriber(subscriber.id)}>Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}