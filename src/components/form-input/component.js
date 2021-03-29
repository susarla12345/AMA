import React from 'react';
import '../form-input/styles.scss';

const FormInput = (props) => {
  return (
    <div className="form-input">
      <div>
        <label className="form-input__label">{props.label}</label>
      </div>
      <input 
        name={props.name}
        type={props.type}
        placeholder={props.placeholder}
        onChange={props.onChange}
        value={props.value}
      />
    </div>
  )
}

export default FormInput;