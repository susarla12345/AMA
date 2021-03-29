import React from 'react';
import '../form-button/styles.scss';

const Button = (props) => {
    return (
        <button 
          type={props.type}
          className={`button ${props.buttonClass}`}
          onClick={props.onClick}>
            {props.children}
        </button>
    )
}

export default Button;