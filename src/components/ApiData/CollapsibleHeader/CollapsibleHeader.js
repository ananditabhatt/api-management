import React from 'react';
import statusGreen from '../../../assets/green.jpg';
import redGreen from '../../../assets/red.png';

const collapsibleHeader = props => (
    <div style={{backgroundColor:'#1f4c54bf'}} className="collapsible-header">
        <i className="material-icons">keyboard_arrow_right</i>
        <div style={{color:'white', width:'83%'}} className="col s12"><span>{props.name}</span></div>
        {props.enabled ? <i><img src={statusGreen} width='25px' alt='Enabled' /></i> :
            <i><img src={redGreen} width='23px' alt='Disabled' /></i>}
    </div>
)

export default collapsibleHeader;
