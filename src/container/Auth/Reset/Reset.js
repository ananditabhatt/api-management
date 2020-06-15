import React,{Component} from 'react';
import * as actionCreators from '../../../store/actions/actionCreators';
import {connect} from 'react-redux'
import {Redirect,NavLink} from 'react-router-dom';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './Reset.css'
import WithErrorHanlder from '../../../hoc/WithErrorHandler/WithErrorHandler';
import axios from '../../../axios-users';
import Input from '../../../components/UI/Input/Input';

class Reset extends Component{
    state = {
        controls: {
          email: {
            elementType: "input",
            elementConfig: {
              type: "email",
              placeholder: "Email"
            },
            value: "",
            validation: {
              required: true,
              isEmail: true
            },
            valid: false,
            touched: false
          },
          
        },
    
     
      };


      CheckValidity = (value, rules) => {
        let isValid = true;
        if (rules.required) {
          isValid = value.trim() !== "" && isValid;
        }
       
        if ( rules.isEmail ) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test( value ) && isValid
        }

        return isValid;
      };
    
      inputChangeHanlder=(event,elementIdentifier)=>{
    
        const updatedControls={...this.state.controls}
        const updatedControlsElement = { ...updatedControls[elementIdentifier] };
        updatedControlsElement.value = event.target.value;
        updatedControlsElement.valid = this.CheckValidity(
            updatedControlsElement.value,
            updatedControlsElement.validation
          );
    
          updatedControlsElement.touched = true;
          updatedControls[elementIdentifier] = updatedControlsElement;
          this.setState({
            controls: updatedControls,
           // isValid: isValid
          });
      }
    
    
      submitHandler=(event)=>{
      
        event.preventDefault();
     this.props.onAuthenticationReset(this.state.controls.email.value)
      }
    
 
render(){
  
    
    let formArray = [];
    for (let key in this.state.controls) {
      formArray.push({
        id: key,
        config: this.state.controls[key]
      });
    }

    console.log(formArray)

    let form=formArray.map(formElement=>{
        return(
            <Input
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            changed={event => this.inputChangeHanlder(event, formElement.id)}
            invalid={!formElement.config.valid}
            shouldValidate={formElement.config.validation}
            isTouched={formElement.config.touched}
            valueType={formElement.id}
            />
        )
      

    });

    this.props.spinner?form=<Spinner/>:form

    let errorMessage=null;
    if(this.props.error){
      console.log(this.props.error)
      if(this.props.error==="EMAIL_NOT_FOUND"){
        errorMessage= <p>EMAIL_NOT_FOUND: There is No User linked to this Email.</p>
      }
      if(this.props.error==="INVALID_EMAIL"){
        errorMessage= <p>INVALID_EMAIL: Email you have Entered is Incorrect or Empty.</p>
      }
      if(this.props.error==="EMAIL_EXISTS"){
        errorMessage= <p>EMAIL_EXISTS: This Email is Already in Use. </p>
            }
      else if(this.props.error==="INVALID_PASSWORD"){
        errorMessage= <p>INVALID_PASSWORD: Your Password is Invalid.</p>
      }
      else if(this.props.error==="WEAK_PASSWORD : Password should be at least 6 characters"){
        errorMessage= <p>WEAK_PASSWORD : Password should be at least 6 characters</p>
      }
      else if(this.props.error==="USER_DISABLED"){
        errorMessage= <p>USER_DISABLED: Too Many Wrong Attempts. User has been Disabled</p>
      }
     
      else{

      }
       
       
    }

    
    if(this.props.isReset){
  form=<p>Password Reset link has been sent to your email {this.props.isReset}. Please Reset your password using the one time reset link.</p>
    }
    return(
 
     
        <div className={classes.Reset}>
     
         <form onSubmit={this.submitHandler}>
         <h2>Reset  Password</h2>
           {form}
           {errorMessage}
      {/*     {this.props.isReset?<img src={reset}/>:null}  */}
          { this.props.isReset?null:<button className={classes.myButton} >Reset Your Password</button>}          
{/*            <p style={{fontSize:"10px",textAlign:"left"}}>{this.state.isSignUp ? "By clicking Sign Up, you agree to our Terms, Data Policy and Cookie Policy. You may receive SMS notifications from us and can opt out at any time." : null}</p>
 */}           
         </form>
       
       </div>


    )
}

} 

const mapStateToProps=(state)=>{
    return{

      isReset: state.auth.email!=null

    }
}


const mapDispatchToProps=(dispatch)=>{
    return{

        onAuthenticationReset: (email)=>dispatch(actionCreators.AC_authReset(email))

    }
}

export default connect(mapStateToProps,mapDispatchToProps)(WithErrorHanlder(Reset,axios));