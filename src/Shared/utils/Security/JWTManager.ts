import { decode } from 'jsonwebtoken'; 
import DateHelper from '../Date/DateHelper';
/**
 * @author Damian Alanis Ramirez
 * @version 1.1.1
 * @description JWT util class.
 */
export default class JWTManager {
    /**
     * Method to determine if a JWT token has already expired.
     * @param token JWT token to verify.
     * @returns 
     */
    static isExpiredToken = (token: string) => {
        const decodedToken = decode(token, { complete: true });
        return DateHelper.isTTLDateExpired(decodedToken?.exp);
    }
}