import {FETCH_ALL_PATIENT, ADD_PATIENT, EDIT_PATIENT, DELETE_PATIENT, RESET_ERROR ,ADD_PATIENT_ADDRESS, FETCH_MULTIPLE_PATIENT_ADDRESS, EDIT_PATIENT_ADDRESS, DELETE_PATIENT_ADDRESS } from './patTypes';
import axios from 'axios';
import {trackPromise} from 'react-promise-tracker';
import {globalConstants} from '../../Components/Others/constant'

const apiURL = globalConstants.apiURL;

export const fetchAllPatient = () => dispatch => {
    trackPromise(
        axios.get(`${apiURL}/doctorsAnywhere/app/fetchAllPatient`).then(json => dispatch({
            type : FETCH_ALL_PATIENT,
            payload: json.data,
            error : "",
            success: "",
            reload: false
        }))
        .catch(error => dispatch({
            type : FETCH_ALL_PATIENT,
            error : error.response.data.status + " : " + error.response.data.error + " : " + error.response.data.message,
            payload : [],
            success: "",
            reload: false
        }))
    )
}

export const deletePatient = (record) => dispatch => {
    trackPromise(
        axios.post(`${apiURL}/doctorsAnywhere/app/deletePatient`,record).then(json => dispatch({
            type : DELETE_PATIENT,
            error : "",
            reload: true,
            success: "Deleted sucessfully"
        }))
        .catch(error => dispatch({
            type : DELETE_PATIENT,
            error : error.response.data.status + " : " + error.response.data.error + " : " + error.response.data.message,
            reload: false,
            success: ""
        }))
    )
}

export const createPatient = (record) => dispatch => {
    trackPromise(
        axios.post(`${apiURL}/doctorsAnywhere/app/createPatient`,record).then(json => dispatch({
            type : ADD_PATIENT,
            error : "",
            reload: true,
            success: "Added sucessfully"
        }))
        .catch(error => dispatch({
            type : ADD_PATIENT,
            error : error.response.data.status + " : " + error.response.data.error + " : " + error.response.data.message,
            reload: false,
            success: ""
        }))
    )
}

export const createPatientAddress = (record) => dispatch => {
    trackPromise(
        axios.post(`${apiURL}/doctorsAnywhere/app/createPatientAddress`,record).then(json => dispatch({
            type : ADD_PATIENT_ADDRESS,
            error : "",
            reload: true,
            success: "Added Address sucessfully"
        }))
        .catch(error => dispatch({
            type : ADD_PATIENT_ADDRESS,
            error : error.response.data.status + " : " + error.response.data.error + " : " + error.response.data.message,
            reload: false,
            success: ""
        }))
    )
}

export const fetchMultiplePatientAddress = (record) => dispatch => {
    trackPromise(
        axios.post(`${apiURL}/doctorsAnywhere/app/fetchMultiplePatientAddress`,record).then(json => dispatch({
            type : FETCH_MULTIPLE_PATIENT_ADDRESS,
            error : "",
            reload: false,
            success: "",
            payload: json.data,
        }))
        .catch(error => dispatch({
            type : FETCH_MULTIPLE_PATIENT_ADDRESS,
            error : error.response.data.status + " : " + error.response.data.error + " : " + error.response.data.message,
            reload: false,
            success: "",
            payload: []
        }))
    )
}

export const editPatient = (record) => dispatch => {
    trackPromise(
        axios.post(`${apiURL}/doctorsAnywhere/app/editPatient`,record).then(json => dispatch({
            type : EDIT_PATIENT,
            error : "",
            reload: true,
            success: "Edited sucessfully"
        }))
        .catch(error => dispatch({
            type : EDIT_PATIENT,
            error : error.response.data.status + " : " + error.response.data.error + " : " + error.response.data.message,
            reload: false,
            success: ""
        }))
    )
}

export const editPatientAddress = (record) => dispatch => {
    trackPromise(
        axios.post(`${apiURL}/doctorsAnywhere/app/editPatientAddress`,record).then(json => dispatch({
            type : EDIT_PATIENT_ADDRESS,
            error : "",
            reload: true,
            success: "Edited Address sucessfully"
        }))
        .catch(error => dispatch({
            type : EDIT_PATIENT_ADDRESS,
            error : error.response.data.status + " : " + error.response.data.error + " : " + error.response.data.message,
            reload: false,
            success: ""
        }))
    )
}


export const deletePatientAddress = (record) => dispatch => {
    trackPromise(
        axios.post(`${apiURL}/doctorsAnywhere/app/deletePatientAddress`,record).then(json => dispatch({
            type : DELETE_PATIENT_ADDRESS,
            error : "",
            reload: true,
            success: "Deleted Address sucessfully"
        }))
        .catch(error => dispatch({
            type : DELETE_PATIENT_ADDRESS,
            error : error.response.data.status + " : " + error.response.data.error + " : " + error.response.data.message,
            reload: false,
            success: ""
        }))
    )
}

export const resetError = () => dispatch => {
    dispatch({
        type : RESET_ERROR
    })
}