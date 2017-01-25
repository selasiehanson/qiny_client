import { SHOW_NOTIFICATION, HIDE_NOTIFICATION } from '../constants';
import { LOCATION_CHANGE } from 'react-router-redux';

const initialState = {
    type: '',
    content: '',
    display: false
};

export default function notification(state = initialState, action) {
    switch (action.type) {
        case SHOW_NOTIFICATION:
            return { type: action.payload.type, content: action.payload.content, display: true }
        case HIDE_NOTIFICATION:
            return initialState;
        case LOCATION_CHANGE:
            return initialState;
        default:
            return state;
    }
}
