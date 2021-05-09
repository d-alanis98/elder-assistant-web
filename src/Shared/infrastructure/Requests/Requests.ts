
/**
 * @author Damián Alanís Ramírez
 * @version 1.1.1
 * @description Contract for the Requests implementations.
 */
export default interface Requests<T = any> {
    get(url: string, config?: Object): Promise<T>;
    post(url: string, data?: any, config?: Object): Promise<T>;
    put(url: string, data?: any, config?: Object): Promise<T>;
    delete(url: string, config?: Object): Promise<T>;
    instance: any;
}