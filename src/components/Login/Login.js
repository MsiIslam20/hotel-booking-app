import React, { useContext } from 'react';
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import {UserContext} from "../../App"
import { useHistory, useLocation } from 'react-router-dom';


const Login = () => {
    const [loggedInUser , setLoggedInUser] = useContext(UserContext);

    const history = useHistory();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: "/" } };

    if(firebase.apps.length === 0) {
        firebase.initializeApp(firebaseConfig);
    }

    const handleGoogleSignIn = () => {
        const provider = new firebase.auth.GoogleAuthProvider();

        firebase.auth().signInWithPopup(provider)
        .then(function(result) {
            const {displayName, email} = result.user;
            const signInUser = {name: displayName, email}
            setLoggedInUser(signInUser);
            history.replace(from);
        })
        .catch(function(error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode, errorMessage);
        });
    }

    const handleFbSignIn = () => {
        const provider = new firebase.auth.FacebookAuthProvider();
        firebase.auth().signInWithPopup(provider)
        .then((res) => {
            const {displayName, email} = res.user;
            console.log(displayName, email);
            const signInUser = {name: displayName, email}
            console.log(signInUser);
            setLoggedInUser(signInUser);
            history.replace(from);
        })
        .catch((error) =>{
            var errorCode = error.code;
            var errorMessage = error.message;
            var email = error.email;
            console.log(errorCode, errorMessage, email);
        })
    }

    return (
        <div className="App">
            <h1>This is Login</h1>
            <button onClick={handleGoogleSignIn}>Google Sign In</button>
            <br/>
            <br/>
            <br/>
            <button onClick={handleFbSignIn}>Facebook Sign In</button>
        </div>
    );
};

export default Login;