import {Schema} from 'mongoose'

export class BaseModel {
    _id?: Schema.Types.ObjectId;
    createdAt?: Date;
    updatedAt?: Date;
}