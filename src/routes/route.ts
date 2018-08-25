import { NextFunction, Request, Response } from 'express';

// Base Route Class -> All routes classes will extend this
export class BaseRoute {
    protected title: string;

    private scripts: string[];

    constructor() {
        // initialize variables
        this.title = "BaseRoute";
        this.scripts = [];
    }

    public addScript(src: string): BaseRoute {
        this.scripts.push(src);
        return this;
    }

    public render(req: Request, res: Response, view: string, options?: Object) {
        res.locals.BASE_URL = '/';

        res.locals.scripts = this.scripts;

        res.locals.title = this.title;

        res.render(view, options);
    }
}