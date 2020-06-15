import React from 'react';
import classes from './Dropdown.css';

const customDropDown = (props) => {
    let option = (
        props.dropDownOptions.map((e, key) => {
            console.log(" e in ", e);
            return (<option key={key} value={e}>{e}</option>);
        }));
    let menu = (
        <select onChange={props.dropDownSelected} name="action">
            <option value='' defaultValue=''>Actions</option>)
            {option}
        </select>
    )
    return (
        <div className={[classes.Dropdown, props.classes].join(' ')} >
            {menu}
        </div>
    );

}

export default customDropDown;