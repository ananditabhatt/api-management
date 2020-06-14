import React from 'react';
import Input from '../UI/Input/Input'
import CustomButton from '../UI/Button/Button'
import classes from './KeyGenerator.css'

const KeyGenerator = props => {
    return (
        <div className={classes.KeyGenerator}>
            <form onSubmit={(event) => { props.generateAWSApiKey(event)}}>
                {props.elementArray.map(element => (
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
            <CustomButton btnType='Success'>Generate</CustomButton>
             </form> 
        </div>
    );

}

export default KeyGenerator
