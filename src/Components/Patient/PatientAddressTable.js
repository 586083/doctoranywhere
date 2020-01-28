import React, { Component } from 'react';
import { Table, Modal, Form, Row, Col ,Input, InputNumber, Button, Icon, Divider, Popconfirm } from 'antd';
import PatientTableHead from './PatientTableHead';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import {fetchMultiplePatientAddress,createPatientAddress,editPatientAddress,deletePatientAddress} from '../../Redux/patientReducer/patAction';
import {openNotification} from '../Others/Message'
import {connect} from 'react-redux'

class PatientAddressTable extends Component {

  componentDidMount () {
      const script1 = document.createElement("script")
      const script2 = document.createElement("script")
      script1.innerHTML="window.initGoogleComponents = function() {window.initPlacesAutcomplete = () => {};}"
      script2.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyDK_oZ0mst16lrWBDzptQK3ULpZrMhTSBw&libraries=places&callback=initGoogleComponents";
      script2.async=true
      script2.defer=true
      document.body.appendChild(script1);
      document.body.appendChild(script2);
  }

    constructor(props){
        super(props);
        this.columns =[
            {
                title: 'Address Line 1',
                dataIndex: 'patientAddress1'
              },
              {
                title: 'Address Line 22',
                dataIndex: 'patientAddress2'
              },
              {
                title: 'City',
                dataIndex: 'patientCity'
              },
              {
                title: 'Country',
                dataIndex: 'patientCountry'
              },{
                title: '',
                dataIndex: '',
                width: "100px",
                render: (text, record) =>
        
                  <div>
                    <span onClick={() => this.showEditPAhandlerFun(record)}>
                      <a href="javascript:;"><Icon type="edit" /></a>
                    </span>
                    <Divider type="vertical" />
                    <Popconfirm title="Click OK to proceed with deletion" onConfirm={() => this.showDeletePAhandlerFun(record)}>
                      <a href="javascript:;"><Icon type="delete" /></a>
                    </Popconfirm>
                  </div>
              }
        ];

        this.state = {
          searchClicked:false,
          searchResults : [],
          showCreatePAModal: false,
          showEditPAModal:false,
          selectedRecord:{}
        }
    }

    searchClickedPatientAddFun = (value,data) => {
      var searchResults= data.filter(function(singleData){
        return (
          singleData.patientAddress1 === undefined ? true : singleData.patientAddress1.toLowerCase().indexOf(value.toLowerCase()) !== -1 ||
          singleData.patientAddress2 === undefined ? true : singleData.patientAddress2.toLowerCase().indexOf(value.toLowerCase()) !== -1 ||
          singleData.patientCity === undefined ? true : singleData.patientCity.toLowerCase().indexOf(value.toLowerCase()) !== -1 ||
          singleData.patientCountry === undefined ? true : singleData.patientCountry.toLowerCase().indexOf(value.toLowerCase()) !== -1
        )
    })

    this.setState({
      searchClicked : true,
      searchResults : searchResults
    })
    }

    showEditPAhandlerFun = (record) => {
      this.setState({
        showEditPAModal:true,
        selectedRecord:record
      })
    }
    showDeletePAhandlerFun = (record) => {
      this.props.deletePatientAddress(record)
    }
    showCreatePatientAddhandlerFun = () => {
      this.setState({
        showCreatePAModal: true
      })
      this.props.form.resetFields()
    }

    fillAddres1 = (addresObject,endIndex) => {
      var addressLine1="";
      for(var i=0;i<=endIndex;i++){
        addressLine1=addressLine1+addresObject[i].value;
      }
      return addressLine1;
    }
    selectAddressGoogle = (selectValue) => {
        var address = ["","","",""]
        
          if(selectValue.terms.length == 1){
            address[3]=selectValue.terms[0].value;
          }else if(selectValue.terms.length == 2){
            address[2]=selectValue.terms[0].value;
            address[3]=selectValue.terms[1].value;
          }else if(selectValue.terms.length == 3){
            address[1]=selectValue.terms[0].value;
            address[2]=selectValue.terms[1].value;
            address[3]=selectValue.terms[2].value;
          }else if (selectValue.terms.length == 4){
            address[0]=selectValue.terms[0].value;
            address[1]=selectValue.terms[1].value;
            address[2]=selectValue.terms[2].value;
            address[3]=selectValue.terms[3].value;
          }else{
            address[0]=this.fillAddres1(selectValue.terms,selectValue.terms.length-4);
            address[1]=selectValue.terms[selectValue.terms.length-3].value;
            address[2]=selectValue.terms[selectValue.terms.length-2].value;
            address[3]=selectValue.terms[selectValue.terms.length-1].value;

          }
       this.props.form.setFieldsValue({
          patientAddress1: address[0],
          patientAddress2: address[1],
          patientCity: address[2],
          patientCountry: address[3]
        }); 
    }

    handlePACancel = () => {
      this.setState({
        showCreatePAModal: false,
        showEditPAModal:false,
        selectedRecord: {}
      })
    }
    renderSuggectionGoogle = (active, suggestions, onSelectSuggestion) => (
      <div className="suggestions-container">
        {
          suggestions.map((suggestion) => (
            <div className="suggestions" onClick={(event) => onSelectSuggestion(suggestion, event)}>
              {suggestion.description}
            </div>
          ))
        }
      </div>
    )
    handleCreatePA = e => {
      e.preventDefault();
      this.props.form.validateFields((err, fieldsValue) => {
        if(!err){  
          fieldsValue['patientId']=this.props.paitentDetails.patientId;
          this.props.createPatientAddress(fieldsValue);
        }
      });
    }
    handleEditPA = e => {
      e.preventDefault();
      this.props.form.validateFields((err, fieldsValue) => {
        if(!err){  
          fieldsValue['patientId']=this.props.paitentDetails.patientId;
          fieldsValue['patientAddressId']=this.state.selectedRecord.patientAddressId;
          this.props.editPatientAddress(fieldsValue);
        }
      });
    }
    componentWillMount(){
      this.props.fetchMultiplePatientAddress(this.props.paitentDetails);
    }
    componentWillReceiveProps(nextProps){
      if(nextProps.error !== "" && nextProps.error !== undefined && nextProps.isPatientAddress){
        openNotification(this.closeAlert,nextProps.error,"error")
        this.setState({
          showCreatePAModal: false,
          showEditPAModal:false,
          selectedRecord: {},
          searchClicked:false
        })
      }
      if(nextProps.success !== "" && nextProps.success !== undefined && nextProps.isPatientAddress){
        openNotification(this.closeAlert,nextProps.success,"success")
        this.setState({
          showCreatePAModal: false,
          showEditPAModal:false,
          selectedRecord: {},
          searchClicked:false
        })
      }
      if(nextProps.reloadStatus){
        this.props.fetchMultiplePatientAddress(this.props.paitentDetails);
      }
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div>
                <div id="create-supplier" onClick={() => this.props.backToPatient()}><a href="javascript:;"><Icon type="left-circle"></Icon>Click here to go back to Patient</a></div>
                <PatientTableHead tableData={this.props.addressDeatils} tableTitle="Patient Address" searchClicked={this.searchClickedPatientAddFun} showCreatePatienthandler={this.showCreatePatientAddhandlerFun}></PatientTableHead>
                <Table size="middle" columns={this.columns} 
                dataSource={ ( this.state.searchClicked && (this.state.searchResults.length !== this.props.addressDeatils.length) ) ? this.state.searchResults : this.props.addressDeatils } 
                 />

                 
                {/** Create Patient Address Popup */}
                <Modal 
                title="Create Patient Address"
                visible={this.state.showCreatePAModal}
                onCancel={this.handlePACancel}
                footer={[]}
                className="custom-modal"
                width={750}
                maskClosable={false} >
                 <div>
                   <Form onSubmit={this.handleCreatePA}>
                      <Row type="flex" justify="center" align="middle">
                        <Col>
                        <label><b>Please search your Location:</b></label><br></br>
                        <GooglePlacesAutocomplete inputClassName="ant-input suggestions-input" renderSuggestions={this.renderSuggectionGoogle} onSelect={this.selectAddressGoogle}/>  
                        </Col>
                      </Row>
                      <Row gutter={32}>
                          <Col lg={{ span: 12 }} sm={{ span: 24 }}>
                            <Form.Item label="Address Line 1">
                              {getFieldDecorator('patientAddress1',{})
                              (<Input placeholder="Please enter your Address Line 1" className="docany-input"/>)
                            }
                            </Form.Item>
                            <Form.Item label="City">
                              {getFieldDecorator('patientCity',{})
                              (<Input placeholder="Please enter your City" className="docany-input"/>)
                            }
                            </Form.Item>
                          </Col>
                          <Col lg={{ span: 12 }} sm={{ span: 24 }}>
                            <Form.Item label="Address Line 2">
                              {
                                getFieldDecorator('patientAddress2',{})
                                (<Input placeholder="Please enter your Address Line 2" className="docany-input"/>)
                              }
                            </Form.Item>
                            <Form.Item label="Country">
                              {getFieldDecorator('patientCountry',{
                                rules:[{required:true,message:"Please enter your Country"}]
                              })
                              (<Input placeholder="Please enter your Country" className="docany-input"/>)
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
                
                {/** Edit Patient Address Popup */}
                <Modal 
                title="Edit Patient Address"
                visible={this.state.showEditPAModal}
                onCancel={this.handlePACancel}
                footer={[]}
                className="custom-modal"
                width={750}
                maskClosable={false} >
                 <div>
                   <Form onSubmit={this.handleEditPA}>
                      <Row type="flex" justify="center" align="middle">
                        <Col>
                        <label><b>Please search your Location:</b></label><br></br>
                        <GooglePlacesAutocomplete inputClassName="ant-input suggestions-input" renderSuggestions={this.renderSuggectionGoogle} onSelect={this.selectAddressGoogle}/>  
                        </Col>
                      </Row>
                      <Row gutter={32}>
                          <Col lg={{ span: 12 }} sm={{ span: 24 }}>
                            <Form.Item label="Address Line 1">
                              {getFieldDecorator('patientAddress1',{initialValue:this.state.selectedRecord.patientAddress1})
                              (<Input placeholder="Please enter your Address Line 1" className="docany-input"/>)
                            }
                            </Form.Item>
                            <Form.Item label="City">
                              {getFieldDecorator('patientCity',{initialValue:this.state.selectedRecord.patientCity})
                              (<Input placeholder="Please enter your City" className="docany-input"/>)
                            }
                            </Form.Item>
                          </Col>
                          <Col lg={{ span: 12 }} sm={{ span: 24 }}>
                            <Form.Item label="Address Line 2">
                              {
                                getFieldDecorator('patientAddress2',{initialValue:this.state.selectedRecord.patientAddress2})
                                (<Input placeholder="Please enter your Address Line 2" className="docany-input"/>)
                              }
                            </Form.Item>
                            <Form.Item label="Country">
                              {getFieldDecorator('patientCountry',{
                                rules:[{required:true,message:"Please enter your Country"}]
								                ,initialValue:this.state.selectedRecord.patientCountry
                              })
                              (<Input placeholder="Please enter your Country" className="docany-input"/>)
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
  addressDeatils : state.patient.addressDeatils,
  reloadStatus : state.patient.reload,
  error : state.patient.error,
  success : state.patient.success,
  isPatient: state.patient.isPatient,
  isPatientAddress : state.patient.isPatientAddress
})

const FormWrapper = Form.create()(PatientAddressTable)
export default connect(mapStateToProps,{fetchMultiplePatientAddress,createPatientAddress,editPatientAddress,deletePatientAddress})(FormWrapper);