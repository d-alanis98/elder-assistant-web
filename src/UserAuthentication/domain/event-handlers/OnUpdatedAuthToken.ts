import { updateAuthTokenAction } from '../../../Shared/store/reducers/userDuck';
import { AppDispatch } from '../../../Shared/store/store';

/**
 * @author Damián Alanís Ramírez
 * @version 1.1.1
 * @description Handler for the updated auth token.
 */
export default class OnUpdatedAuthToken {
    private readonly dispatch: AppDispatch;

    constructor(dispatch: AppDispatch) { 
        this.dispatch = dispatch;
    };

    /**
     * We dispatch the action to update the token in the redux state.
     */
    handle = (updatedToken: string) => {
        this.dispatch(updateAuthTokenAction(updatedToken));
    }
    
}