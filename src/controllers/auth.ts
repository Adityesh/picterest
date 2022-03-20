import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import UserModel from "../models/UserModel";

export interface ResponseModel {
    error: boolean;
    message: string;
    status: number;
    data: any;
}



interface RegisterModel {
    userName: string;
    email: string;
    password: string;
}
/**
 * POST /register
 * Register api.
 */
export const register = async (req: Request, res: Response): Promise<void> => {
    if(req.body == null) {
        const response: ResponseModel = {
            error: true,
            message: "One or more parameters are missing",
            status: 400,
            data: {},
        };

        res.status(400).json(response);
        return;
    }

    const { userName, email, password } = req.body as RegisterModel;

    if (userName == null || email == null || password == null) {
        const response: ResponseModel = {
            error: true,
            message: "One or more parameters are missing",
            status: 400,
            data: {},
        };

        res.status(400).json(response);
        return;
    }

    // Hash the password and save it to the database
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const newUser = new UserModel({
        userName,
        password: hash,
        email,
    });

    newUser.save((err) => {
        if(err) {
            const response : ResponseModel = {
                error: true,
                message: err.message,
                status: 500,
                data: {},
            };
    
            res.status(500).json(response);
            return;
        }

        const response : ResponseModel = {
            error: false,
            message: "Success",
            status: 200,
            data: newUser,
        };
    
        res.status(200).json(response);
        return; 
        
    });
    

    
};


interface LoginModel {
    userName? : string,
    email? : string,
    password : string
}
/**
 * POST /login
 * Login api
 */
export const login = async (req: Request, res: Response): Promise<void> => {
    if(req.body == null) {
        const response: ResponseModel = {
            error: true,
            message: "One or more parameters are missing",
            status: 400,
            data: {},
        };

        res.status(400).json(response);
        return;
    }

    const { userName, email, password } = req.body as LoginModel;

    if(password == null || (userName == null && email == null)) {
        const response : ResponseModel = {
            error : true,
            message : "One or more parameters are missing",
            status : 400,
            data : {},
        };

        res.status(400).json(response);
        return;
    }

    // Check if the user exists in the database

    const query = userName == null ? UserModel.findOne({ email }) : UserModel.findOne({ userName });

    const userInDB = await query.exec();

    if(userInDB == null) {
        const response : ResponseModel = {
            error : true,
            message : "Invalid credentials",
            data : {},
            status : 400,
        };

        res.status(400).json(response);
        return;
    }

    // If user found then check the hashed passwords
    const isPasswordOk = await bcrypt.compare(password, userInDB.password);
    if(!isPasswordOk) {
        const response : ResponseModel = {
            error : true,
            message : "Incorrect password",
            data : {},
            status : 400,
        };

        res.status(400).json(response);
        return;
    }

    // Sign the jwt and generate a token
    const token = jwt.sign({ userName, email, password }, 'SECRET', { expiresIn : '1h' });

    const response : ResponseModel = {
      error : false,
      message : "Success",
      status : 200,
      data : {
          token,
      },
    };

    res.status(200).json(response);

};

/**
 * GET /username
 * Check username collision
 */
export const username = async (req: Request, res: Response): Promise<void> => {
    res.send(null);
};

/**
 * GET /email
 * Check email collision
 */
export const email = async (req: Request, res: Response): Promise<void> => {
    res.send(null);
};
