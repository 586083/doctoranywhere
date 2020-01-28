import React, { Component } from 'react';
import 'antd/dist/antd.css'
import './App.css'
import withFirebaseAuth from 'react-with-firebase-auth'
import * as firebase from 'firebase/app';
import 'firebase/auth';
import firebaseConfig from './firebase/firebaseConfig';
import Login from './Components/Login/login';
import Home from './Components/Login/home';


const firebaseApp = firebase.initializeApp(firebaseConfig);
const firebaseAppAuth = firebaseApp.auth();
const providers = {
  googleProvider: new firebase.auth.GoogleAuthProvider(),
};


class App extends Component {
   
  

   render() {

        const {user,signInWithGoogle,signOut} = this.props;
        console.log(this.props)
        return (
            <div className="App">
                    <header className="App-header">
                    { (user == undefined || user == null) ? <Login signInEmail={this.signInWithEmailAndPassword} signInApp={signInWithGoogle}></Login> : <Home userObj={user} signOutApp={signOut}></Home>}
                    </header>
                </div>
        );
    }
}

export default  withFirebaseAuth({providers,firebaseAppAuth,})(App);