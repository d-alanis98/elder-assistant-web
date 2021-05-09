import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import axiosInstance from './AxiosInstance';
//Requests contract
import Requests from './Requests';

/**
 * @author Damián Alanís Ramírez
 * @version 2.3.4
 * @description Class to make HTTP requests using axios. It allow us to intercept the request, which is very convenient for
 * many use cases, ie: to add authentication headers to it.
 */
export default class AxiosRequest implements Requests<AxiosRequestConfig> {
    static _axios: AxiosInstance;  
    static retry?: boolean = false;
    static token?: string;
    static loggedIn?: boolean;
    static refreshToken?: string;
    static onRequestError?: (errorCode: number, errorMessage?: string) => void;
    static onNewAuthToken?: (newToken: string) => void;

    constructor() {
        AxiosRequest.setInstance();
    }
    
    public get instance() {
        if(!AxiosRequest._axios)
            AxiosRequest.setInstance();
        return AxiosRequest._axios;
    }


    public get = async (url: string, configuration?: AxiosRequestConfig): Promise<AxiosRequestConfig> => (
        AxiosRequest.get(url, configuration)
    );

    public post = async (url: string, data?: any, configuration?: AxiosRequestConfig): Promise<AxiosRequestConfig> => (
        AxiosRequest.post(url, data, configuration)
    );

    public put = async (url: string, data?: any, configuration?: AxiosRequestConfig): Promise<AxiosRequestConfig> => (
        AxiosRequest.put(url, data, configuration)
    );

    public delete = async (url: string, configuration?: AxiosRequestConfig) => (
        AxiosRequest.delete(url, configuration)
    );

    //Facade

    static instance = () => AxiosRequest._axios;


    static get = async (url: string, configuration?: AxiosRequestConfig): Promise<AxiosRequestConfig> => {
        if(!AxiosRequest.instance())
            AxiosRequest.setInstance();
        return AxiosRequest.instance().get(url, configuration)
    };

    static post = async (url: string, data?: any, configuration?: AxiosRequestConfig): Promise<AxiosRequestConfig> => (
        AxiosRequest.instance().post(url, data, configuration)
    );

    static put = async (url: string, data?: any, configuration?: AxiosRequestConfig): Promise<AxiosRequestConfig> => (
        AxiosRequest.instance().put(url, data, configuration)
    );

    static delete = async (url: string, configuration?: AxiosRequestConfig): Promise<AxiosRequestConfig> => (
        AxiosRequest.instance().delete(url, configuration)
    );

    //Internal helpers

    static setInstance = () => {
        if(AxiosRequest._axios !== undefined)
            return;
        //We get the axios ref
        AxiosRequest._axios = axiosInstance;
        //We set the interceptors
        AxiosRequest.setInterceptors();
    }

    static setInterceptors = () => {
        AxiosRequest._axios.interceptors.request.use(
            //On successfull requests we provide the request handler to attach the authorization token as a header
            AxiosRequest.requestHandler,
            //On error we simply reject the promise
            (error: AxiosError) => Promise.reject(error)
        );
        AxiosRequest._axios.interceptors.response.use(
            //On success we simply return the same response
            (response: AxiosResponse) => response,
            //On error, we handle it, refreshing the token if there was an authorization error
            AxiosRequest.responseErrorHandler,
        );
    }

    static requestHandler = (request: AxiosRequestConfig): AxiosRequestConfig | Promise<AxiosRequestConfig> => {
        const { token, loggedIn } = AxiosRequest;
        //We attach the authorization headers
        if(loggedIn)
            request.headers['Authorization'] = `Bearer ${ token }`;

        return request;
    }

    static responseErrorHandler = async (error: AxiosError) => {
        const originalRequest = error.config;
        if (error.response?.status === 401 && AxiosRequest.refreshToken && !AxiosRequest.retry) {
            try {
                AxiosRequest.retry = true;
                //We invoke the refresh token method
                const newAuthorizationToken = await AxiosRequest.refreshAuthorizationToken();
                //We validate the received token
                if(!newAuthorizationToken)
                    throw new Error();
                //We update the token locally
                AxiosRequest.token = newAuthorizationToken;
                //We call the updater method, if provided
                AxiosRequest.onNewAuthToken && AxiosRequest.onNewAuthToken(newAuthorizationToken);
                //We set the flag of retry to false, to be able to retry another request that fails in the future
                AxiosRequest.retry = false;
                //We retry the request
                return AxiosRequest.instance().request(originalRequest);
            } catch(error) {
                //We 'clear' the authorization token
                AxiosRequest.refreshToken = undefined;
                return Promise.reject(error);
            }
        } else if(error.response?.status !== undefined) 
            AxiosRequest.onRequestError && AxiosRequest.onRequestError(error.response?.status, error.message);
    }


    static refreshAuthorizationToken = async (): Promise<string | undefined> => {
        try {
            const response = await axios.post(
                `${ process.env.REACT_APP_SERVER_URL }/refresh-token`,
                { },
                {
                    headers: {
                        'Authorization': `Bearer ${AxiosRequest.refreshToken}`
                    }
                }
            );
            return response.data;
        } catch {
            AxiosRequest.refreshToken = undefined;
            return undefined;
        }
    }


}
