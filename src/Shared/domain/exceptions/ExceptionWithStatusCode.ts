

export default class ExceptionWithStatusCode extends Error {
    protected _statusCode: number;

    constructor(message: string) {
        super(message);

        this._statusCode = 500;
    }

    public set statusCode(statusCode: number) {
        this._statusCode = statusCode;
    }

    public get statusCode() {
        return this._statusCode;
    }

}