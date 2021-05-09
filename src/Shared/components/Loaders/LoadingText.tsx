import React from 'react';
//Components
import Label from '../Layout/Labels/Label';

//Constants
const DEFAULT_LOADING_TEXT = 'Cargando...';

//Props
interface LoadingTextProps extends React.HTMLAttributes<HTMLDivElement> {
    text?: string;
}

const LoadingText: React.FC<LoadingTextProps> = ({
    text,
    style
}) => (
    <Label
        style = { style || defaultStyle.label }
    >
        { text || DEFAULT_LOADING_TEXT }
    </Label>
);

export default LoadingText;

//Styles
const defaultStyle = {
    label: {
        opacity: 0.75,
        alignSelf: 'center',
    }
};