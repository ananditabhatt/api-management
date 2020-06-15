import React, { useEffect } from 'react';
import Input from '../../UI/Input/Input';
import M from 'materialize-css';
import CustomButton from '../../UI/Button/Button'
import classes from './UpdateApiCard.css';

const updateApiCard = props => {
    let temporaryDisabled = false;
    let tempValue = '';

    useEffect(() => {
        M.FormSelect.init(document.querySelectorAll('select'), {});
    }, []);

    const config = {
        type: 'text',
        placeholder: 'Name'
    }

    const closeApiCard = () => {
        props.showEditModal(false)
    }
    const saveApiCard = (details) => {
        let updatedData = { ...details };
        updatedData.name = tempValue;
        updatedData.enabled = !temporaryDisabled;
        props.updateApiCardSaveHandler(updatedData);
        props.showEditModal(false)
    }
    const onToggleState = (e) => {
        if (e.target.value == 'disabled') {
            temporaryDisabled = true
        } else {
            temporaryDisabled = false
        }
        console.log("temporaryDisabled TO : ", temporaryDisabled);
    }
    const inputChangeListener = (e) => {
        tempValue = e.target.value
    }

    console.log(" props.tempToggleState , props.tempToggleState", props.tempToggleState);
    return (
        <div className={classes.CardContainer}>
            <div>
                <div className={classes.CardTtitle} >Update API</div>
                <li class="divider" style={{backgroundColor:'#908d8d61'}} tabindex="-1"></li>
                <div className={classes.InputTextField}>
                    <span><h6><b>API Name</b></h6></span>
                    <i><span><Input
                        key={props.data.client_id}
                        elementType='input'
                        elementConfig={config}
                        inValid={false}
                        defaultValue={props.data.name}
                        ShouldValidate={false}
                        changed={(e) => { inputChangeListener(e) }} />
                    </span></i>
                </div>
                <div className={classes.InputTextField}>
                    <span><h6><b>Status</b></h6>
                        <form action="#"><p><label className={classes.Label}>
                            {props.data.enabled ? <input onClick={(e) => { onToggleState(e) }} className="with-gap" name="group1" value='enabled' type="radio" checked /> :
                                <input onClick={(e) => { onToggleState(e) }} className="with-gap" name="group1" value='enabled' type="radio" />}<span>Enabled</span>
                        </label></p>
                            <p><label className={classes.Label}>
                                {props.data.enabled ? <input onClick={(e) => { onToggleState(e) }} className="with-gap" name="group1" value="disabled" type="radio" /> :
                                    <input onClick={(e) => { onToggleState(e) }} className="with-gap" name="group1" value="disabled" checked type="radio" />}<span>Disabled</span>
                            </label></p>
                        </form>
                    </span>
                </div>
                <div className={classes.DelBtns}>
                    <CustomButton btnType='Success' clicked={() => { saveApiCard(props.data) }} >
                        <i className="material-icons">check</i>
                    </CustomButton>
                    <CustomButton btnType='Danger' clicked={() => { closeApiCard() }}>
                        <i className="material-icons">clear</i>
                    </CustomButton>
                </div>
            </div>
        </div>);
}

export default updateApiCard;