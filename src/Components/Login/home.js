import React, { Component } from 'react';
import {Button} from 'antd';
import PatientContainer from '../Patient/PatientContainer';
import * as firebase from 'firebase/app';
import axios from 'axios';
class home extends Component {

  render() {
        console.log(this.props.userObj);
        axios.interceptors.request.use( async (config) => {
            const token = await firebase.auth().currentUser.getIdToken();
            config.headers = { Authorization : token }
            return config;
         }, (error) => {
             console.log(error)
             return Promise.reject(error);
         });

         
    return (
            <div>
                <h1 className="header1">Hi <b>{this.props.userObj.displayName}</b>, Welcome To Doctor Anywhere </h1>
                <br></br>
                <br></br>
                <PatientContainer></PatientContainer><br></br>
                <Button type="primary" onClick={this.props.signOutApp}>Signout</Button>&nbsp;
            </div>
        );
    }
}

export default home;