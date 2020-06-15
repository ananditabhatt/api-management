import React from 'react';

const collapsibleHeader = props => (
    <div style={{backgroundColor:'#ffffffa1'}} className="collapsible-header">
        <i className="material-icons">keyboard_arrow_right</i>
        <div className="col s12"><span>{props.name}</span></div>
        {props.enabled ? <i style={{ color: 'green' }} className="material-icons transparent">radio_button_checked</i> :
            <i style={{ color: '#EBEBE4' }} className="material-icons transparent">radio_button_checked</i>}
    </div>
)

export default collapsibleHeader;
