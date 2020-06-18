import React, { useEffect } from 'react';
import M from 'materialize-css';
import classes from './ApiData.css';
import Modal from '../UI/Modal/Modal';
import ScopeTable from './ScopeTable/ScopeTable'
import UpdateApiCard from './UpdateApiCard/UpdateApiCard';
import apiImg from './../../assets/api2.jpg';
import CollapsibleHeader from './CollapsibleHeader/CollapsibleHeader';
import CollapsibleBody from './CollapsibleBody/CollapsibleBody';
import DeleteWarningModal from './DeleteWarningModal/DeleteWarningModal';
import Card from '../../components/UI/Card/Card';
import CardContainer from './CardContainer/CardContainer';

const apiData = props => {

    const fields = {
        'client_id': 'Client ID',
        'value': 'Secret ID',
        'lastUpdatedDate': 'Modified',
        "enabled": 'Status'
    };

    const btns = [
        { id: 'Scope', handler: 'getScopeTable' },
        { id: 'edit', handler: 'handleEditRequest' },
        { id: 'delete', handler: 'handleDeleteRequest' }];

    const textFieldsCollapsiblebodyObj = {
        'client_id': 'Client ID',
        'value': 'Secret',
        'lastUpdatedDate': 'Last Modified',
    };
    const btnsCollapsibleObject = [
        { id: 'Scope', handler: 'getScopeTable' },
        { id: 'edit', handler: 'handleEditRequest' },
        { id: 'delete', handler: 'handleDeleteRequest' }];

    useEffect(() => {
        M.Collapsible.init(this.Collapsible4);
        M.FormSelect.init(document.querySelectorAll('select'), {});
    }, []);

    //Scope Modal.
    const getScopeTable = (details) => {
        console.log("The details are : ", details);
        const tableData = (<ScopeTable details={details} />);
        props.populateScopeTableHandler(tableData);
    };

    // CollapsibleBody Section.
    const getCollapsibleBody = details => {
        let collapsibleBodyObject = {};
        if (props.apiData != undefined) {
            for (let keys in textFieldsCollapsiblebodyObj) {
                collapsibleBodyObject[textFieldsCollapsiblebodyObj[keys]] = details[keys];
            }
        }
        return <CollapsibleBody
            details={details}
            showSecret={props.showSecret}
            setShowSecret={props.setShowSecret}
            isSuperUser={props.isSuperUser}
            handleEditRequest={(details) => handleEditRequest(details)}
            handleDeleteRequest={(details) => handleDeleteRequest(details)}
            getScopeTable={(details) => getScopeTable(details)}
            content={collapsibleBodyObject}
            buttons={btnsCollapsibleObject} />;
    }
    // get cards
    const getCards = details => {
        let cards = [];
        let dataObj = {};
            for (let keys in fields) {
                dataObj[fields[keys]] = details[keys];
            }
            let cardTitle = details.name;
            const cardBody = (<CardContainer
                details={details}
                showSecret={props.showSecret}
                setShowSecret={props.setShowSecret}
                isSuperUser={props.isSuperUser}
                handleEditRequest={(details) => handleEditRequest(details)}
                handleDeleteRequest={(details) => handleDeleteRequest(details)}
                getScopeTable={(details) => getScopeTable(details)}
                content={dataObj}
                buttons={btns} />);
            cards.push(<div style={{width: '98%'}}> <Card url = 'https://chrome.google.com/webstore/detail/postman/fhbjgbiflinjbdggehcddcbncdddomop?hl=en' className='MuiPaper-rounded' test={true} image={apiImg} title={cardTitle} subvalue={cardBody} /></div>);
        return(cards);     
    }


    //Delete Api warning
    const handleDeleteRequest = details => {
        console.log("ON DELETE ",details);
        let dataModal = (
            <DeleteWarningModal
                details={details}
                deletAWSApiKeyHandler={(id) => props.deletAWSApiKeyHandler(id)}
                showDeleteWarningModal={props.showDeleteWarningModal}
            />
        )
        props.populateDeleteAPIWarning(dataModal)
    }
    //Edit Api card.
    const handleEditRequest = details => {
        let updateModal = (
            <UpdateApiCard
                updateApiCardSaveHandler={updateApiCardSaveHandler}
                showEditModal={props.showEditModal}
                data={details} />
        )
        props.populateEditModal(updateModal);
    }
    const updateApiCardSaveHandler = (details) => {
        console.log("data in updateApiCardSaveHandler ", details);
        let updatedData = { ...details }
        props.updateAWSApiHandler(updatedData);
    }

    // formating Api data to an array to create structure.
    let dataArray = [];
    if (props.apiData != undefined && props.apiData != null) {
        Object.keys(props.apiData).map((userInfo) => {
            for (let key in props.apiData[userInfo]) {
                if (props.apiData[userInfo][key].userId === props.profileInfo.userId) {
                    dataArray.push({
                        id: key,
                        details: props.apiData[userInfo][key]
                    })
                } else if (props.isSuperUser) {
                    dataArray.push({
                        id: key,
                        details: props.apiData[userInfo][key]
                    })
                }
            }
        });
    } 
    //sort array by date
    let dataArray2 = Object.keys(dataArray).sort((a,b) => {
            console.log("a is :",dataArray[a].details.lastUpdatedDate);
            console.log("b is :",dataArray[b]);
            return Date.parse(dataArray[a].details.lastUpdatedDate)  > Date.parse(dataArray[b].details.lastUpdatedDate)

    });
    
    // Api Data Structure
    const structure = dataArray.map(data => {
        return (
            <div>
            {getCards(data.details)}
            </div>
            );
    });

    return (
        <div>
            <Modal modalClosed={() => props.showScopeModal(false)} show={props.scopeModal}>{props.scopetable}</Modal>
            <Modal modalClosed={() => props.showEditModal(false)} show={props.editModal}>{props.editModalData}</Modal>
            <Modal modalClosed={() => props.showDeleteWarningModal(false)} show={props.deleteWarningModal}>{props.deleteAPIWarning}</Modal>
            <div className={classes.Container}>
                {/* {getCards(props)} */}
                {structure}
            </div>
        </div>
    );
}

export default apiData;