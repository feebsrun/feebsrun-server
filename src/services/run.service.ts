import {RunRepository} from '../repositories/run.repository';
import {Request, Response} from 'express';
import {Run} from '../models/run.model';
import {handleSuccess, handleError} from './express.helpers';

const runRepo = new RunRepository();

export class RunService {
    runRepo: RunRepository;

    constructor() {
        this.runRepo = new RunRepository();
    }

    getRuns(req: Request, res: Response) {
        runRepo.getAll()
            .then((runs: Run[]) => handleSuccess.call(res, runs))
            .catch(err => handleError.call(res, err));
    }

    addRun(req: Request, res: Response) {
        const run = req.body as Run;
        runRepo.create(run)
            .then(() => this.getRuns(req, res))
            .catch(err => handleError.call(res, err));
    }

    getRun(req: Request, res: Response) {
        runRepo.getById(req.params.id)
            .then((run: Run) => handleSuccess.call(res, run))
            .catch(err => handleError.call(res, err));
    }

    updateRun(req: Request, res: Response) {
        const run = req.body as Run;
        runRepo.updateOne(req.params.id, run)
            .then(()=> this.getRuns(req, res))
            .catch(err => handleError.call(res, err));
    }

    deleteRun(req: Request, res: Response) {
        runRepo.deleteEntity(req.params.id)
            .then(() => this.getRuns(req, res))
            .catch(err => handleError.call(res, err));
    }
}