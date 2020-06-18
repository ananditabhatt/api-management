import React from 'react';
import classes from './CardContainer.css';
import Popover from '../../UI/PopOver/PopOver'

const cardContainer = props => {

    let tempSecret = 'Show';

    const updateSecret = (props) => {
        props.setShowSecret(!props.showSecret)
    }

    const contentText = props => {
        let content = [];
        console.log("props here are ",props);
        if (props.content != null) {
            for (let key in props.content) {
                if (key === 'Secret ID' && !props.showSecret) {
                    content.push(<div key={key} className={classes.contentdiv}><div className={classes.contentvalue}><b>{key}</b></div>
                        <div className={classes.Secret}>
                            <Popover value={props.content[key]} tempVal={tempSecret}/>
                        </div>
                    </div>);
                }else if (key === 'Status'){
                    content.push(<div className={classes.contentdiv} key={key} ><div className={classes.contentvalue}><b>{key}</b></div>
                        <i >{(props.content[key] == true)?
                        <i style={{color:'green' , marginLeft:'12px'}} class="material-icons">check</i>:
                        <i style={{color:'red', marginLeft : '12px'}} class="material-icons">do_not_disturb</i>}</i></div>)
                }
                else {
                    content.push(<div className={classes.contentdiv} key={key} ><div className={classes.contentvalue}><b>{key}</b></div>
                        <i >{props.content[key]}</i></div>);
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
                        content.push(<div    style={{ marginRight: "66px" }}className={classes.TextFieldsBtns}><a onClick={(details) => { props.getScopeTable(props.details) }}><u>{props.buttons[keys].id}</u></a></div>);
                        break;
                    case 'handleEditRequest':
                        content.push(<div style={{ marginRight: "66px" }} className={classes.TextFieldsBtns}><a onClick={(details) => { props.handleEditRequest(props.details) }} ><i className="material-icons">{props.buttons[keys].id}</i></a></div>)
                        break;
                    case 'handleDeleteRequest':
                        content.push(<div style={{ marginRight: "66px" }} className={classes.TextFieldsBtns}><a onClick={(details) => { props.handleDeleteRequest(props.details) }} ><i className="material-icons">{props.buttons[keys].id}</i></a></div>)
                        break;
                }
            }
            return content;
        };

    }    

    return (
        <div>
            {contentText(props)}
           <div style={{display:"flex"}}>{contentBtns(props)}</div> 
        </div>
    );
}

export default cardContainer;