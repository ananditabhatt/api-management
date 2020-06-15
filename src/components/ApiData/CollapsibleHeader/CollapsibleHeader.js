import React from 'react';

const collapsibleHeader = props => (
    <div className="collapsible-header">
        <i className="material-icons">arrow_drop_down</i>
        <div className="col s12"><span>{props.name}</span></div>
        {props.enabled ? <i style={{ color: 'green' }} className="material-icons transparent">radio_button_checked</i> :
            <i style={{ color: '#EBEBE4' }} className="material-icons transparent">radio_button_checked</i>}
    </div>
)

export default collapsibleHeader;
