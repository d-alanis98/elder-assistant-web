import React from 'react';
import styled from 'styled-components';
//Components
import Label, { LabelProps } from '../../../../Shared/components/Layout/Labels/Label';
//Theme
import ThemeUtils from '../../../../Shared/utils/Theme/ThemeUtils';

export const ChatListItemContainer = styled.div`${({ theme }) => `
    width: 100%;
    height: 80px;
    display: flex;
    padding: 10px;
    margin-bottom: 10px;
    flex-direction: row;
    align-items: center;
    border-radius: 15px;
    background-color: ${ ThemeUtils.getThemedTranslucidBackground(theme) };
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