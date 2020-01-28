import React, { Component } from 'react';
import { Table , Divider, Tooltip , InputNumber,  Icon, Popconfirm, Modal , Form , Input, Row, Col, Button, Select } from 'antd';
import TableHead from '../Patient/PatientTableHead';
import {fetchAllPatient, deletePatient, resetError , createPatient, editPatient} from '../../Redux/patientReducer/patAction';
import {connect} from 'react-redux';
import {openNotification} from '../Others/Message'
import PatientAddressTable from './PatientAddressTable'
const { Option } = Select;

class PatientTable extends Component {
    
    constructor(props){
        super(props);

        this.columns =[
            {
              title: '',
              width: "10px",
              render: (text, record) =>
                <div>
                  <Tooltip placement="topLeft" title="Click to Add Address" arrowPointAtCenter>
                    <span onClick={() => this.handleAddress(record)} id={record.patientId}>
                      <a href="javascript:;"><Icon type="bank" /></a>
                    </span>
                  </Tooltip>
                </div>

            },{
                title: 'First Name',
                dataIndex: 'patientFirstName',
                sorter: (a, b) => { return a.patientFirstName.localeCompare(b.patientFirstName)},
                sortDirections : ['ascend']
              },
              {
                title: 'Last Name',
                dataIndex: 'patientLastName'
              },
              {
                title: 'Age',
                dataIndex: 'patientAge',
                sorter: (a, b) => a.patientAge - b.patientAge
              },
              {
                title: 'Sex',
                dataIndex: 'patientSex'
              },
              {
                title: 'Contact Number',
                dataIndex: 'patientContactNumber'
              },
              {
                title: 'Address',
                dataIndex : 'patientAddressString' ,
                render : (text,record) => {
                  const obj = {
                    children: "",
                    props: {},
                  };
                  obj.children = text.split("|").map( (value, index) => 
                     <div><span>{value}</span><br></br></div>
                  );
                  return obj;
                }
              },{
                title: '',
                dataIndex: '',
                width: "100px",
                render: (text, record) =>
        
                  <div>
                    <span onClick={() => this.showEditPatienthandlerFun(record)}>
                      <a href="javascript:;"><Icon type="edit" /></a>
                    </span>
                    <Divider type="vertical" />
                    <Popconfirm title="Click OK to proceed with deletion" onConfirm={() => this.showDeletePatienthandlerFun(record)}>
                      <a href="javascript:;"><Icon type="delete" /></a>
                    </Popconfirm>
                  </div>
              }
        ];

        this.state = {
            searchClicked:false,
            searchResults : [],
            showCreateModal : false,
            showEditModal :false,
            showAddress:false,
            selectedAddressRecords:{},
            selectEditRecord:{}
        }
    }

    handleAddress = (record) => {
      this.setState({
        showAddress : true,
        selectedAddressRecords : record
      })
    }
    searchClickedFun = (value,data) => {
      var searchResults= data.filter(function(singleData){
          return (
            singleData.patientFirstName.toLowerCase().indexOf(value.toLowerCase()) !== -1 ||
            singleData.patientLastName.toLowerCase().indexOf(value.toLowerCase()) !== -1 ||
            singleData.patientAddressString.toLowerCase().indexOf(value.toLowerCase()) !== -1
          )
      })

      this.setState({
        searchClicked : true,
        searchResults : searchResults
      })
      
    }

    showDeletePatienthandlerFun = (record) => {
        this.props.deletePatient(record);
    }

    showEditPatienthandlerFun = (record) => {
      this.setState({
        showEditModal: true,
        selectEditRecord:record
      })
    }
    showCreatePatienthandlerFun = () => {
      this.setState({
        showCreateModal: true
      })
      this.props.form.resetFields();
    }
    closeAlert = () => {
      this.props.resetError()
    }
    handleCancel = () => {
      this.setState({
        showCreateModal: false,
        showEditModal: false,
        selectEditRecord:{}
      })
    }
    handleCreatePatient = e => {
      e.preventDefault();
      this.props.form.validateFields((err, fieldsValue) => {
        if(!err){  
          this.props.createPatient(fieldsValue);
        }
      });
    }
    handleEditPatient =  e => {
      e.preventDefault();
      this.props.form.validateFields((err, fieldsValue) => {
        if(!err){  
          fieldsValue['patientId']=this.state.selectEditRecord.patientId;
          this.props.editPatient(fieldsValue);
        }
      });
    }
    backToPatientFunc = () => {
      this.setState({
        showAddress : false
      })
    }
    componentWillReceiveProps(nextProps){
      if(nextProps.error !== "" && nextProps.error !== undefined && nextProps.isPatient){
        openNotification(this.closeAlert,nextProps.error,"error")
        this.setState({
          showCreateModal: false,
          showEditModal: false,
          selectEditRecord:{},
          searchClicked:false
        })
      }
      if(nextProps.success !== "" && nextProps.success !== undefined && nextProps.isPatient){
        openNotification(this.closeAlert,nextProps.success,"success")
        this.setState({
          showCreateModal: false,
          showEditModal: false,
          selectEditRecord:{},
          searchClicked:false
        })
      }
      if(nextProps.reloadStatus){
        this.props.fetchAllPatient();
      }
    }
    render() {
       const { getFieldDecorator } = this.props.form;

        return (
            <div>
                
                { this.state.showAddress ? (<React.Fragment><PatientAddressTable backToPatient={this.backToPatientFunc} paitentDetails={this.state.selectedAddressRecords} ></PatientAddressTable></React.Fragment>) : (
                  <React.Fragment>
                    <TableHead tableData={this.props.patientDataSource} tableTitle="Patient" searchClicked={this.searchClickedFun} showCreatePatienthandler={this.showCreatePatienthandlerFun}></TableHead>
                    <Table rowKey={record => record.patientId} size="middle" columns={this.columns} 
                    dataSource={ ( this.state.searchClicked && (this.state.searchResults.length !== this.props.patientDataSource.length) ) ? this.state.searchResults : this.props.patientDataSource } />
                  </React.Fragment>
                )}
                {/** Create Patient Popup */}
                <Modal 
                title="Create Patient"
                visible={this.state.showCreateModal}
                onCancel={this.handleCancel}
                footer={[]}
                className="custom-modal"
                width={750}
                maskClosable={false} >
                 <div>
                   <Form onSubmit={this.handleCreatePatient}>
                      <Row gutter={32}>
                          <Col lg={{ span: 12 }} sm={{ span: 24 }}>
                            <Form.Item label="First Name">
                              {getFieldDecorator('patientFirstName',{
                                rules:[{required:true,message:"Please enter your First Name"}]
                              })
                              (<Input placeholder="Please enter your First Name" className="docany-input"/>)
                            }
                            </Form.Item>
                            <Form.Item label="Age">
                              {getFieldDecorator('patientAge',{
                                rules:[{required:true,message:"Please enter your Age"}
                                  ,{validator : (rule,value,callback) => {
                                    try{
                                      if(value < 0){
                                        throw new Error('Age cannot be less than 0');
                                      }
                                      callback();
                                  } catch (err){
                                      callback(err);
                                  }
                                  }}]
                              })
                              (<InputNumber placeholder="Please enter your Age" className="docany-input"/>)
                            }
                            </Form.Item>
                            <Form.Item label="Contact Number">
                             {getFieldDecorator('patientContactNumber', {})(<Input  placeholder="Please enter Contact Number" className="docany-input" />)}
                            </Form.Item>
                          </Col>
                          <Col lg={{ span: 12 }} sm={{ span: 24 }}>
                            <Form.Item label="Last Name">
                              {
                                getFieldDecorator('patientLastName',{
                                  rules:[{required:true,message:"Please enter your Last Name"}]
                                })
                                (<Input placeholder="Please enter your Last Name" className="docany-input"/>)
                              }
                            </Form.Item>
                            <Form.Item label="Sex">
                              {getFieldDecorator('patientSex',{
                                rules:[{required:true,message:"Please enter your Sex"}]
                              })
                              (<Select
                                className="docany-input"
                                style={{ width: '100%' }}
                                placeholder="Select Sex"
                                filterOption={(input, option) =>
                                      option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                              >
                                <Option key="Male" value="Male">Male</Option>
                                <Option key="Female" value="Female">Female</Option>
                                <Option key="Transgender" value="Transgender">Transgender</Option>
                              </Select>)
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
                {/** Edit Patient Popup */}
                <Modal 
                title="Edit Patient"
                visible={this.state.showEditModal}
                onCancel={this.handleCancel}
                footer={[]}
                className="custom-modal"
                width={750}
                maskClosable={false} >
                 <div>
                   <Form onSubmit={this.handleEditPatient}>
                      <Row gutter={32}>
                          <Col lg={{ span: 12 }} sm={{ span: 24 }}>
                            <Form.Item label="First Name">
                              {getFieldDecorator('patientFirstName',{
                                rules:[{required:true,message:"Please enter your First Name"}],
								                        initialValue:this.state.selectEditRecord.patientFirstName
                              })
                              (<Input placeholder="Please enter your First Name" className="docany-input"/>)
                            }
                            </Form.Item>
                            <Form.Item label="Age">
                              {getFieldDecorator('patientAge',{
                                rules:[{required:true,message:"Please enter your Age"}
                                  ,{validator : (rule,value,callback) => {
                                    try{
                                      if(value < 0){
                                        throw new Error('Age cannot be less than 0');
                                      }
                                      callback();
                                  } catch (err){
                                      callback(err);
                                  }
                                  }}],
								                    initialValue:this.state.selectEditRecord.patientAge
                              })
                              (<InputNumber placeholder="Please enter your Age" className="docany-input"/>)
                            }
                            </Form.Item>
                            <Form.Item label="Contact Number">
                                    {getFieldDecorator('patientContactNumber', {
								                          initialValue:this.state.selectEditRecord.patientContactNumber
								                    })(<Input  placeholder="Please enter Contact Number" className="docany-input" />)}
                            </Form.Item>
                          </Col>
                          <Col lg={{ span: 12 }} sm={{ span: 24 }}>
                            <Form.Item label="Last Name">
                              {
                                getFieldDecorator('patientLastName',{
                                  rules:[{required:true,message:"Please enter your Last Name"}],
								                  initialValue:this.state.selectEditRecord.patientLastName
                                })
                                (<Input placeholder="Please enter your Last Name" className="docany-input"/>)
                              }
                            </Form.Item>
                            <Form.Item label="Sex">
                              {getFieldDecorator('patientSex',{
                                rules:[{required:true,message:"Please enter your Sex"}],
								                initialValue:this.state.selectEditRecord.patientSex
                              })
                              (<Select
                                className="docany-input"
                                style={{ width: '100%' }}
                                placeholder="Select Sex"
                                filterOption={(input, option) =>
                                      option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                              >
                                <Option key="Male" value="Male">Male</Option>
                                <Option key="Female" value="Female">Female</Option>
                                <Option key="Transgender" value="Transgender">Transgender</Option>
                              </Select>)
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
  patientDetails : state.patient.stations,
  isDeletedStatus : state.patient.isDeleted,
  reloadStatus : state.patient.reload,
  error : state.patient.error,
  success : state.patient.success,
  isPatient: state.patient.isPatient,
  isPatientAddress : state.patient.isPatientAddress
})
const FormWrapper = Form.create()(PatientTable)
export default connect(mapStateToProps,{deletePatient, fetchAllPatient, resetError, createPatient, editPatient})(FormWrapper);