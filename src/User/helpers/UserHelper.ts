//Domain
import { ValidUserTypes } from '../domain/User';

/**
 * @author Damian Alanis Ramirez
 * @version 1.1.1
 * @description Helper class for the users entity.
 */
export default class UserHelper {
    /**
     * Method to get a value based on the userType parameter.
     * @param {ValidUserTypes} userType User type.
     * @param {T} primaryUserValue Value to return if the user is a primary user.
     * @param {T} secondaryUserValue Value to return if the user is a secondary user.
     * @returns 
     */
    static getValueBasedOnType = <T = any>(
        userType: ValidUserTypes,
        primaryUserValue: T,
        secondaryUserValue: T
    ) => userType === ValidUserTypes.PRIMARY
        ? primaryUserValue
        : secondaryUserValue;
}