import { combineReducers } from 'redux';
import patReducer from './patientReducer/patReducer';

export default combineReducers({
    patient : patReducer
})