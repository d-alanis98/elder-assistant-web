import { UserPrimitives } from '../../User/domain/User';


export interface AuthenticationResponse {
    user: UserPrimitives;
    token: string;
    refreshToken: string;
}