import {Request, Response, NextFunction, Router} from "express";
import {BaseRoute} from './route';
import { RouteHandler, Get } from "../decorators/route.handler";
import {RunService} from '../services/run.service';
import { IRun } from "../models/run.model";

@RouteHandler('/api/runs')
export class RunRoutes extends BaseRoute { 
    public runService: RunService;

    constructor() {
        super();

        this.runService = new RunService();
    }

    @Get()
    public getRuns(req: Request, res: Response) {
        return this.runService.getRuns(req, res);
    }

    
    public routes(app): void { //received the express instance from app.ts file         
        app.route('/')
            .get((req: Request, res: Response) => {            
                res.send({distance: 1, time: 999});
            });             
    }
}