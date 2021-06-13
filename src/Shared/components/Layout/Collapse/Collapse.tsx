import React from 'react';
//Styled components
import { 
    CollapseIcon,
    CollapseContainer, 
    CollapseTogglerContainer,
    CollapseContentContainer 
} from './Collapse.styles';
//Icons
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';

interface CollapseProps {
    toggler: React.ReactNode;
    initialState?: boolean;
};

const Collapse: React.FC<CollapseProps> = ({ 
    toggler,
    children,
    initialState 
}) => {
    /**
     * Hooks
     */
    //State
    const [visible, setVisible] = React.useState(initialState || false);
    //Callbacks
    const getIcon = React.useCallback(() => (visible
        ? faCaretUp
        : faCaretDown
    ), [visible])

    //Render
    return (
        <CollapseContainer>
            <CollapseTogglerContainer
                onClick = { () => setVisible(prevValue => !prevValue) }
            >
                <CollapseIcon 
                    icon = { getIcon() }
                />
                { toggler }
            </CollapseTogglerContainer>
            <CollapseContentContainer
                visible = { visible }
            >
                { children }
            </CollapseContentContainer>
        </CollapseContainer>
    );
}

export default Collapse;