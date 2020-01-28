import React, { Component } from 'react';
import logo from '../../img/dclanginglogo.jpg';
import { Modal , Form , Input, Row, Col, Button} from 'antd';
import * as firebase from 'firebase/app';
import {openNotification} from '../Others/Message'
import {connect} from 'react-redux'
class login extends Component {


constructor(props) {
    super(props)
    this.state ={
       showEmailModal:false
    }
}

signInEmail = () => {
    this.setState({
        showEmailModal:true
    })
}
signInWithEmailAndPassword = e => {
    e.preventDefault();
    this.props.form.validateFields((err, fieldsValue) => {
      if(!err){ 
        firebase.auth().signInWithEmailAndPassword(fieldsValue.email,fieldsValue.password)
        .then( res => {
            console.log(res)
        }).catch(e =>{
            openNotification(this.closeAlert,e.message,"error")
        })
      }
    });
}

closeAlert = () => {
   console.log("closeAlert")
}

handleCancel = () => {
    console.log("handleCancel")
}
    render() {

        const { getFieldDecorator } = this.props.form;

        return (
            <div>
                <img src={logo} className="App-logo" alt="logo" /><br></br><br></br>
                <Button type="primary" onClick={this.props.signInApp}>Login with Google</Button>&nbsp;&nbsp;
                <Button type="primary" onClick={this.signInEmail}>Login with Email</Button>

                <Modal 
                title="Login with Email"
                visible={this.state.showEmailModal}
                onCancel={this.handleCancel}
                footer={[]}
                className="custom-modal"
                width={750}
                maskClosable={false} >
                 <div>
                   <Form onSubmit={this.signInWithEmailAndPassword}>
                      <Row gutter={32}>
                          <Col lg={{ span: 12 }} sm={{ span: 24 }}>
                            <Form.Item label="Email">
                              {getFieldDecorator('email',{
                                rules:[{required:true,message:"Please enter your email"}]
                              })
                              (<Input placeholder="Please enter your email" className="docany-input"/>)
                            }
                            </Form.Item>
                          </Col>
                          <Col lg={{ span: 12 }} sm={{ span: 24 }}>
                            <Form.Item label="Password">
                              {
                                getFieldDecorator('password',{
                                  rules:[{required:true,message:"Please enter your password"}]
                                })
                                (<Input.Password placeholder="Please enter your password" className="docany-input"/>)
                              }
                            </Form.Item>
                          </Col>
                      </Row>
                      <Row type="flex" justify="center" align="middle">
                          <Col>
                            <Form.Item>
                              <Button type="primary" htmlType="submit" className="modal-submit-button">Submit</Button>
                            </Form.Item>
                          </Col>
                       </Row>
                   </Form>
                 </div>
                </Modal>
            </div>
        );
    }
}

const mapStateToProps = state => ({
});
const FormWrapper = Form.create()(login)
export default connect(mapStateToProps,{})(FormWrapper);