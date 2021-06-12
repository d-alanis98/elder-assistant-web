import React from 'react';
import styled from 'styled-components';
//Components
import Label from '../../../../../Shared/components/Layout/Labels/Label';
import LabelWithIcon from '../../../../../Shared/components/Layout/Labels/LabelWithIcon/LabelWithIcon';
import TouchableIcon from '../../../../../Shared/components/Layout/Icons/TouchableIcon/TouchableIcon';
import ButtonWithIcon from '../../../../../Shared/components/Layout/Buttons/ButtonWithIcon/ButtonWithIcon';
//Icons
import { faKeyboard, faUserCheck, faUserClock, faUserPlus } from '@fortawesome/free-solid-svg-icons';
//Theme
import ThemeUtils from '../../../../../Shared/utils/Theme/ThemeUtils';
//Constants
import { layoutConstants } from '../../../../../Shared/components/Layout/Layout';

export const UsersListContainer = styled.ul`
    display: flex;
    flex-direction: column;
    width: clamp(300px, 100%, 550px);
    padding: 0;
    list-style: none;
`;

//UsersListItem

export const UsersListItemContainer = styled.li`${({ theme }) => `
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 1.5rem 1rem;
    border: 1px solid ${ ThemeUtils.getThemedTranslucidBackground(theme, 0.25) };
    margin-bottom: 0.5rem;
    border-radius: 1rem;

    &:hover {
        opacity: 0.75;
        transform: scale(1.005);
        box-shadow: 1px 1px 10px ${ ThemeUtils.getThemedTranslucidBackground(theme, 0.25) };
        transition: all 300ms;
    }
`}`;

export const UserListItemRow = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
`;

interface UserListItemColumnProps extends React.HTMLAttributes<HTMLDivElement> {
    marginLeft?: string;
    marginRight?: string;
}

export const UserListitemColumn = styled.div<UserListItemColumnProps>`${({ 
    marginLeft,
    marginRight
}) => `
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-right: ${ marginRight || 'auto' };
    margin-left: ${ marginLeft || '2rem' };
    & > * {
        margin-bottom: 0.5rem;
    }
`}`;

export const UserListItemLabel = styled(Label)`
    font-size: 1.1rem;

    @media (max-width: ${ layoutConstants.breakPoints.lg }) {
        font-size: 0.9rem;
    }
`;  

export const UserListItemSubText = styled(Label)`
    font-size: 0.85rem;
    opacity: 0.8;

    @media (max-width: ${ layoutConstants.breakPoints.lg }) {
        font-size: 0.75rem;
    }
`;

export const UsersListItemSubscriptionButton = styled(ButtonWithIcon)
    .attrs(props => ({
        ...(props as Object),
        icon: faUserPlus,
        buttonText: '',
        buttonType: 'success',
        fontSize: 16
    }))`
    width: 2.85rem;
    height: 2.85rem;
    margin: 0;
    padding: 0.1rem;
    & svg {
        margin: 0;
    }
`;

export const PendingSubscriptionIcon = styled(TouchableIcon)
    .attrs(props => ({
        ...(props as Object),
        icon: faUserClock
    }))`${({ theme }) => `
    font-size: 1.35rem;
    color: ${ theme.informationColor };
`}`;

export const AcceptedSubscriptionIcon = styled(TouchableIcon)
    .attrs(props => ({
        ...(props as Object),
        icon: faUserCheck
    }))`${({ theme }) => `
    font-size: 1.35rem;
    color: ${ theme.primaryColor };
`}`;

//FirstRenderBanner
export const FirstRenderBannerContainer = styled.div`
    width: 100%;
    min-height: 40vh;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
`;

export const FirstRenderBannerTitle = styled(LabelWithIcon)
    .attrs(props => ({
        ...(props as Object),
        icon: faKeyboard,
        text: 'Ingrese el nombre del usuario que desea buscar',
        fontSize: '1.25rem'
    }))`
`;

export const FirstRenderBannerImage = styled.img
    .attrs(props => ({
        ...(props as Object),
        src: '/assets/illustrations/clip-252.png',
        alt: 'Banner image'
    }))`
    width: clamp(200px, auto, 350px); 
    max-height: 40vh;
    margin-top: 1.5rem;
`;