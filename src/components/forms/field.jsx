import React from 'react'


function field({name, label, value, onChange, placeholder, type="text", error = ""}) {
  return (
    <div className="form-group">
    <label htmlFor={name}>{label}</label>
    <input onChange={onChange} value={value} type={type} placeholder={placeholder}
        className={(!error ? "form-control" : "form-control is-invalid")} id={name} name={name} />
    {error && <p className="invalid-feedback">{error}</p>}
</div>
  )
}

export default field