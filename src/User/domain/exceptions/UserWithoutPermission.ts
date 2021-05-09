import ExceptionWithStatusCode from '../../../Shared/domain/exceptions/ExceptionWithStatusCode';


/**
 * @author Damián Alanís Ramírez
 * @version 1.1.1
 * @description Custom exception to throw when a user does not have permission to perform certain action.
 */
export default class UserWithoutPermission extends ExceptionWithStatusCode {
    constructor() {
        super('User without permissions');
        //Forbidden status code
        this.statusCode = 403;
    }
}