import React from 'react';
import classes from './Button.css';

const Button = props => {
	return <div className={classes.Button} onClick={props.onClick}>{props.placeholder}</div>
}



export default Button