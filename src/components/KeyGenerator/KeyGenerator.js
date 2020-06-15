import React from 'react';
import Input from '../UI/Input/Input'
import CustomButton from '../UI/Button/Button'
import classes from './KeyGenerator.css'

const KeyGenerator = props => {
    return (
        <div className={classes.KeyGenerator}>
            <form onSubmit={(event) => { props.generateAWSApiKey(event)}}>
                {props.keyGeneratorElementArray.map(element => (
                <Input
                    key={element.id}
                    elementType={element.config.elementType}
                    elementConfig={element.config.elementConfig}
                    value={element.config.value}
                    invalid={!element.config.valid}
                    touched={element.config.touched}
                changed={(event) => { props.inputChangeListner(event, element.id)}}
                />)
            )}
            <CustomButton classes={classes.btn}>&nbsp;&nbsp;Generate New API Key&nbsp;&nbsp;</CustomButton>
             </form> 
        </div>
    );

}

export default KeyGenerator
