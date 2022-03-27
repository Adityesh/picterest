import { Request, Response } from "express";
import { ResponseModel } from "./auth";
import UserModel from "../models/UserModel";
import { Pin } from "../models/Pin";
import mongoose from "mongoose";

interface AccountRequest {
    _id?: mongoose.Types.ObjectId;
}
/**
 * GET /account
 * Get account information
 */
export const account = async (req: Request, res: Response): Promise<void> => {
    if (req.query == null) {
        const response: ResponseModel = {
            error: true,
            status: 400,
            message: "Invalid user id provided",
            data: {},
        };
        res.status(400).json(response);
        return;
    }

    const { _id } = req.query as AccountRequest;

    if (_id == null || !_id) {
        const response: ResponseModel = {
            error: true,
            status: 400,
            message: "Invalid user id provided",
            data: {},
        };
        res.status(400).json(response);
        return;
    }

    UserModel.findById({ _id })
        .populate<{ child: Pin }>("pins")
        .orFail()
        .select('-password')
        .exec()
        .then(doc => {
            // Works
            if (doc == null) {
                const response: ResponseModel = {
                    error: true,
                    status: 400,
                    message: "User couldn't be found",
                    data: {},
                };
                res.status(400).json(response);
                return;
            }

            const response: ResponseModel = {
                error: false,
                message: "Success",
                status: 200,
                data: {
                   doc,
                },
            };

            res.status(200).json(response);
        });
};

interface DeleteRequest {
    _id: string;
}
/**
 * DELETE /account
 * Delete account
 */
export const deleteAccount = async (
    req: Request,
    res: Response,
): Promise<void> => {
    if (req.body == null) {
        const response: ResponseModel = {
            error: true,
            status: 400,
            message: "Invalid user id provided",
            data: {},
        };
        res.status(400).json(response);
        return;
    }

    const { _id } = req.body as DeleteRequest;

    if (_id == null) {
        const response: ResponseModel = {
            error: true,
            status: 400,
            message: "Invalid user id provided",
            data: {},
        };
        res.status(400).json(response);
        return;
    }

    const user = await UserModel.findById(_id).exec();

    if (user == null) {
        const response: ResponseModel = {
            error: true,
            message: "User not found",
            data: {},
            status: 400,
        };
        res.status(400).json(response);
        return;
    }

    user.isDeleted = true;
    user.save(err => {
        if (err) {
            const response: ResponseModel = {
                error: true,
                message: "Error deleting the user, Try again later",
                data: {},
                status: 500,
            };
            res.status(500).json(response);
            return;
        }
    });
    const response: ResponseModel = {
        error: false,
        message: "User Account Deleted",
        data: {
            _id,
        },
        status: 200,
    };

    res.status(200).json(response);
};
