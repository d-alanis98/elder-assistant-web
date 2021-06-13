import React from 'react';
//Components
import SubscriptionsRenderer from './SubscriptionsRenderer/SubscriptionsRenderer';
//Styled components
import { SecondaryUserScreenContainer } from './SecondaryUserScreen.styles';

const SecondaryUserScreen: React.FC = () => (
    <SecondaryUserScreenContainer>
        <SubscriptionsRenderer />
    </SecondaryUserScreenContainer>
)

export default SecondaryUserScreen;