import React, { Component } from 'react';
import {connect} from 'react-redux';
import {fetchAllPatient} from '../../Redux/patientReducer/patAction';
import PatientTable from '../Patient/PatientTable';
class PatientContainer extends Component {

    componentWillMount(){
        this.props.fetchAllPatient();
    }
    render() {
        const allPatient=this.props.patientDetails;
        return (
            <div>
                <PatientTable patientDataSource={allPatient}></PatientTable>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    patientDetails : state.patient.patients
})

export default connect(mapStateToProps,{fetchAllPatient})(PatientContainer);