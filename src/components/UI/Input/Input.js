import React from 'react';
import classes from './Input.css';

const Input = (props) => {
    let inputElement = null;
    let validationError = null;
    const inputClasses = [classes.InputElement];
    if (props.invalid && props.ShouldValidate && props.touched) {
        inputClasses.push(classes.Invalid);
        validationError = <p>Please enter a valid {props.elementConfig.placeholder}</p>
    }

    switch (props.elementType) {
        case ('input'):
            inputElement = <input defaultValue={props.defaultValue} className='validate'
                {...props.elementConfig}
                onChange={props.changed}
                value={props.value} />
            break;
        case ('textarea'):
            inputElement = <textarea className={inputClasses.join(' ')}
                {...props.elementConfig}
                onChange={props.changed}
                value={props.value} />
            break;
        case ('select'):
            inputElement = (
                <select className={inputClasses.join(' ')}
                    onChange={props.changed}
                    value={props.value}>
                    {props.elementConfig.options.map(optns => (
                        <option key={optns.value} value={optns.value}>
                            {optns.displayName}
                        </option>))}
                </select>);
            break;
        default:
            inputElement = <input className={inputClasses.join(' ')}
                onChange={props.changed}
                {...props.elementConfig}
                value={props.value} />
    }

    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
            {validationError}
        </div>
    );
}

export default Input;