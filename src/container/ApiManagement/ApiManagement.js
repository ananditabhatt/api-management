import React, { useState, useEffect } from 'react';
import img from '../../assets/background.png';
import { Parallax, Background } from 'react-parallax';
import { connect } from 'react-redux';
import classes from './ApiManagement.css';
import * as actionCreators from '../../store/actions/actionCreators';
import withErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler';
import axios from '../../axios-users';
import ErrorModal from '../../components/ErrorModal/ErrorModal';
import SuccessModal from '../../components/SuccessModal/SuccessModal'
import { updateAWSApi, generateAWSApiKey, deletAWSApiKey } from '../../PublicAPI/AWS/awsApiCalls';
import Modal from '../../components/UI/Modal/Modal';
import Footer from '../../components/Navigation/Footer/Footer';
import ApiContainer from '../../components/ApiContainer/ApiContainer';
import VideosPanel from '../../components/VideosPanel/VideosPanel';

const ApiManagement = props => {
    const [scopetable, populateScopeTable] = useState(null);
    const [deleteAPIWarning, populateDeleteAPIWarning] = useState(null);
    const [editModalData, populateEditModal] = useState(null);
    const [successModal, showSuccessModal] = useState(false);
    const [deleteWarningModal, showDeleteWarningModal] = useState(false);
    const [editModal, showEditModal] = useState(false);
    const [scopeModal, showScopeModal] = useState(false);
    const [showSpinnerForContent, toggleShowSpinnerForContent] = useState(false);
    const [errorModal, setErrorModal] = useState('');
    const [showSecret, setShowSecret] = useState(false);
    const [showKeyGen, setShowKeyGen] = useState(false);
    const [keyGenModalData, populateKeyGenModal] = useState(null);

    useEffect(() => {
        props.onGetUserData();
        props.onGetRoles();
        props.getUserProfile(props.userId);
    }, []);

    const deletAWSApiKeyHandler = key => {
        deletAWSApiKey(key, toggleShowSpinnerForContent, props.apiData, props.onDeleteUserData, setErrorModal);
    }

    const updateAWSApiHandler = data => {
        updateAWSApi(data, props.apiData, props.userId, props.onUpdateUserData, toggleShowSpinnerForContent, setErrorModal);

    }

    const generateAWSApiKeyHandler = (data, type) => {
        if (data == '' || data == null) {
            setErrorModal('Invalid Input Provided.');
            return;
        }
        generateAWSApiKey(data, type, props.userId, showSuccessModal, props.onPostUserData, setErrorModal);
    }
    return (
        <div>
            <div className={classes.content}>
                <Modal modalClosed={() => setErrorModal('')} show={errorModal}><ErrorModal error={errorModal} /></Modal>
                <Parallax
                    bgImage={img}
                    bgImageAlt="the cat"
                    strength={-200}>
                    <div style={{ height: '60vh', backgroundColor: '#000000cf', position: 'relative', overflow: 'hidden' }}>
                        <div className={classes.Container}>
                            <div className={classes.Title}><h3>Telstra API Home</h3></div>
                            <div className={classes.TitleText}><p>We're leading API and Service management platform that's always thriving to improve and expand.</p></div>
                        </div>
                    </div>
                </Parallax>
                <Parallax strength={300}>
                    <div style={{ height: '5vh' }}></div>
                    <Background className="custom-bg">
                        <img src={img} alt="fill murray" />
                    </Background>
                </Parallax>
                <Parallax
                    bgImage={img}
                    bgImageAlt="the dog"
                    strength={200}>
                    <ApiContainer
                        generateAWSApiKeyHandler={(data, type) => { generateAWSApiKeyHandler(data, type) }}
                        deletAWSApiKeyHandler={(data) => deletAWSApiKeyHandler(data)}
                        updateAWSApiHandler={(data) => updateAWSApiHandler(data)}
                        apiData={props.apiData}
                        scopeModal={scopeModal}
                        showScopeModal={showScopeModal}
                        scopetable={scopetable}
                        populateScopeTableHandler={(data) => { populateScopeTable(data); showScopeModal(true); }}
                        editModal={editModal}
                        showEditModal={showEditModal}
                        populateEditModal={(data) => { populateEditModal(data); showEditModal(true); }}
                        deleteWarningModal={deleteWarningModal}
                        showDeleteWarningModal={showDeleteWarningModal}
                        populateDeleteAPIWarning={(data) => { populateDeleteAPIWarning(data); showDeleteWarningModal(true); }}
                        deleteAPIWarning={deleteAPIWarning}
                        editModalData={editModalData}
                        showSpinnerForContent={showSpinnerForContent}
                        toggleShowSpinnerForContent={toggleShowSpinnerForContent}
                        isSuperUser={props.isSuperUser}
                        showSecret={showSecret}
                        setShowSecret={setShowSecret}
                        showKeyGen={showKeyGen}
                        setShowKeyGen={setShowKeyGen}
                        profileInfo={props.profileInfo}
                        keyGenModalData={keyGenModalData}
                        populateKeyGenModalHandler={(data) => { populateKeyGenModal(data); setShowKeyGen(true); }}
                        roles={props.roles}
                    />
                </Parallax>
                <Parallax strength={300}>
                    <div style={{ height: '5vh' }}></div>
                    <Background className="custom-bg">
                        <img src={img} alt="fill murray" />
                    </Background>
                </Parallax>
                <Parallax
                    bgImage={img}
                    bgImageAlt="the dog"
                    strength={200}>
                    <VideosPanel />
                </Parallax>
                <Parallax strength={300}>
                <div style={{ height: '20vh' }}/>
                    <div style={{ height: '60vh' }}>
                        <div className={classes.curveddiv}>
                            <svg viewBox="0 0 1440 319">
                                <path fill="#29545d" fill-opacity="1" d="M0,32L48,80C96,128,192,224,288,224C384,224,480,128,576,90.7C672,53,768,75,864,96C960,117,1056,139,1152,149.3C1248,160,1344,160,1392,160L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
                            </svg>
                        </div>
                        <Footer />
                    </div>
                    <Background className="custom-bg">
                        <img src={img} alt="fill murray" />
                    </Background>
                </Parallax>
                <SuccessModal showSuccessModal={showSuccessModal} successModal={successModal} />
            </div>
        </div>
    );

}
const mapDispatchToState = state => {
    return {
        apiData: state.manageUsersReducer.apiData,
        profileInfo: state.profilesReducer.profileInfo,
        userId: state.auth.userId,
        isSuperUser: state.profilesReducer.isSuperUser
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onGetUserData: () => dispatch(actionCreators.getUserData()),
        getUserProfile: (userId) => dispatch(actionCreators.getUserProfile(userId)),
        onGetRoles: () => dispatch(actionCreators.getRoles()),
        onDeleteUserData: (userId) => dispatch(actionCreators.deleteUserData(userId)),
        onUpdateUserData: (userData, key) => dispatch(actionCreators.updateUserData(userData, key)),
        onPostUserData: (userData) => dispatch(actionCreators.postUserData(userData))
    }
}

export default connect(mapDispatchToState, mapDispatchToProps)(withErrorHandler(ApiManagement, axios));
