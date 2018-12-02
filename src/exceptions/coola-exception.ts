export enum CoolaError {
    MISSING_PATH = 'Missing path',
    SERVICE_ERROR = 'Service error',
    MISSING_SERVICE_NAME = 'Missing service name',
    DUPLICATE_SERVICE_NAME = 'Duplicate service name'
}

export class CoolaException extends Error {
    private readonly statusCode: number;
    constructor(statusCode: number, message: string) {
        super(message);
        this.statusCode = statusCode;
    }

    public getStatusCode(): number {
        return this.statusCode;
    }
}
