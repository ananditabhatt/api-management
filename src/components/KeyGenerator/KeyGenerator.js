import React from 'react';
import Modal from '../UI/Modal/Modal'
import classes from './KeyGenerator.css'
import KeyGenModal from './KeyGenModal';

const KeyGenerator = props => {

    const getKeyGen = props => {
        const keyGenData = (<KeyGenModal
            showKeyGen={props.showKeyGen}
            setShowKeyGen={props.setShowKeyGen}
            generateAWSApiKeyHandler={(data, type) => {props.generateAWSApiKeyHandler(data, type)}} />);

        props.populateKeyGenModalHandler(keyGenData);
    };


    return (
        <div className={classes.KeyGeneratorContainer}>
            <span className={classes.AddContainer}>
                <i onClick={() => { getKeyGen(props) }} className="material-icons medium">add_circle</i></span>
            <span onClick={() => { getKeyGen(props) }}  className={classes.AddContainer}>
                <h5><strong>Generate New API Key</strong></h5>
            </span>
            <Modal modalClosed={() => props.setShowKeyGen(false)} show={props.showKeyGen}>{props.keyGenModalData}</Modal>
        </div>
    );

}

export default KeyGenerator
