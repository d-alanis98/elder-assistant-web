//Domain
import { ValidUserTypes } from '../../../User/domain/User';
//Store
import rootStore, { RootState } from '../../store/store';

/**
 * @author Damián Alanís Ramírez
 * @version 1.1.1
 * @description Class to manage the user roles (primary or secondary) across the app in
 * a more reusable and mantainable way.
 */
export default class UserRoles {
    readonly store: RootState;

    constructor(store?: RootState) {
        this.store = store || rootStore.getState();
    }

    hasRole = (role: string) => {
        const { user } = this.store;
        return user.type === role;
    }

    isPrimaryUser = () => this.hasRole(ValidUserTypes.PRIMARY);

    isSecondaryUser = () => this.hasRole(ValidUserTypes.SECONDARY);
}