import React from 'react';
import classes from './ApiContainer.css';
import ReactPlayer from 'react-player';
import ApiData from '../../components/ApiData/ApiData';
import Spinner from '../../components/UI/Spinner/Spinner';
import KeyGenerator from '../../components/KeyGenerator/KeyGenerator';

const apiContainer = props => {
    return (
            <div className={classes.Container}>
                <div>
                    <KeyGenerator
                        showKeyGen={props.showKeyGen}
                        setShowKeyGen={props.setShowKeyGen}
                        keyGenModalData={props.keyGenModalData}
                        populateKeyGenModalHandler={(data) => {props.populateKeyGenModalHandler(data)}}
                        generateAWSApiKeyHandler={(data, type) => {props.generateAWSApiKeyHandler(data, type)}} />
                    {(props.apiData && !props.showSpinnerForContent && props.profileInfo) ?
                        <ApiData
                            deletAWSApiKeyHandler={(data) => props.deletAWSApiKeyHandler(data)}
                            updateAWSApiHandler={(data) => props.updateAWSApiHandler(data)}
                            apiData={props.apiData}
                            scopeModal={props.scopeModal}
                            showScopeModal={props.showScopeModal}
                            scopetable={props.scopetable}
                            populateScopeTableHandler={(data) => { props.populateScopeTableHandler(data); props.showScopeModal(true); }}
                            editModal={props.editModal}
                            showEditModal={props.showEditModal}
                            populateEditModal={(data) => { props.populateEditModal(data); props.showEditModal(true); }}
                            deleteWarningModal={props.deleteWarningModal}
                            showDeleteWarningModal={props.showDeleteWarningModal}
                            populateDeleteAPIWarning={(data) => { props.populateDeleteAPIWarning(data); props.showDeleteWarningModal(true); }}
                            deleteAPIWarning={props.deleteAPIWarning}
                            editModalData={props.editModalData}
                            showSpinnerForContent={props.showSpinnerForContent}
                            toggleShowSpinnerForContent={props.toggleShowSpinnerForContent}
                            isSuperUser={props.isSuperUser}
                            showSecret={props.showSecret}
                            setShowSecret={props.setShowSecret}
                            profileInfo={props.profileInfo}
                            roles={props.roles} /> : <Spinner />}
                </div>
                {/* <div className={classes.playerWrapper}>
                    <ReactPlayer
                        url='https://youtu.be/BwNG1Wnrq88'
                        className={classes.reactPlayer}
                        muted={true}
                        playing
                        width='100%'
                        height='100%'
                    />
                </div> */}
            </div>
    );
}

export default apiContainer;