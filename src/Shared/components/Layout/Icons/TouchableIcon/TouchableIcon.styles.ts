import styled from 'styled-components';
//Props
import { TouchableIconProps } from './TouchableIcon';
//Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 

export const TouchableIconContainer = styled.div<TouchableIconProps>`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: auto;
    height: auto;
    padding: 3px;
    cursor: pointer;

    &:hover {
        opacity: 0.75;
        transition: all 250ms;
    }
`

export const StyledTouchableIcon = styled(FontAwesomeIcon)`${({ theme }) => `
    color: ${ theme.secondaryFontColor };
`}`

export const TouchableIconBadgeContainer = styled.div<TouchableIconProps>`${({ theme, badgeText }) => `
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: nowrap;
    top: -5px;
    right: ${ getRightPositionBasedOnBadgeText(badgeText) }px;
    background-color: ${ theme.alertColor };
    width: auto;
    min-width: ${ getBadgeContainerWidth(badgeText) }px;
    height: 20px;
    padding: 2px;
    border-radius: 10px;
`}`;

export const TouchableIconBadgeText = styled.span`
    color: #fff;
    font-size: 12px;
`;

const getBadgeContainerWidth = (badgeText?: string | number) => {
    if(!badgeText || typeof badgeText !== 'string')
        return 20;
    const badgeTextLength = badgeText.length;
    return badgeTextLength >= 3 ? badgeTextLength * 10 : 20;
}

const getRightPositionBasedOnBadgeText = (badgeText?: string | number) => {
    if(!badgeText || typeof badgeText !== 'string')
        return -5;
    const badgeTextLength = badgeText.length;
    return badgeTextLength >= 3 ? (badgeText.length - 1) * -5 : -5;
}