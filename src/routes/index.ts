import {NextFunction, Request, Response, Router} from 'express';
import {BaseRoute} from './route';

export class IndexRoute extends BaseRoute {
    public static create(router: Router) {
        console.log('[IndexRoute::create] Creating index route.');

        // add home page route
        router.get('/', (req: Request, res: Response, next: NextFunction) => {
            new IndexRoute().index(req, res, next);
        })
    }

    constructor() {
        super();
    }

    public index(req: Request, res: Response, next: NextFunction) {
        this.title = "Home | FeebsRun";

        this.render(req, res, 'index');
    }
}