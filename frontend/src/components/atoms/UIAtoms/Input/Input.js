import React from 'react';
import c from './Input.module.scss';

const input = (props) => {
  let inputElement = null;
  let labelElement = null;
  let classNames = Array.isArray(props.className) ? 
    [c.Input, ...props.className] : props.className ? 
    [c.Input, props.className] : [c.Input];

  if(props.invalid) {
    classNames.push(c.Input_invalid);
  }

  switch(props.inputType) {
    case 'select':
      break;
    case 'submit': 
      inputElement = props.src ? 
        <img 
          className={classNames.join(' ')}
          src={props.src} 
          alt={props.alt}
          onClick={props.func} /> :
        <input
          className={classNames.join(' ')}
          {...props.inputConfig}
          value={props.value}
          onChange={props.func} />;
      break;
    case 'text':
      inputElement = <input
        className={classNames.join(' ')}
        {...props.inputConfig}
        value={props.value}
        onChange={props.func} />;
      break;
    case 'textarea':
      inputElement = <input
        className={classNames.join(' ')}
        {...props.inputConfig}
        value={props.value}
        onChange={props.func} />;
      break;
    default:
      inputElement = <input
        className={classNames.join(' ')}
        {...props.inputConfig}
        value={props.value}
        onChange={props.func} />;
      break;
  }

  if(props.label) {
    labelElement = <label htmlFor={props.id}>{props.label}</label>;
  }

  return ( 
    <>
      {labelElement}
      {inputElement}
    </>
  );
}
 
export default input;