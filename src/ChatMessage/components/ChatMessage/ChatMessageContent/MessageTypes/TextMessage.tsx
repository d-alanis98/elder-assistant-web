import React from 'react';
//Components
import Label from '../../../../../Shared/components/Layout/Labels/Label';

interface TextMessageProps {
    message: string;
}

const TextMessage: React.FC<TextMessageProps> = ({
    message
}) => (
    <Label
        fontSize = '1rem'
        color = '#666'
        fontWeight = 'lighter'
        style = {{ textAlign: 'start' }}
    >
        { message }
    </Label>
);

export default TextMessage;