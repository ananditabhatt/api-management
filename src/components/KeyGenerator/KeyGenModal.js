import React, { useEffect, useState } from 'react';
import Input from '../UI/Input/Input'
import CustomButton from '../UI/Button/Button'
import classes from './KeyGenerator.css'

const keyGenerator = props => {

    const [keyGenTempVal, setKeyGenTempVal] = useState('');

    const inputChangeListner = event => {
        setKeyGenTempVal(event.target.value);
    }

    const generateKey = (event) => {
        event.preventDefault();
        props.setShowKeyGen(false);
        props.generateAWSApiKeyHandler(keyGenTempVal)
        setKeyGenTempVal('');
    }
 
    return (
        <div>
            <div className={classes.TitleKey}><h5><strong>Generate New API Key</strong></h5></div>
            <form onSubmit={(event) => { generateKey(event) }}  >
                <input value={keyGenTempVal} placeholder='API Name' required  onChange={inputChangeListner}/>
                <CustomButton  clicked={(event) => { generateKey(event) }} classes={classes.btn}><span>Generate</span></CustomButton>
            </form>
        </div>
    );

}

export default keyGenerator;
