//Dispatcher
import { AppDispatch } from '../../store/store';
//Actions
import { sessionExpiredAction } from '../../store/reducers/userDuck';

/**
 * @author Damián Alanís Ramírez
 * @version 1.1.1
 * @description Request errors handler. Dispatches the corresponding actions for each status code.
 */
export default class RequestErrorHandler {
    readonly dispatch: AppDispatch;
    
    constructor(dispatch: AppDispatch) {
        this.dispatch = dispatch;
    }

    handle = (status: number, message?: string) => {
        switch(status) {
            case 401:
                this.dispatch(sessionExpiredAction());
        }
    }
}