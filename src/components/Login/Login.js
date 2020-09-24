import React, {useContext} from 'react';
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "./firebase.config"
import {UserContext} from '../../App'


const Login = () => {
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);

  if(firebase.apps.length === 0){
    firebase.initializeApp(firebaseConfig);
  }

  const handleGoogleSignIn = () => {
    const provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider).then(function(result) {
      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      console.log(user);
      // ...

      const {displayName, email} = result.user;
      const signedInUser = {name: displayName, email};
      setLoggedInUser(signedInUser);

      console.log(signedInUser);
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });

  }
  return (<div>
    <h1>This is Login</h1>
    <button onClick={handleGoogleSignIn}>Google Sign in</button>
  </div>);
};

export default Login;
