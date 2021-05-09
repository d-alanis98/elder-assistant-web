import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const NavigationItemContainer = styled.div`
    display: flex;
    height: 100%;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 5px;
`;


interface NavigationIconProps {
    active: boolean;
    iconSize?: number;
    iconColor?: string;
}
export const NavigationItemIcon = styled(FontAwesomeIcon)<NavigationIconProps>`${({ 
    theme,
    active,
    iconSize = 20,
    iconColor = '#aaaaaa'
}) => `
    color: ${ active ? theme.primaryColor : iconColor };
    fontSize: ${ iconSize }px;
`}`;

export const NavigationItemLabel = styled.label<NavigationIconProps>`${({ 
    theme,
    active,
    iconColor = '#aaaaaa'
}) => `
    color: ${ active ? theme.primaryColor : iconColor };
    margin-top: 5px;
`}`