/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import './Smurf.css';

const Smurf = props => {
  return (
    <div className="Smurf">
      <h3>
        {props.name}
      </h3>
      <strong>
        {props.height} tall
      </strong>
      <p>
        {props.age} smurf years old
      </p>
      <button onClick={event => {props.deleteSmurf(event, props.id)}}>delete</button>
    </div>
  );
};

Smurf.defaultProps = {
  name: '',
  height: '',
  age: ''
};

export default Smurf;

