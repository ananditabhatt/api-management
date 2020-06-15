import React, { useEffect } from 'react';
import classes from './CollapsibleBody.css';
import Popover from '../../UI/PopOver/PopOver'

const collapsibleBody = props => {
    let tempSecret = 'Show';

    const updateSecret = (props) => {
        props.setShowSecret(!props.showSecret)
    }

    const contentText = props => {
        let content = [];
        if (props.content != null) {
            for (let key in props.content) {
                if (key === 'Secret' && !props.showSecret) {
                    content.push(<span key={key} className={classes.TextFieldsValues}><h6><b>{key}</b></h6>
                        <span className={classes.Secret}>
                            <Popover value={props.content[key]} tempVal={tempSecret}/>
                        </span>
                    </span>);
                }
                else {
                    content.push(<span key={key} className={classes.TextFieldsValues}><h6><b>{key}</b></h6>
                        <a className={classes.Secret} onClick={(e, val) => { updateSecret(props) }}>{props.content[key]}</a></span>);
                }
            }
            return content;
        };

    }
    const contentBtns = props => {
        let content = [];
        if (props.buttons != null) {
            for (let keys in props.buttons) {
                switch (props.buttons[keys].handler) {
                    case 'getScopeTable':
                        content.push(<span className={classes.TextFieldsValues}><a onClick={(details) => { props.getScopeTable(props.details) }}><u>{props.buttons[keys].id}</u></a></span>);
                        break;
                    case 'handleEditRequest':
                        if (props.isSuperUser)
                            content.push(<span className={classes.TextFieldsValues}><a onClick={(details) => { props.handleEditRequest(props.details) }} ><i className="material-icons">{props.buttons[keys].id}</i></a></span>)
                        break;
                    case 'handleDeleteRequest':
                        if (props.isSuperUser)
                            content.push(<span className={classes.TextFieldsValues}><a onClick={(details) => { props.handleDeleteRequest(props.details) }} ><i className="material-icons">{props.buttons[keys].id}</i></a></span>)
                        break;
                }
            }
            return content;
        };

    }
    return (
        <div className={classes.TextFields}>
            {contentText(props)}
            {contentBtns(props)}
        </div>
    );
}

export default collapsibleBody;
