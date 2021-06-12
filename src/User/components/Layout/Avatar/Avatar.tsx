import React, { useCallback } from 'react';
//Domain
import { UserPrimitives } from '../../../domain/User';
//Hooks
import { useAppSelector } from '../../../../Shared/store/hooks';
//Styled components
import { AvatarContainer, AvatarNameContainer } from './Avatar.styles';

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
    size: number;
    userName?: string;
    marginLeft?: number;
    marginRight?: number;
    resizeImage?: boolean;
    userLastName?: string;
}

const Avatar: React.FC<AvatarProps> = ({ 
    size,
    userName,
    marginLeft,
    marginRight,
    resizeImage = false,
    userLastName,
    ...ownProps 
}) => {
    /**
     * Hooks
     */
    //State selector
    const { 
        name: { 0: stateNameInitial }, 
        lastName: { 0: stateLastNameInitial } 
    } = useAppSelector(state => state.user);

    //Callbacks
    const getInitials = useCallback(() => {
        if(!userName || !userLastName)
            return `${ stateNameInitial }${ stateLastNameInitial }`;
        return `${ userName[0] }${ userLastName[0] }` 
    }, [
        userName,
        userLastName,
        stateNameInitial,
        stateLastNameInitial
    ]);

    return (
        <AvatarContainer
            size = { size }
            marginLeft = { marginLeft }
            marginRight = { marginRight }
            { ...ownProps }
        >
            <AvatarNameContainer>
                { getInitials() }
            </AvatarNameContainer>
        </AvatarContainer>
    );
}

export default React.memo(Avatar);

//Simple avatar
interface ExternalAvatarProps extends React.HTMLAttributes<HTMLDivElement> {
    user: UserPrimitives;
    size: number;
    marginLeft?: number;
    marginRight?: number;
}
export const ExternalUserAvatar: React.FC<ExternalAvatarProps> = ({
    user,
    size,
    marginLeft,
    marginRight,
    ...ownProps
}) => (
    <AvatarContainer
        size = { size }
        marginLeft = { marginLeft }
        marginRight = { marginRight }
        { ...ownProps }
    >
        <AvatarNameContainer>
            { user.name[0] }{ user.lastName[0] }
        </AvatarNameContainer>
    </AvatarContainer>
);