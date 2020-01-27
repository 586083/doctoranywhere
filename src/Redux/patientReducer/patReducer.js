import {FETCH_ALL_PATIENT, ADD_PATIENT, EDIT_PATIENT, DELETE_PATIENT, RESET_ERROR, ADD_PATIENT_ADDRESS, FETCH_MULTIPLE_PATIENT_ADDRESS, EDIT_PATIENT_ADDRESS, DELETE_PATIENT_ADDRESS} from './patTypes';

const initialState = {
    patients : [],
    error : "",
    success : "",
    reload : false,
    addressDeatils : [],
    isPatientAddress : false,
    isPatient : false,
}

export default function(state = initialState, action){
    switch(action.type){
        case FETCH_ALL_PATIENT: return {
            ...state,
            patients : action.payload,
            error : action.error,
            success : action.success,
            reload: action.reload,
            isPatient: true,
            isPatientAddress : false,
        }
        case ADD_PATIENT: return {
            ...state,
            error : action.error,
            reload: action.reload,
            success : action.success,
            isPatient: true,
            isPatientAddress : false,
        }
        case DELETE_PATIENT: return {
            ...state,
            error : action.error,
            reload: action.reload,
            success : action.success,
            isPatient: true,
            isPatientAddress : false
        }
        case ADD_PATIENT_ADDRESS:  return {
            ...state,
            error : action.error,
            reload: action.reload,
            success : action.success,
            isPatient: false,
            isPatientAddress : true,
        }
        case FETCH_MULTIPLE_PATIENT_ADDRESS: return {
            ...state,
            addressDeatils : action.payload,
            error : action.error,
            success : action.success,
            reload: action.reload,
            isPatient: false,
            isPatientAddress : true,
        }
        case EDIT_PATIENT : return {
            ...state,
            error : action.error,
            reload: action.reload,
            success : action.success,
            isPatient: true,
            isPatientAddress : false,
        } 
        case RESET_ERROR: return {
            ...state,
            error : "",
            success : "",
            reload : false
        } 
        case EDIT_PATIENT_ADDRESS : return {
            ...state,
            error : action.error,
            reload: action.reload,
            success : action.success,
            isPatient: false,
            isPatientAddress : true,
        }
        case DELETE_PATIENT_ADDRESS: return {
            ...state,
            error : action.error,
            reload: action.reload,
            success : action.success,
            isPatient: false,
            isPatientAddress : true,
        }
        default:
            return state;
    }
}