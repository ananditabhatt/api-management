import React from 'react';
import classes from './Input.css';
import ReactTooltip from "react-tooltip";


const Input = (props) => {
    let inputElement = null;
    let validationError = null;
    const inputClasses = [classes.InputElement];
    console.log("props in input ",props);
    if (props.invalid && props.ShouldValidate && props.touched) {
        inputClasses.push(classes.Invalid);
        if(props.classes !=undefined)
        inputClasses.push(props.classes);
        validationError = <p style={{color:'red'}}>Please enter a valid {props.elementConfig.placeholder}</p>
    }

    switch (props.elementType) {
        case ('input'):
            inputElement = <input required defaultValue={props.defaultValue} className={classes.Validate}
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
      <div className={classes.Input} style={{display:"flex"}}>
        <div style={{margin: "auto",height: "auto",padding: "7px"}}>
          <i data-tip={props.tooltip} class="fa fa-info-circle"></i>

    
          <ReactTooltip />
        </div>
        <div  style={{height: "auto", width: "59vh",marginRight: "33px"}}  >
          <label className={classes.Label}> {props.label}</label>
          
          {inputElement}
        </div>
        {/* {validationError} */}
      </div>
    );
}

export default Input;