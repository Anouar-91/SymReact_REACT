import React from 'react'


function field({name, label, value, onChange, placeholder, type="text", error = "", required = false}) {
  return (
    <div className="form-group">
    <label htmlFor={name}>{label}</label>
    <input required={required && "true" } onChange={onChange} value={value} type={type} placeholder={placeholder}
        className={(!error ? "form-control" : "form-control is-invalid")} id={name} name={name} />
    {error && <p className="invalid-feedback">{error}</p>}
</div>
  )
}

export default field