import React, { Component } from 'react';
import logo from '../../img/dclanginglogo.jpg';
import {Button} from 'antd';


class login extends Component {
    render() {
        return (
            <div>
                <img src={logo} className="App-logo" alt="logo" /><br></br>
                <Button type="primary" onClick={this.props.signInApp}>Login with Google</Button>
            </div>
        );
    }
}

export default login;