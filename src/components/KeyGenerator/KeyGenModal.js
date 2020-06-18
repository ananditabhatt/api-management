import React, { useEffect, useState } from 'react';
import Input from '../UI/Input/Input'
import CustomButton from '../UI/Button/Button'
import classes from './KeyGenerator.css'

const keyGenerator = props => {
    
    const [keyGenTempVal, setKeyGenTempVal] = useState('');
    const [keyGenTempType, setKeyGenTempType] = useState('messaging');

    const inputChangeListner = event => {
        setKeyGenTempVal(event.target.value);
    }
    
    const onToggle = e => {
        setKeyGenTempType(e.target.value)
    }

    const generateKey = (event) => {
        event.preventDefault();
        props.setShowKeyGen(false);
        props.generateAWSApiKeyHandler(keyGenTempVal, keyGenTempType);
        setKeyGenTempVal('');
        setKeyGenTempType("messaging");
    }

    return (
        <div>
            <div className={classes.TitleKey}><h5><strong>Generate New API Key</strong></h5></div>
            <form onSubmit={(event) => { generateKey(event) }}  >
                <input value={keyGenTempVal} placeholder='API Name' required onChange={inputChangeListner} />
                <div style={{display: 'flex'}}>
                <p>
                    <label style={{marginRight: '7vh'}}>
                        <input onClick={(e) => { onToggle(e) }} name="group1" type="radio" value="messaging" checked />
                        <span>Messaging API</span>
                    </label>
                </p>
                <p>
                    <label>
                        <input  onClick={(e) => { onToggle(e) }} name="group1" type="radio" value='iot' />
                        <span>IOT API</span>
                    </label>
                </p>
                </div>
                <CustomButton clicked={(event) => { generateKey(event) }} classes={classes.btn}><span>Generate</span></CustomButton>
            </form>
        </div>
    );

}

export default keyGenerator;
