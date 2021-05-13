
/**
 * @author Damian Alanis Ramirez
 * @version 1.1.1
 * @description Object util class.
 */
export default class ObjectHelper {
    /**
     * Method to verify if an object is empty.
     * @param {Object} object Object to verify.
     * @returns 
     */
    static isEmpty = (object: Object) => (
        Object.keys(object).length === 0
    );
}