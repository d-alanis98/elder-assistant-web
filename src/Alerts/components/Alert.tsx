import React from 'react';
//Styled components
import { 
    AlertContent, 
    AlertContainer 
} from './Alert.styles';
//Hooks
import useAlerts from '../../Shared/store/hooks/alerts/useAlerts';

const Alert: React.FC = () => {
    /**
     * Hooks
     */
    //Alerts
    const { 
        type,
        display,
        message
    } = useAlerts();

    //Render
    return (
        <AlertContainer
            type = { type }
            displayAlert = { display }
        >
            <AlertContent
                type = { type }
            >
                { message }
            </AlertContent>
        </AlertContainer>
    );
}

export default Alert;