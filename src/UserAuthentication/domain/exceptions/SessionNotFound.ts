import ExceptionWithStatusCode from '../../../Shared/domain/exceptions/ExceptionWithStatusCode';


export default class SessionNotFound extends ExceptionWithStatusCode {
    constructor() {
        super('Session not found, please login');
        //We set the status code
        this.statusCode = 401;
    }
}