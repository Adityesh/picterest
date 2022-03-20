import { Request, Response, NextFunction } from 'express';
import { ResponseModel } from '../controllers/auth';
import jwt from 'jsonwebtoken';

export const verifyToken = (req : Request, res : Response, next : NextFunction) : void => {
    if(!req.headers || !req.headers['authorization']) {
        const response : ResponseModel = {
            error : true,
            status : 403,
            message : "Unauthorized",
            data : {},
        };

        res.status(403).json(response);
        return;
    }

    // If token present verify the token
    const token = req.headers['authorization'].split(' ')[1];
    jwt.verify(token, 'SECRET', (err, decodedToken) => {
        if(err || decodedToken == undefined) {
            const response : ResponseModel = {
                error : true,
                status : 403,
                message : "Unauthorized",
                data : {},
            };
    
            res.status(403).json(response);
            return;
        }

        next();
    });
};
