import React from 'react';
import ReactDOM from 'react-dom';
//Styled components
import { ModalContainer, ModalCard, ModalCloseButton } from './Modal.styles';
//Hooks
import useModal from '../../store/hooks/modal/useModal';

const Modal: React.FC = ({ children }) => {
    /**
     * Hooks
     */
    //Modal
    const { 
        hideModal,
        modalIsVisible
    } = useModal();

    //Render
    const element = document.getElementById('modal');
    if(element)
        return ReactDOM.createPortal(modalIsVisible 
            ? (
                <ModalContainer>
                    <ModalCard>
                        <ModalCloseButton 
                            onClick = { hideModal }
                        />
                        { children }
                    </ModalCard>
                </ModalContainer>
            )
            : null,
            element 
        );
    return null;
}

export default Modal;