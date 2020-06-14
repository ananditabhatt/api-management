import React,{Component} from 'react';
import * as actionCreators from '../../../store/actions/index';
import {connect} from 'react-redux'
import {Redirect,NavLink} from 'react-router-dom'
import Auxilary from '../../../Components/HOC/Auxilary/Auxilary';
/* import logout from "../../../Assets/Images/logout.png"
 */
import   './LogoutScreen.css'
class Logout extends Component{

    componentDidMount(){
        this.props.onLogout()

    }
render(){
  
    return(
        <Auxilary> 
        <div className="LogoutScreen">
{/*         <p><img src={logout}/></p>
 */} <h1>You have Successfully logged Out!!</h1>
 <br/><br/>
<NavLink to="/" style={{color:"black",fontSize:"bold"}}>Click here to Login Again</NavLink>
</div>
    </Auxilary>
     
   


    )
}

} 



const mapDispatchToProps=(dispatch)=>{
    return{

        onLogout:()=>{dispatch(actionCreators.AC_authLogout())}
    }
}

export default connect(null,mapDispatchToProps)(Logout);