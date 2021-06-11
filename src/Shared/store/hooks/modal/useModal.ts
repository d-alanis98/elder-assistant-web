import { useCallback } from 'react';
//Custom hooks
import { useAppDispatch, useAppSelector } from '..';
//Actions
import { hideModalAction, showModalAction } from '../../reducers/modalDuck';

const useModal = () => {
    /**
     * Hooks
     */
    //Action dispatcher
    const dispatch = useAppDispatch();
    //Global state
    const { showModal: modalIsVisible } = useAppSelector(state => state.modal);
    //Callbacks
    const showModal = useCallback(() => {
        dispatch(showModalAction());
    }, [dispatch]);

    const hideModal = useCallback(() => {
        dispatch(hideModalAction());
    }, [dispatch]);

    return {
        showModal,
        hideModal,
        modalIsVisible,
    }
}

export default useModal;