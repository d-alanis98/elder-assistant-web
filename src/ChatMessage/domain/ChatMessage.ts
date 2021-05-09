/**
 * @author Damian Alanis Ramirez
 * @version 1.1.1
 * @description Aggregates and value object specification for the ChatMessage entity.
 */

export interface ChatMessagePrimitives {
    _id: string;
    from: string;
    chatId: string;
    content: ChatMessageContent;
    issuedAt: string;
}


export interface ChatMessageContent {
    type: ValidChatMessageTypes;
    content: string | ChatMessageFileParameters;
}

export interface ChatMessageFileParameters {
    fileHash?: string;
    fileSize: string | number;
    fileName: string;
    extension: string;
}

export enum ValidChatMessageTypes {
    TEXT = 'TEXT',
    IMAGE = 'IMAGE',
    AUDIO = 'AUDIO',
    VIDEO = 'VIDEO'
};