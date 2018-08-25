import * as log4js from 'log4js';
import {join} from 'path';
import {ConfigurationManager} from '../config/configuration.manager';

// Custom logger class that handles logging to both the console and file
export class Logger {
    private logger: log4js.Logger;

    static initialize() {
        const config = new ConfigurationManager();
        const logPath = config.getValue('logFilePath');
        const logFile = join(__dirname, logPath);

        log4js.configure({
            appenders: {
                file: { type: 'dateFile', filename: logFile, compress: true }
            },
            categories: {
                default: { appenders: ['file'], level: 'debug' }
            }
        });
    }

    constructor(loggerName: string) {
        this.logger = log4js.getLogger(loggerName);
    }

    debug(message: string, body?: Object){
        this.logger.debug(message, body);
        console.debug(message, body);
    }

    info(message: string, body?: Object) {
        this.logger.info(message, body);
        console.info(message, body);
    }

    warn(message: string, body?: Object) {
        this.logger.warn(message, body);
        console.warn(message, body);
    }

    error(message: string, body?: Object) {
        this.logger.error(message, body);
        console.error(message, body);
    }
}

Logger.initialize();