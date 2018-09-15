import {Response} from 'express';
import {Logger} from '../logger/custom.logger';

const logger = new Logger('Controller Base');

export class BaseController {
    handleSuccess(res: Response, body: any) {
        return res.send(body);
    }

    handleError(res: Response, body: any) {
        logger.error('Error handling api: ', body);

        return res.status(500).send(body);
    }
}