import React from 'react';
import styled from 'styled-components';
//Components
import Label, { LabelProps } from '../../../../Shared/components/Layout/Labels/Label';
//Theme
import ThemeUtils from '../../../../Shared/utils/Theme/ThemeUtils';

interface ContainerProps {
    selected?: boolean;
}

export const ChatListItemContainer = styled.div<ContainerProps>`${({ 
    theme,
    selected 
}) => `
    width: 100%;
    height: 80px;
    cursor: pointer;
    display: flex;
    padding: 10px;
    margin-bottom: 10px;
    flex-direction: row;
    align-items: center;
    border-radius: 15px;
    background-color: ${ ThemeUtils.getThemedTranslucidBackground(theme) };
    opacity: ${ selected ? 0.85 : 1 };
    box-shadow: ${ selected
        ? `1px 1px 7px ${ ThemeUtils.getThemedTranslucidBackground(theme, 0.35) }`
        : 'none'
    };
    &:hover {
        box-shadow: 2px 1px 10px rgba(0,0,0,0.15);
        opacity: 0.75;
        transition: all 300ms;
    }
`}`;


export const ChatListItemDescriptionContainer = styled.div`
    height: 100%;
    display: flex;
    justify-content: center;
    flex-direction: column;
`;


interface ChatNameProps extends LabelProps {
    name: string;
}

export const ChatListItemName = styled(Label)
    .attrs((props: ChatNameProps) => ({
    ...(props as Object),
    fontSize: 17,
    children: props.name
}))<ChatNameProps>`
    opacity: 0.8;
    margin-left: 10px;
    cursor: pointer;
`;



interface ChatListItemNewMessagesBadgeProps extends React.HTMLAttributes<HTMLDivElement> { 
    newMessages?: number;
}

export const ChatListItemNewMessagesBadge = styled.div
    .attrs((props: ChatListItemNewMessagesBadgeProps) => ({
        ...(props as Object),
        children: <Label fontSize={14} color='#fff'>{ props.newMessages }</Label>,
    }))<ChatListItemNewMessagesBadgeProps>`${({ 
        theme, 
        newMessages 
    }) => `
    width: auto;
    min-width: 24px;
    height: 24px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-left: auto;
    padding: 2px;
    opacity: ${ newMessages ? 0.9 : 0 };
    font-size: 12px;
    border-radius: 12px;
    background-color: ${ theme.primaryColor };
`}`;