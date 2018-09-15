import * as jwt from 'express-jwt';
import {expressJwtSecret} from 'jwks-rsa';
import {Middleware} from '@decorators/express';
import {Request, Response, NextFunction, Router} from "express";
import {ConfigurationManager} from '../config/configuration.manager';
const config = new ConfigurationManager();

export const authCheck = jwt({
    secret: expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: config.getValue('jwksUri')
    }),
    audience: config.getValue('jwtAudience'),
    issuer: config.getValue('jwtIssuer'),
    algorithms: ['RS256']
});

export class AuthCheckMiddleware implements Middleware {
    use(request: Request, response: Response, next: NextFunction): void {
        authCheck(request, response, next);
    };
}