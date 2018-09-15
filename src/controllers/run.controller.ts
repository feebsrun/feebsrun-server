//import {Request, Response, NextFunction, Router} from "express";
import {Response, Params, Controller, Get, Post, Put, Delete, Body} from '@decorators/express';
//import { RouteHandler, Get } from "../decorators/route.handler";
// import {RunService} from '../services/run.service';
import {Run} from '../models/run.model';
import {RunRepository} from '../repositories/run.repository';
import {AuthCheckMiddleware} from '../auth/auth.helpers';
import { BaseController } from './base.controller';

@Controller('/api/runs')
export class RunController extends BaseController { 
    public runRepo: RunRepository;

    constructor() {
        super();

        this.runRepo = new RunRepository();
    }

    @Get('/', [])
    getRuns(@Response() res){
        return this.runRepo.getAll()
            .then((runs: Run[]) => this.handleSuccess(res, runs))
            .catch(err => this.handleError(res, err));
    }

    @Get('/find/:id', [])
    getRun(@Response() res, @Params('id') id: string) {
        return this.runRepo.getById(id)
            .then((run: Run) => this.handleSuccess(res, run))
            .catch(err => this.handleError(res, err));
    }

    @Post('/add', [])
    addRun(@Response() res, @Body() run: Run) {
        return this.runRepo.create(run)
            .then(() => {
                return this.runRepo.getAll()
                    .then((runs: Run[]) => this.handleSuccess(res, runs))
                    .catch(err => this.handleError(res, err));
            })
            .catch(err => this.handleError(res, err));
    }

    @Put('/update/:id', [])
    updateRun(@Response() res, @Params('id') id: string, @Body() run: Run) {
        return this.runRepo.updateOne(id, run)
            .then(() => {
                return this.runRepo.getAll()
                    .then((runs: Run[]) => this.handleSuccess(res, runs))
                    .catch(err => this.handleError(res, err));
            })
            .catch(err => this.handleError(res, err));
    }

    @Delete('/delete/:id', [])
    deleteRun(@Response() res, @Params('id') id: string) {
        return this.runRepo.deleteEntity(id)
            .then(() => {
                return this.runRepo.getAll()
                    .then((runs: Run[]) => this.handleSuccess(res, runs))
                    .catch(err => this.handleError(res, err));
            })
            .catch(err => this.handleError(res, err));
    }

    // @Get()
    // public getRuns(req: Request, res: Response) {
    //     return this.runService.getRuns(req, res);
    // }

    
    // public routes(app): void { //received the express instance from app.ts file         
    //     app.route('/')
    //         .get((req: Request, res: Response) => {            
    //             res.send({distance: 1, time: 999});
    //         });             
    // }
}