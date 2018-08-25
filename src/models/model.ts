import {Model} from 'mongoose';
import {IRunModel} from './run.model';

export interface IModel {
    run: Model<IRunModel>;
}