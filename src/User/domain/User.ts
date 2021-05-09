
export interface UserData {
    name: string;
    type: ValidUserTypes;
    token?: string;
    lastName: string;
    dateOfBirth: string;
    refreshToken?: string;
}

export interface UserPrimitives extends UserData {
    _id: string,
    email: string,
};

export enum ValidUserTypes {
    PRIMARY = 'PRIMARY',
    SECONDARY = 'SECONDARY',
};