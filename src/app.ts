import * as express from 'express';
import * as bodyParser from 'body-parser'; //used to parse the form data that you pass in the request
import * as path from 'path';
import  mongoose = require('mongoose');
import errorHandler = require('errorhandler');

// routes
import {IndexRoute} from './routes/index';
import {RunRoutes} from './routes/run.routes';

// models
import {IModel} from './models/model';
import {IRunModel} from './models/run.model';

// config
import {ConfigurationManager} from './config/configuration.manager';

// The server, itself
class App {

    public app: express.Application;
    public runRoutes: RunRoutes = new RunRoutes();

    private model: IModel;
    private configurationManager: ConfigurationManager;

    // bootstrap the application
    public static bootstrap(): App {
        return new App();
    }

    // constructor -> set the defaults
    constructor() {
        this.model = Object(); // initialize to an empty object
        this.app = express(); //run the express instance and store in app

        this.configurationManager = new ConfigurationManager();

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

        mongoose.Promise = global.Promise;
        const dbServer = this.configurationManager.getValue('databaseServer');
        const dbName = this.configurationManager.getValue('databaseName');
        mongoose.connect(`mongodb://${dbServer}/${dbName}`);
        mongoose.connection.on('error', () => {
            console.log('Mongodb connection error. Please make sure MongoDb is running.');
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
        let router: express.Router = express.Router();
        
        IndexRoute.create(router);

        this.app.use(router);
    }

}

export default new App().app;