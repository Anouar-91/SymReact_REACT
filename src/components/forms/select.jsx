import React from 'react'

function select({name, value, label, error="", onChange,children }) {
  return (
    <div className="form-group">
    <label htmlFor={name}>{label}</label>
    <select value={value} onChange={onChange} name={name} id={name} className={"form-control" + (error && " is-invalid")}>
       {children}
    </select>
    <p className="invalid-feedback">{error}</p>
</div>

  )
}

export default select