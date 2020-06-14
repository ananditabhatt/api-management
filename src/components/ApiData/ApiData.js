import React, { useEffect } from 'react';
import M from 'materialize-css';
import Modal from '../UI/Modal/Modal';
import Input from '../UI/Input/Input'

const apiData = props => {

    useEffect(() => {
        M.Collapsible.init(this.Collapsible4);
        //let elems = document.querySelectorAll('select');
        M.FormSelect.init(document.querySelectorAll('select'), {});
        M.updateTextFields();
    }, []);

    const warningPopUp = data => {
        console.log("data : ", data)
        return (<Modal show={true} modalClosed={() => { deleteHandler(data) }}>Would you like to delete {data.name} ? </Modal>);
    }
    const deleteHandler = (data) => {
        console.log("deleteHandler data", data)
        props.deletAWSApiKey(data.client_id)
    }

    const UpdateNameHandler = (data) => {
        console.log("UpdateHandler data", data)
        props.updateAWSApiName(data);
    }
    const updateNewName = (event) => {
        console.log("event value", event.target.value);

    }

    const toggleApiHandler = (data) => {
        console.log("UpdateHandler data", data)
        let toggledData = { ...data };
        toggledData.enabled = !data.enabled;
        props.toggleAWSApiKey(toggledData);
    }

    const scopeTable = (details) => {
        let data = [];
        if (details != undefined) {
            console.log("details ", details);
            Object.keys(details.scope).map((scopeType) => {
                console.log("scopeType : ", scopeType);
                data.push(
                    <tr key={scopeType}>
                        <td>{scopeType}</td>
                        <td>{details.scope[scopeType].read ?
                            <i className="material-icons">check</i> :
                            <i className="material-icons">clear</i>}</td>
                        <td>{details.scope[scopeType].write ?
                            <i className="material-icons">check</i> :
                            <i className="material-icons">clear</i>}</td>
                    </tr>);
            });
            return data;
        }
    }

    let dataArray = [];
    if (props.apiData != undefined) {
        Object.keys(props.apiData).map((userInfo) => {
            console.log("userInfo : ", props.apiData[userInfo]);
            for (let key in props.apiData[userInfo]) {
                console.log();
                dataArray.push({
                    id: key,
                    details: props.apiData[userInfo][key]
                })
            };
        });
    }

    const getScopeTable = (data) => (
        <table>
            <thead>
                <tr>
                    <th>Scope</th>
                    <th>Read</th>
                    <th>Write</th>
                </tr>
            </thead>
            <tbody>
                {scopeTable(data.details)}
            </tbody>
        </table>
    );

    const structure = dataArray.map(data => {
        console.log("data : ", data);
        return (
            <li key={data.id}>
                <div className="collapsible-header">
                    <i className="material-icons">arrow_drop_down</i>
                    <div className="col s3"><span>{data.details.name}</span></div>
                    <div className="col s3"><span>{data.details.client_id} </span></div>
                    <div className="col s3"><span>{data.details.role} </span></div>
                    {data.details.enabled ? <a onClick={() => { toggleApiHandler(data.details) }} className="btn-floating btn-small waves-effect waves-light green"><i className="material-icons">check</i></a> :
                        <a onClick={() => { toggleApiHandler(data.details) }} className="btn-floating btn-small waves-effect waves-light red"><i className="material-icons">close</i></a>}
                </div>
                <div className="collapsible-body">
                    <a onClick={() => { deleteHandler(data.details) }} className="btn-floating btn-large waves-effect waves-light red"><i className="material-icons">delete</i></a>
                    <a onClick={() => { UpdateNameHandler(data.details) }} className="btn-floating btn-large waves-effect waves-light red"><i className="material-icons">save</i></a>
                    <div className="row">
                        <div className="col s6">s
                            <div className="section">
                                <div className="row">
                                    <div className="input-field col s6">
                                        <input disabled value={data.details.client_id} type="text" className="validate" />
                                        <label>Client Id :</label>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="input-field col s6">
                                        {props.elementArray.map(element => (
                                            <Input
                                                key={element.id}
                                                elementType={element.config.elementType}
                                                elementConfig={element.config.elementConfig}
                                                value={element.config.value}
                                                invalid={!element.config.valid}
                                                touched={element.config.touched}
                                                // ShouldValidate={element.config.validation}
                                                changed={(event) => { props.inputChangeListner(event, element.id) }}
                                            />))}
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="input-field col s6">
                                        <input disabled value={data.details.value} id="disabled" type="text" className="validate" />
                                        <label>Secret :</label>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="input-field col s6">
                                        <select>
                                            <option selected={data.details.enabled} value="true">true</option>
                                            <option selected={!data.details.enabled} value="false">false</option>
                                        </select>
                                        <label>Enabled</label>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="input-field col s6">
                                        <input disabled value={data.details.lastUpdatedDate} id="disabled" type="text" className="validate" />
                                        <label>Last Updated Date Id :</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col s6">
                            <div className="section">
                                {getScopeTable(data)}
                            </div>
                        </div>
                    </div>
                </div>
            </li>);
    });

    return (
        <div className="container">
            <div className="row">
                {/* <nav>
                    <div className="nav-wrapper">
                        <ul>
                        <li className="col s3 ">Name</li>
                        <li className="col s5" >Client ID</li>
                        <li className="col s4">Role</li>
                        </ul>
                    </div>
                </nav> */}
                <ul ref={Collapsible => { this.Collapsible4 = Collapsible; }}
                    className="collapsible popout">
                    <div style={{ width: '93%', marginLeft: '44px' }} className="collapsible-header">
                        <div className="col s3"><span>Name</span></div>
                        <div className="col s3"><span>Client ID</span></div>
                        <div className="col s3"><span>Client ID </span></div>
                    </div>
                    {structure}
                </ul>
            </div>
        </div>
    );
}

export default apiData;