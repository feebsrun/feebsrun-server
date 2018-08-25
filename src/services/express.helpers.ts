import {Logger} from '../logger/custom.logger';
const logger = new Logger('Express Helpers');

// Express helper to send a success to the client
export function handleSuccess(result){
    return this.send(result);
};

// Express helper to send an error to the client
export function handleError(err){
    logger.error('Error handling express route', err);
    return this.status(500).send(err);
};