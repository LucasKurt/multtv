import { useState, useEffect } from "react";

import api from '../../services'

export default function Cms() {
  const [channels, setChannels] = useState();
  const [status, setStatus] = useState(false);
  const [edit, setEdit] = useState(false);
  const [editId, setEditID] = useState(0);
  const [values, setValues] = useState({ logo: 'http://placeimg.com/640/480/business', name: '', number: '' });

  useEffect(() => {
    api.get('/channels')
      .then((response) => {
        setChannels(response.data)
      })
  }, [status]);

  function onChange(e) {
    const { name, value } = e.target
    setValues({
      ...values,
      [name]: value
    })
  }

  function editChannel(channel) {
    setEdit(true);
    setEditID(channel.id);
    setValues({ logo: channel.logo, name: channel.name, number: channel.number })
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  function onSubmit(e) {
    e.preventDefault()

    if (!edit) {
      api.post('/channels', values)
        .then(() => {
          setStatus(!status)
          setValues({ logo: 'http://placeimg.com/640/480/business', name: '', number: '' })
        })
    } else {
      api.put(`/channels/${editId}`, values)
        .then(() => {
          setStatus(!status)
          setValues({ logo: 'http://placeimg.com/640/480/business', name: '', number: '' })
          setEdit(false)
        })
    }

  }

  function deleteChannel(id) {

    api.delete(`/channels/${id}`)
      .then(() => {
        setStatus(!status)
      })
  }



  return (
    <div className="container mt-1">
      <h1>Content Management System</h1>

      <form className="row g-3" onSubmit={onSubmit}>
        <div className="col-md-12">
          <img src={values.logo} alt="channel logo" width={200} height={200} />
          <div className="">
            <label htmlFor="logo" className="form-label">Channel Logo</label>
            <input type="text" className="form-control" id="logo" name="logo" onChange={onChange} value={values.logo} />
          </div>
        </div>
        <div className="col-md-6">
          <label htmlFor="name" className="form-label">Channel name</label>
          <input type="text" className="form-control" id="name" name="name" onChange={onChange} value={values.name} />
        </div>
        <div className="col-md-6">
          <label htmlFor="number" className="form-label">Channel number</label>
          <input type="text" className="form-control" id="number" name="number" onChange={onChange} value={values.number} />
        </div>
        <div className="col-md"><hr /></div>
        <div className="col-12">
          {!edit && <button className="btn btn-outline-secondary ">Create channel</button>}
          {edit &&
            <div className="d-flex">
              <button className="btn btn-outline-secondary me-2">Update channel {channels[editId - 1].channelName}</button>
              <button className="btn btn-outline-warning" onClick={() => setEdit(false)}>Cancel</button>
            </div>
          }
        </div>
      </form>

      <div className="mt-3">
        {channels?.map(channel => (
          <div key={channel.id} className="row">
            <div className="col-mb-6">
              <div key={channel.id} className="card mb-3" style={{ maxWidth: 610 }}>
                <div className="row g-0">
                  <div className="col-md-4">
                    <img src={channel.logo} className="img-fluid rounded-start" alt="logo" />
                  </div>
                  <div className="col-md-8">
                    <div className="card-body">
                      <h5 className="card-title">Channel name: {channel.name}</h5>
                      <p className="card-text">Channel number: {channel.number}</p>
                      <div className="d-flex justify-content-end pt-2 border-top">
                        <button className="btn btn-outline-primary me-2" onClick={() => editChannel(channel)}>Edit</button>
                        <button className="btn btn-outline-danger" onClick={() => deleteChannel(channel.id)}>Delete</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}