import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './general.css';

const Input = ({ label, type, className, value, setValue, icon, inputAttributes }) => {
  const handleInput = (event) => {
    setValue(event.target.value);
  };

  return (
    <div className={`input-wrapper ${className || ''}`}>
      <label>{label}</label>
      <div className="input-container">
        {icon && <FontAwesomeIcon icon={icon} />}
        <input type={type} value={value} onChange={handleInput} {...inputAttributes} />
      </div>
    </div>
  );
};

export default Input;