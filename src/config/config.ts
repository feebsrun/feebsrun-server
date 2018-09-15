export interface IConfig{
    getValue(paramName): string;
};

// This is the default config class
// All production/ default values will be stored here
// Local overrides should be stored in the config.overrides.js file
// Note - override file will not be pushed to git, so you may need to create it
export class Config implements IConfig {
    protected databaseName: string;
    protected databaseServer: string;
    protected logFilePath: string;
    protected jwksUri: string;
    protected jwtAudience: string;
    protected jwtIssuer: string;

    constructor() {
        this.databaseName = 'rundb';
        this.databaseServer = '127.0.0.1';
        this.logFilePath = '../logs/runLog.log';
        this.jwksUri = '<MUST--OVERRIDE>';
        this.jwtAudience = '<MUST--OVERRIDE>';
        this.jwtIssuer = '<MUST--OVERRIDE>';
    }

    getValue(paramName): string {
        return this[paramName];
    }
}

export class ConfigTest extends Config implements IConfig {

    constructor() {
        super();

        this.databaseName = 'rundb_test';
    }
}