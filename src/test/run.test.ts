import {suite, test} from 'mocha-typescript';
import {RunModel, IRun, IRunModel, Run} from '../models/run.model';
import {RunRepository} from '../repositories/run.repository';
import mongoose = require('mongoose');

@suite
class RunTest {
    private data: Run;
    private runRepo: RunRepository;

    public static before() {
        mongoose.Promise = global.Promise;
        const dbServer = 'localhost';
        const dbName = 'rundbtest'
        mongoose.connect(`mongodb://${dbServer}/${dbName}`);
        mongoose.connection.on('error', () => {
            console.log('Mongodb connection error. Please make sure MongoDb is running.');
            process.exit();
        });

        let chai = require('chai');
        chai.should();
    }

    constructor() {
        this.data = {
            distance: 9.5,
            date: new Date(),
            time: 888,
            isRace: false
        }

        this.runRepo = new RunRepository();
    }

    @test("should create a new run")
    public create() {
        return new RunModel(this.data)
            .save()
            .then(result => {
                // verify _id was added on save
                result._id.should.exist;

                // verify distance is correct
                result.distance.should.equal(this.data.distance);

                // verify date is correct
                result.date.should.equal(this.data.date);

                // verify time is correct
                result.time.should.equal(this.data.time);

                // verify isRace is correct
                result.isRace.should.equal(this.data.isRace);
            })
            .catch(err => err.should.not.exist);
    }

    @test("should create a new run using repo")
    public createFromRepo(){
        return this.runRepo.create(this.data)
            .then((newRun: Run) => {
                newRun.should.exist;

                // verify _id was added on save
                newRun._id.should.exist;

                // verify distance is correct
                newRun.distance.should.equal(this.data.distance);

                // verify date is correct
                newRun.date.should.equal(this.data.date);

                // verify time is correct
                newRun.time.should.equal(this.data.time);

                // verify isRace is correct
                newRun.isRace.should.equal(this.data.isRace);
            })
            .catch(err => err.should.not.exist);
    }
}