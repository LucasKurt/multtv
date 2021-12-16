import { useState, useEffect } from "react";

import api from '../../services'
import ToggleSwitch from '../../components/ToggleSwitch';

const initialState = {
  ams: false,
  ums: false,
  sms: false,
  oms: false,
  cms: false,
  crm: false,
  pms: false,
}

const obj = {
  ams: false,
  ums: false,
  sms: false,
  oms: false,
  cms: false,
  crm: false,
  pms: false,
}

export default function Ams() {
  const [users, setUsers] = useState([]);
  const [status, setStatus] = useState(false);
  const [edit, setEdit] = useState(false);
  const [editId, setEditID] = useState(0);
  const [values, setValues] = useState([]);
  const [isChecked, setIsChecked] = useState(initialState);
  const [rootChecked, setRootChecked] = useState(false);

  useEffect(() => {
    api.get('/users')
      .then((response) => {
        setUsers(response.data)
      })
  }, [status]);

  useEffect(() => {
    let valid = true
    for (const key in isChecked) {
      if (!isChecked[key]) {
        setRootChecked(false)
        valid = false
        break
      }
    }
    valid && setRootChecked(true)
  }, [isChecked]);

  function editAccess(id) {
    const editCheck = {
      ams: false,
      ums: false,
      sms: false,
      oms: false,
      cms: false,
      crm: false,
      pms: false,
    }
    for (let key in editCheck) {
      for (const permission of users[id - 1].permissions) {
        if (key === permission) {
          editCheck[key] = true
        }
      }
    }
    let arr = []
    for (const key in editCheck) {
      if (editCheck[key]) {
        arr.push(key)
      }
    }
    setValues([...arr])
    setIsChecked({ ...editCheck })
    setEdit(true)
    setEditID(id)
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  function rootClick(e) {
    if (e.target.checked) {
      for (let key in obj) {
        obj[key] = true
      }
    } else {
      for (let key in obj) {
        obj[key] = false
      }
    }
  }

  function rootChange(e) {
    setIsChecked(obj)
    setRootChecked(e.target.checked)
    if (e.target.checked) {
      let arr = []
      for (const key in obj) {
        arr.push(key)
      }
      setValues(arr)
    } else {
      let arr = []
      setValues([...arr])
    }
  }

  function onChange(e) {
    const { value, checked } = e.target

    setIsChecked({
      ...isChecked,
      [value]: checked
    })

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
          <div className="d-flex">
            <ToggleSwitch
              name="root"
              id="root"
              onChange={rootChange}
              onClick={rootClick}
              checked={rootChecked}
            />
            <p className="ms-2 form-check-label">
              Root
            </p>
          </div>
          {permissions.map((permission, key) => (
            <div key={key} className="d-flex">
              <ToggleSwitch
                name="permissions"
                id={permission.permission}
                value={permission.permission}
                onChange={onChange}
                checked={isChecked[permission.permission]}
              />
              <p className="ms-2 form-check-label">
                {permission.label}
              </p>
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