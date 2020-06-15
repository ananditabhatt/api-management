import React from 'react';
import classes from './ScopeTable.css'

const scopeTable = props => {

    const title = ['Scope', 'Read', 'Write'];
    let header = [];
    for (let keys in title) {
        header.push(<th>{title[keys]}</th>);
    }

    const getScopeInfo = (details) => {
        let data = [];
        if (details != undefined) {
            Object.keys(details.scope).map((scopeType) => {
                data.push(
                    <tr key={scopeType}>
                        <td><i>{scopeType}</i></td>
                        <td>{details.scope[scopeType].read ?
                            <i style={{color:'green'}} className="material-icons">check</i> :
                            <i style={{color:'red'}} className="material-icons">clear</i>}</td>
                        <td>{details.scope[scopeType].write ?
                            <i style={{color:'green'}} className="material-icons">check</i> :
                            <i style={{color:'red'}} className="material-icons">clear</i>}</td>
                    </tr>);
            });
            return data;
        }
    }

    return (
        <table className={classes.ScopeTable}>
            <tr>{header}</tr>
            <tbody>
                {getScopeInfo(props.details)}
            </tbody>
        </table>
    );
}

export default scopeTable;
