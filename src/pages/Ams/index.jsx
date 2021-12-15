import { useState, useEffect } from "react";

import api from '../../services'

export default function Ams() {
  const [users, setUsers] = useState();
  const [status, setStatus] = useState(false);
  const [edit, setEdit] = useState(false);
  const [editId, setEditID] = useState(0);
  const [values, setValues] = useState([]);

  useEffect(() => {
    api.get('/users')
      .then((response) => {
        setUsers(response.data)
      })
  }, [status]);

  function editAccess(id) {
    setEdit(true)
    setEditID(id)
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  function onChange(e) {
    const { value, checked } = e.target

    if (checked && !values.includes(value)) {
      setValues([...values, value])
    }

    if (!checked && values.includes(value)) {
      let arr = values.filter(e => e !== value)
      setValues([...arr])
    }
  }

  function onSubmit(e) {
    e.preventDefault()

    if (edit) {
      api.put(`/users/${editId}`, { permissions: values })
        .then(() => {
          setStatus(!status)
          setValues([])
          setEdit(false)
        })
    }
  }

  const permissions = [
    {
      permission: "ams",
      label: "Permitir acesso ao módulo AMS"
    },
    {
      permission: "ums",
      label: "Permitir acesso ao módulo UMS"
    },
    {
      permission: "sms",
      label: "Permitir acesso ao módulo SMS"
    },
    {
      permission: "oms",
      label: "Permitir acesso ao módulo OMS"
    },
    {
      permission: "cms",
      label: "Permitir acesso ao módulo CMS"
    },
    {
      permission: "crm",
      label: "Permitir acesso ao módulo CRM"
    },
    {
      permission: "pms",
      label: "Permitir acesso ao módulo PMS"
    },
  ] 

  return (
    <div className="container mt-1">
      <h1>Authorization Management System</h1>

      {edit && <form onSubmit={onSubmit} className="d-flex">
        <div className="d-flex flex-column p-2 border shadow-sm">
          <p className="mb-0">Access {users[editId - 1].username}</p>
          {permissions.map((permission, key) => (
            <div key={key} className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                name="permissions"
                id={permission.permission}
                value={permission.permission}
                onChange={onChange}
                // checked={users ? users[editId - 1].permissions.includes(permission.permission) : ''}
              />
              <label className="form-check-label" htmlFor={permission.permission}>
                {permission.label}
              </label>
            </div>
          ))}
          <div className="d-flex">
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
                <h6>
                  Permissions:{" "}
                  {user.permissions.map((permission, key) => (
                    <span key={key}>{permission} </span>
                  ))}
                </h6>
              </div>
              <div className="d-flex justify-content-between pt-2 border-top mt-2">
                <button className="btn btn-outline-primary mt-auto me-2" onClick={() => editAccess(user.id)}>Edit access</button>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}