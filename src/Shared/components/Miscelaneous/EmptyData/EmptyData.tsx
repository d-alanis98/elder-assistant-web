import React from 'react';
//Components
import LabelWithIcon from '../../Layout/Labels/LabelWithIcon/LabelWithIcon';
//Icons
import { faInfoCircle, IconDefinition } from '@fortawesome/free-solid-svg-icons';

interface EmptyDataProps extends React.HTMLAttributes<HTMLDivElement> {
    icon?: IconDefinition;
    text?: string;
    opacity?: number;
    fontSize?: number;
}

const EmptyData: React.FC<EmptyDataProps> = ({
    icon,
    text,
    style,
    opacity,
    children,
    fontSize
}) => {
    //Constants
    const DEFAULT_TEXT      = 'Sin datos';
    const DEFAULT_ICON      = faInfoCircle;
    const DEFAULT_OPACITY   = 0.75;
    const DEFAULT_FONT_SIZE = 16;

    //Render
    return (
        <div
            style = { style || defaultStyles(opacity || DEFAULT_OPACITY).container }
        >
            <LabelWithIcon 
                icon = { icon || DEFAULT_ICON }
                fontSize = { fontSize || DEFAULT_FONT_SIZE } 
            >
                { children || text || DEFAULT_TEXT }
            </LabelWithIcon>
        </div>
    );
}

export default EmptyData;

//Styles
const defaultStyles = (opacity: number) => ({
    container: {
        opacity,
        height: '100%',
        alignItems: 'center',
        justifyContent:'center'
    }
});