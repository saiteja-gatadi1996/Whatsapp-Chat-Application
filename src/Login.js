import React from 'react'
import {Button} from "@material-ui/core"
import "./Login.css";
import {auth, provider} from "./firebase";
import { useStateValue } from './StateProvider';
import { actionTypes } from './reducer';

function Login() {
    //we get the dispatch
    const[{}, dispatch]=useStateValue()
    const signIn=()=>{
        //in firebase, provider is the google auth provider we have given
        auth.signInWithPopup(provider)
        .then((result)=>{dispatch({
            type: actionTypes.SET_USER,
            //whatever we get back from google
            user: result.user,
        })})
        .catch((error)=>alert(error.message));
        
        
    };

    return (
        <div className="login">
           <div className="login__container">
             <img src="https://images.indianexpress.com/2017/06/whatsapp-logo-7591.jpg" alt=""/>  
             <div className="login__text">
                 <h1>Sign in to Whatsapp</h1>
             </div>
             <Button onClick={signIn}>
                 Sign in with Google
             </Button>
           </div>
        </div>
    )
}

export default Login
