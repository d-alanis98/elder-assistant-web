import styled from 'styled-components';
//Components
import TouchableIcon from '../Icons/TouchableIcon/TouchableIcon';
//Styled components
import { FlexRow } from '../Containers/Flexbox.styles';

export const CollapseContainer = styled.div`
    width: 100%;
    display: flex;
    margin: 0;
    padding: 0;
    flex-direction: column;
`;

export const CollapseTogglerContainer = styled(FlexRow)`
    width: 100%;
    padding: 1rem 0.75rem;
    align-items: center;
    justify-content: space-around;
    border-radius: 0.75rem;
    background-color: rgba(0,0,0,0.07);
    margin-bottom: 0.5rem;
`;

interface CollapseContentContainerProps {
    visible: boolean;
}

export const CollapseContentContainer = styled.div<CollapseContentContainerProps>`${({
    visible
}) => `
    display: flex;
    flex-wrap: wrap;
    height: ${ visible ? '100%' : '0px' };
    width: 100%;
    overflow: hidden;
    transition: height 400ms, opacity 400ms;
`}`;

export const CollapseIcon = styled(TouchableIcon)`
    font-size: 2rem;
    color: #aaaaaa;
    margin-right: 1rem;
`;