import React from 'react';
import Input from '../UI/Input/Input'
import CustomButton from '../UI/Button/Button'
import classes from './KeyGenerator.css'

const KeyGenerator = props => {

    const checkValidity = (value, validation) => {
        let isValid = true
        console.log(" value ", value);
        if (validation && validation.required) {
            isValid = value.trim() !== '' && isValid;
        }
        return isValid;
    }

    const inputChangeListner = (event, id) => {
        switch (id) {
            case 'keyGeneratorName':
                const updatedElements = { ...props.keyGeneratorElements };
                const updatedElement = { ...updatedElements[id] };
                updatedElement.value = event.target.value;
                updatedElement.touched = true;
                updatedElement.valid = checkValidity(updatedElement.value, updatedElement.validation)
                updatedElements[id] = updatedElement;
                let formISValid = true;
                for (let id in updatedElements) {
                    formISValid = updatedElements[id].valid && formISValid
                }
                props.setKeyGeneratorElement(updatedElements);
                break;
            default:
                return null;
        }
    }

    let keyGeneratorElementArray = [];
    for (let key in props.keyGeneratorElements) {
        keyGeneratorElementArray.push({
            id: key,
            config: props.keyGeneratorElements[key]
        });
    }

    return (
        <div className={classes.KeyGenerator}>
            <form onSubmit={(event) => { props.generateAWSApiKeyHandler(event) }}>
                {keyGeneratorElementArray.map(element => (
                    <Input
                        key={element.id}
                        elementType={element.config.elementType}
                        elementConfig={element.config.elementConfig}
                        value={element.config.value}
                        invalid={!element.config.valid}
                        ShouldValidate={element.config.validation}
                        touched={element.config.touched}
                        changed={(event) => { inputChangeListner(event, element.id) }}
                    />)
                )}
                <CustomButton  clicked={(event) => { props.generateAWSApiKeyHandler(event) }} classes={classes.btn}>&nbsp;&nbsp;Generate New API Key&nbsp;&nbsp;</CustomButton>
            </form>
        </div>
    );

}

export default KeyGenerator
