import { Model, Document } from "mongoose";

// This class is the base level class for all database queries
// Each model we have should have a repository that inherits from this.
// All methods return a promise
export class BaseRepository<T, TM extends Document> {
    model: Model<TM>;

    constructor(model:Model<TM>) {
        this.model = model;
    }

    // Returns all entities from the given model
    getAll() {
        return this.model.find().exec();
    }

    // Returns one entity that matches the given id
    getById(id) {
        return this.model.findById(id).exec();
    }

    // Creates a new entity. 
    // entityOverride is an optional parameter to bypass the bodyToEntityFunc
    // i.e. use entityOverride if you only want to update one (or a subset) of the properties
    // set in the bodyToEntityFunc
    create(body: T) {
        return this.model.create(body);
    }

    // Updates a given entity.
    // entityOverride is an optional parameter to bypass the bodyToEntityFunc
    // i.e. use entityOverride if you only want to update one (or a subset) of the properties
    // set in the bodyToEntityFunc
    updateOne(id, body: T) {
        const crit = { _id: id };
        const opts = { new: true, multi: false };

        return this.model.findOneAndUpdate(crit, body, opts).exec();
    }

    // Finds an entity by id and then deletes it
    deleteEntity(id) {
        return this.model.findByIdAndRemove(id).exec();
    }

    // Empty collection of all items
    clearCollection() {
        return this.model.remove({}).exec();
    }
}