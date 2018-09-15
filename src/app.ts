import * as express from 'express';
import * as bodyParser from 'body-parser'; //used to parse the form data that you pass in the request
import * as path from 'path';
import  mongoose = require('mongoose');
import errorHandler = require('errorhandler');
import {attachControllers} from '@decorators/express';

// routes
import {RunController} from './controllers/run.controller';

// models
import {IModel} from './models/model';
import {IRunModel} from './models/run.model';

// config
import {ConfigurationManager} from './config/configuration.manager';

// logger
import {Logger} from './logger/custom.logger';

// The server, itself
class App {

    public app: express.Application;
    private configurationManager: ConfigurationManager;
    private logger: Logger;

    // bootstrap the application
    public static bootstrap(): App {
        return new App();
    }

    // constructor -> set the defaults
    constructor() {
        this.app = express(); //run the express instance and store in app

        this.configurationManager = new ConfigurationManager();
        this.logger = new Logger('App');

        // Configure application
        this.config();
        
        // add routes
        this.routes();

        // add api
        this.api();
    }

    public api() {
        // empty for now
    }

    private config(): void {
        // support application/json type post data
        this.app.use(bodyParser.json());
        //support application/x-www-form-urlencoded post data
        this.app.use(bodyParser.urlencoded({
            extended: false
        }));

        this.app.use(function(req, res, next) {
            // Allow CORS
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

            // Disable content caching
            res.header("Cache-Control", "no-cache, no-store, must-revalidate");
            res.header("Pragma", "no-cache");
            res.header("Expires", "0");

            next();
        });

        mongoose.Promise = global.Promise;
        const dbServer = this.configurationManager.getValue('databaseServer');
        const dbName = this.configurationManager.getValue('databaseName');
        mongoose.connect(`mongodb://${dbServer}/${dbName}`);
        mongoose.connection.on('error', () => {
            this.logger.error('Mongodb connection error. Please make sure MongoDb is running.');
            process.exit();
        });
        
        // catch 404 and forward to error handler
        this.app.use(function(err: any, req: express.Request, res: express.Response, next: express.NextFunction) {
            err.status = 404;
            next(err);
        });

        //error handling
        this.app.use(errorHandler());
    }

    // create and return router
    private routes() {
        attachControllers(this.app, [
            RunController
        ]);
        
    }

}

export default new App().app;