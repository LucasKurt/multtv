import { useState, useEffect } from "react";
import { Dropdown } from 'react-bootstrap'
import axios from "axios";

import api from '../../services'

export default function Pms() {
  const [tvPlans, setTvPlans] = useState([]);
  const [channels, setChannels] = useState([]);
  const [status, setStatus] = useState(false);
  const [edit, setEdit] = useState(false);
  const [editId, setEditID] = useState(0);
  const [values, setValues] = useState({ name: '', type: '', channelList: [] });
  const [isChecked, setIsChecked] = useState({});

  useEffect(() => {
    axios.get('https://61baa1f348df2f0017e5ab45.mockapi.io/tvPlans')
      .then((response) => {
        setTvPlans(response.data)
      })
  }, [status]);

  useEffect(() => {
    api.get('/channels')
      .then((response) => {
        setChannels(response.data)
        const arr = response.data?.map(channel => [channel.name, false])
        const initialState = Object.fromEntries(arr)
        setIsChecked({ ...initialState })
      })
  }, [status]);

  function onChange(e) {
    const { value, checked, name, id } = e.target

    setIsChecked({
      ...isChecked,
      [value]: checked
    })

    if (id === "name" || id === "type") {
      setValues({
        ...values,
        [name]: value
      })
    } else {
      if (checked && !values.channelList.includes(value)) {
        setValues({
          ...values,
          [name]: [...values.channelList, value]
        })
      }

      if (!checked && values.channelList.includes(value)) {
        let arr = values.channelList.filter(e => e !== value)
        setValues({
          ...values,
          [name]: [...arr]
        })
      }
    }

  }

  function editTvPlan(tvPlan) {
    const arr = channels?.map(channel => [channel.name, false])
    const obj = Object.fromEntries(arr)
    for (const key in obj) {
      for (const channel of tvPlan.channelList) {
        if(key === channel){
          obj[key] = true
        }
      }
    }
    setEdit(true);
    setEditID(tvPlan.id);
    setIsChecked(obj)
    setValues({ name: tvPlan.name, type: tvPlan.type, channelList: tvPlan.channelList })
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  function onSubmit(e) {
    e.preventDefault()

    if (!edit) {
      axios.post('https://61baa1f348df2f0017e5ab45.mockapi.io/tvPlans', values)
        .then(() => {
          setStatus(!status)
          setValues({ name: '', type: '', channelList: [] })
        })
    } else {
      axios.put(`https://61baa1f348df2f0017e5ab45.mockapi.io/tvPlans/${editId}`, values)
        .then(() => {
          setStatus(!status)
          setValues({ name: '', type: '', channelList: [] })
          setEdit(false)
        })
    }

  }

  function deleteTvPlan(id) {

    axios.delete(`https://61baa1f348df2f0017e5ab45.mockapi.io/tvPlans/${id}`)
      .then(() => {
        setStatus(!status)
      })
  }



  return (
    <div className="container mt-1">
      <h1>Products Management System</h1>

      <form className="row g-3" onSubmit={onSubmit}>
        <div className="col-md-5">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" className="form-control" id="name" name="name" value={values.name} onChange={onChange} />
        </div>
        <div className="col-md-5">
          <label htmlFor="type" className="form-label">Type</label>
          <select className="form-select" id="type" name="type" onChange={onChange} value={values.type}>
            <option defaultValue={"Small"}>Small</option>
            <option value={"Medium"}>Medium</option>
            <option value={"Big"}>Big</option>
          </select>
        </div>
        <div className="col-md-2 mt-5 d-flex align-items-end">

          <Dropdown className="form-label bg-white" autoClose="outside" >
            <Dropdown.Toggle variant="secondary" id="dropdown-basic">
              Channel list
            </Dropdown.Toggle>

            <Dropdown.Menu>
              {channels?.map((channels, key) => (
                <div key={key} className="form-check ms-2">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name="channelList"
                    id={channels.name}
                    value={channels.name}
                    onChange={onChange}
                    checked={isChecked[channels.name]}
                  />
                  <label className="form-check-label" htmlFor={channels.name}>
                    {channels.name}
                  </label>
                </div>

              ))}
            </Dropdown.Menu>
          </Dropdown>

        </div>
        <div className="col-md"><hr /></div>
        <div className="col-12">
          {!edit && <button className="btn btn-outline-secondary ">Create TV plan</button>}
          {edit &&
            <div className="d-flex">
              <button className="btn btn-outline-secondary me-2">Update plan {tvPlans[editId - 1].name}</button>
              <button className="btn btn-outline-warning" onClick={() => setEdit(false)}>Cancel</button>
            </div>
          }
        </div>
      </form>

      <div className="mt-3">
        {tvPlans?.map(tvPlan => (
          <div key={tvPlan.id} className="card mb-2 shadow-sm">
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <h5 className="card-title">TV plan: {tvPlan.name}</h5>
                <h6>Type: {tvPlan.type}</h6>
              </div>
              <p className="card-text">Channel list: {tvPlan.channelList.map((channel, key) => (
                <span key={key}>{channel} </span>
              ))}</p>
              <div className="d-flex justify-content-end pt-2 border-top">
                <button className="btn btn-outline-primary me-2" onClick={() => editTvPlan(tvPlan)}>Edit</button>
                <button className="btn btn-outline-danger" onClick={() => deleteTvPlan(tvPlan.id)}>Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}