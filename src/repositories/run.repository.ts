import {RunModel, Run, IRunModel} from '../models/run.model';
import { BaseRepository } from './base.repository';

export class RunRepository extends BaseRepository<Run, IRunModel> {
    constructor() {
        super(RunModel);
    }
}