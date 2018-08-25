import {Document, Schema, model, Model} from 'mongoose';
import {BaseModel} from './base.model';

// Interface to define run properties used in mongoose schema
export interface IRun {
    distance: Number;
    time: Number; // save times in ms
    date: Date;
    isRace: Boolean;
}

// Interface to include Document properties on IRun schema used in mongoose schema
export interface IRunModel extends IRun, Document {}

// Mongoose schema for the Run collection
export const RunSchema: Schema = new Schema({
    distance: Number,
    time: Number, // save times in ms
    date: Date,
    isRace: Boolean
}, {
    timestamps: true
});

// Mongoose model for the run collection
export const RunModel: Model<IRunModel> = model<IRunModel>('runs', RunSchema);

// Explicit run class to be used within server code
export class Run extends BaseModel implements IRun {
    distance: Number;
    time: Number; // save times in ms
    date: Date;
    isRace: Boolean;
};