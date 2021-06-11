import { AnyAction } from 'redux';
import { ThunkAppAction } from '../store';
/**
 * @author Damián Alanís Ramírez
 * @version 1.1.1
 * @description Specification of the modal reducer, containing action types, the reducer itself and the action functions.
 */

/**
 * Constants
 */
//Actions
const SET_SHOW_MODAL    = 'SET_SHOW_MODAL';
const SET_HIDE_MODAL    = 'SET_HIDE_MODAL';
//State contract
interface ModalState {
    showModal: Boolean;
}
//Initial state
const initialState: ModalState = {	
    showModal: false
};

/**
 * Reducer
 */

const reducer = (state = initialState, action: AnyAction): ModalState => {
    const { type } = action;
    switch(type) {
        case SET_SHOW_MODAL:
            return {
                ...state,
                showModal: true,
            };
        case SET_HIDE_MODAL:
            return {
                ...state,
                showModal: false,
            };
        default:
            return state;
    };
};

export default reducer;


/**
 * Actions
 */
/**
 * Action to display the modal.
 */
export const showModalAction = (): ThunkAppAction => (dispatch, _) => {
    dispatch({
        type: SET_SHOW_MODAL,
    });
}

/**
 * Action to hide the modal.
 */
export const hideModalAction = (): ThunkAppAction => (dispatch, _) => {
    dispatch({
        type: SET_HIDE_MODAL,
    });
}