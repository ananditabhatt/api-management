import React, { Component } from "react";
import { Redirect, NavLink } from "react-router-dom";
import Input from "../../components/UI/Input/Input";
import classes from './Auth.css'
import Spinner from "../../components/UI/Spinner/Spinner";
import * as actionCreators from "../../store/actions/actionCreators";
import { connect } from "react-redux";
import Aux from '../../hoc/Aux';
import signup from '../../assets/signup.png';
import { flexbox, width, height } from "@material-ui/system";
import Card from "../../components/UI/Card/Card"
import telstra from "../../assets/telstra.jpg"
import { Parallax, Background } from 'react-parallax';
import iot from "../../assets/iot.png"
import event from "../../assets/event.jpg"
import logojpg from "../../assets/logojpg.jpg"
import Footer from '../../components/Navigation/Footer/Footer';
import CookieConsent from "react-cookie-consent";
import message from "../../assets/message.jpg"
import Banner from "../../components/UI/Banner/Banner";
import Infomation from "../../components//Information/Information";
let errorMessage = null;
class Auth extends Component {
  //Local state Mananagemnt for the form elements

  state = {
    controls: {
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "example@domain.com"
        },
        value: "",
        validation: {
          required: true,
          isEmail: true
        },
        valid: false,
        touched: false,
        tooltip: "Your Email address will be your username"
      },
      password: {
        elementType: "input",
        elementConfig: {
          type: "password",
          placeholder: "Password"
        },
        value: "",
        validation: {
          required: true,
          minLength: 6
        },
        valid: false,
        touched: false,
        tooltip: "Password must be more than 6 charaters"
      }
    },
    isSignUp: false,

    Card: {
      Card1: {
        url: "https://dev.telstra.com/content/messaging-api",
        title: "Messaging API",
        image: message,
        subvalue:
          "Send and receive SMS and MMS messages globally using enterprise grade Messaging API. It also allows your application to track the delivery status of both sent and received messages."
      },
      Card2: {
        url: "https://dev.telstra.com/content/connected-things-api",
        title: "Connected Things API",
        image: iot,
        subvalue:
          "Query details and network information for your IoT SIM connected to CAT-M1 network (Australia's largest LPWAN network). This API will provide you critical information on your SIMs, data..."
      },
      Card3: {
        url: "https://dev.telstra.com/content/programmable-network-api",
        title: "Programmable Network API",
        image: telstra,
        subvalue:
          "Programmable Network is a self-provisioning platform that allows its users to create on-demand connectivity services between multiple end-points and add various network functions to those..."
      },
      Card4: {
        url: "https://dev.telstra.com/content/event-detection-api",
        title: "Event Detection API",
        image: event,
        subvalue:
          "Event Detection API provides the ability to subscribe to and receive mobile network events for registered mobile numbers associated with mobile network, such as; SIM..."
      }
    }
  };

  //checking the validity of the enterted values in the form elements
  CheckValidity = (value, rules) => {
    let isValid = true;
    if (rules.required) {
      isValid = value.trim() !== "" && isValid;
    }
    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }
    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }
    if (rules.isEmail) {
      const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
      isValid = pattern.test(value) && isValid;
    }

    if (rules.isNumeric) {
      const pattern = /^\d+$/;
      isValid = pattern.test(value) && isValid;
    }
    return isValid;
  };

  //updating the form elements value in the state immutablely

  inputChangeHanlder = (event, elementIdentifier) => {
    const updatedControls = { ...this.state.controls };
    const updatedControlsElement = { ...updatedControls[elementIdentifier] };
    updatedControlsElement.value = event.target.value;
    updatedControlsElement.valid = this.CheckValidity(
      updatedControlsElement.value,
      updatedControlsElement.validation
    );
    updatedControlsElement.touched = true;
    updatedControls[elementIdentifier] = updatedControlsElement;
    this.setState({
      controls: updatedControls
    });
  };

  // calling the redux action(sign or signup) on the form submit for async API call
  submitHandler = event => {
    event.preventDefault();
    this.props.onAuthentication(
      this.state.controls.email.value,
      this.state.controls.password.value,
      this.state.isSignUp
    );
  };

  //changing the state to switich to signUp or signIn
  switchToLogin = () => {
    errorMessage = null;
    return this.setState({
      isSignUp: !this.state.isSignUp
    });
  };

  // calling the redux action  for async  signin call using google provider
  GoogleAuth = event => {
    event.preventDefault();
    this.props.onGoogle();
  };

  render() {
    const CardArray = [];
    for (let key in this.state.Card) {
      CardArray.push({
        id: key,
        config: this.state.Card[key]
      });
    }

    let Cards = (
      <div className={classes.containertest}>
        {CardArray.map(Elemet => {
          return (
            <Card
              navigateProfile={id => this.navigateProfile(id)}
              red={this.state.red}
              key={Elemet.id}
              id={Elemet.id}
              image={Elemet.config.image}
              url={Elemet.config.url}
              title={Elemet.config.title}
              subvalue={Elemet.config.subvalue}
            />
          );
        })}
      </div>
    );

    // converting the state controls from object to Array
    let formArray = [];
    for (let key in this.state.controls) {
      formArray.push({
        id: key,
        config: this.state.controls[key]
      });
    }
    // Iterating over formArray to create the input elements dynamically using the data in state.
    let form = formArray.map(formElement => {
      return (
        <div>
          <Input
            required
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            changed={event => this.inputChangeHanlder(event, formElement.id)}
            invalid={!formElement.config.valid}
            shouldValidate={formElement.config.validation}
            isTouched={formElement.config.touched}
            valueType={formElement.id}
            tooltip={formElement.config.tooltip}
          />
        </div>
      );
    });

    // displaying the spinner untill form loads completely
    this.props.spinner ? (form = <Spinner />) : form;

    //error handling during the signin and signup from firebase
    switch (this.props.error) {
      case "EMAIL_NOT_FOUND":
        errorMessage = <p>There is no user linked to this email.</p>;
        break;
      case "INVALID_EMAIL":
        errorMessage = <p>Email you have entered is incorrect or empty.</p>;
        break;
      case "EMAIL_EXISTS":
        errorMessage = <p>This Email is already in use. </p>;
        break;
      case "INVALID_PASSWORD":
        errorMessage = <p>Your password is invalid.</p>;
        break;
      case "WEAK_PASSWORD : Password should be at least 6 characters":
        errorMessage = <p>Password should be at least 6 characters</p>;
        break;
      case "USER_DISABLED":
        errorMessage = <p>Too many wrong attempts. User has been disabled</p>;
        break;
      default:
        errorMessage = null;
    }

    //Auto redirect when user is already authenticated
    let autoReditect = <Redirect to="/" />;
    if (this.props.IsAuthenticated) {
      autoReditect = <Redirect to="/landing" />;
    }


    let flipcard = (<div className={["flip-card", classes.flipcard].join(" ")}>
      <div
        className={["flip-card-inner", classes.flipcardinner].join(" ")}
      >
        <div
          className={["flip-card-front", classes.flipcardfront].join(" ")}
        >
          <img src={signup} alt="Signup" />
        </div>

        <div
          className={["flip-card-back", classes.flipcardback].join(" ")}
        >
          <form onSubmit={this.submitHandler}>
            <h2>{this.state.isSignUp ? "SignUp" : "SignIn"}</h2>
            {errorMessage}

            {form}
            <div>
              <button className={classes.myBtn}>
                {this.state.isSignUp ? (
                  "SignUp"
                ) : (
                    <i className="fa fa-envelope"> SignIn With Email</i>
                  )}
              </button>
            </div>
            <br />
            <div>
              {this.state.isSignUp ? (
                ""
              ) : (
                  <button
                    className={classes.myBtn}
                    onClick={this.GoogleAuth}
                  >
                    <i className="fa fa-google "> Login With Google</i>
                  </button>
                )}
            </div>
            <p style={{ fontSize: "10px", textAlign: "center" }}>
              {this.state.isSignUp
                ? "By clicking Sign Up, you agree to our Terms, Data Policy and Cookie Policy."
                : null}
            </p>
          </form>
          <i
            onClick={this.switchToLogin}
            style={{
              textDecoration: "underline",
              marginRight: "21px",
              cursor: "pointer"
            }}
          >
            Switch To {this.state.isSignUp ? "SignIn" : "SignUp"}
          </i>
          {this.state.isSignUp ? null : (
            <NavLink to="/ResetPassword">
              <i
               /* className="fa fa-unlock-alt"  */ style={{
                  textDecoration: "underline",
                  fontStyle: "italic",
                  color: "white",
                  cursor: "pointer"
                }}
              >
                Reset Password
             </i>
            </NavLink>
          )}
         &nbsp;&nbsp;{" "}
        </div>
      </div>
    </div>);

    return (
      <Aux>
        <CookieConsent
          enableDeclineButton
          flipButtons
          style={{
            background: "rgba(0, 0, 0, 0.89)",
            color: "white"
          }}
        >
          We use cookies to improve user experience. For this reasons. By
          continuing to the site, you consent to store on some of your user data
          in your local browser as per our cookies Policy. You can change your
          cookie settings at any time by clicking âCookie Preferences.â Please
          read our Terms and Conditions and Privacy Policy for full details..
        </CookieConsent>

        {autoReditect}


        <div className={classes.outerdiv}>
          <Banner />
          <div>{Cards}</div>
          {/* SignUp/SignIn Flip cards*/}
          {this.props.isSignUpWindow ? flipcard : null}

          <Infomation />
        </div>
       
        
      </Aux>
    );
  }
}
//Subscribe the state from redux store
const mapStateToProps = state => {
  return {
    spinner: state.auth.spinner,
    error: state.auth.error,
    IsAuthenticated: state.auth.token != null,
    isSignUpWindow: state.auth.isSignUpWindow
  };
};
//call the dispatcher to redux store
const mapDispatchToProps = dispatch => {
  return {
    onAuthentication: (email, password, isSignUp) =>
      dispatch(actionCreators.AC_auth(email, password, isSignUp)),
    onGoogle: () => dispatch(actionCreators.AC_auth_google())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);