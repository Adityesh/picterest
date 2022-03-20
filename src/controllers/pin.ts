import { Request, Response } from "express";
import UserModel from "../models/UserModel";
import Pin from "../models/Pin";
import { ResponseModel } from "./auth";
import mongoose from "mongoose";

interface PinRequest {
    image: string;
    description: string;
    owner: string;
}
/**
 * POST /add
 * Add a pin with the image url and description
 */
export const addPin = async (req: Request, res: Response): Promise<void> => {
    if (req.body == null) {
        const response: ResponseModel = {
            error: true,
            status: 400,
            message: "Invalid data provided",
            data: {},
        };
        res.status(400).json(response);
        return;
    }

    const { image, description, owner } = req.body as PinRequest;

    if (image == null || description == null || owner == null) {
        const response: ResponseModel = {
            error: true,
            status: 400,
            message: "One or more parameters are missing",
            data: {},
        };
        res.status(400).json(response);
        return;
    }

    const newPin = new Pin({
        owner,
        image,
        description,
    });

    newPin.save((err, pin) => {
        if (err) {
            const response: ResponseModel = {
                error: true,
                message: "Failed to save pin",
                data: {},
                status: 500,
            };
            res.status(500).json(response);
            return;
        }

        const response: ResponseModel = {
            error: true,
            message: "Success",
            status: 200,
            data: pin,
        };

        res.status(200).json(response);
    });
};

interface DeleteRequest {
    _id: string;
    owner: string;
}
/**
 * DELETE /delete
 * Delete a pin for a particular user
 */
export const deletePin = async (req: Request, res: Response): Promise<void> => {
    if (req.body == null) {
        const response: ResponseModel = {
            error: true,
            status: 400,
            message: "Invalid data provided",
            data: {},
        };
        res.status(400).json(response);
        return;
    }

    const { _id, owner } = req.body as DeleteRequest;

    if (_id == null || owner == null) {
        const response: ResponseModel = {
            error: true,
            status: 400,
            message: "One or more parameters are missing",
            data: {},
        };
        res.status(400).json(response);
        return;
    }

    const dbPin = await Pin.findOne({ _id, owner });

    if (dbPin == null) {
        const response: ResponseModel = {
            error: true,
            status: 400,
            message: "Not a valid pin",
            data: {},
        };
        res.status(400).json(response);
        return;
    }

    dbPin.isDeleted = true;
    dbPin.save((err, pin) => {
        if (err) {
            const response: ResponseModel = {
                error: true,
                status: 500,
                message: "Failed to delete pin, Try again",
                data: {},
            };
            res.status(500).json(response);
            return;
        }

        const response: ResponseModel = {
            error: true,
            status: 200,
            message: "Success",
            data: pin,
        };
        res.status(200).json(response);
        return;
    });
};

interface LikeRequest {
    pinId: string;
    userId: string;
}

/**
 * /POST Like Pin api
 * Like a pin by a particular user
 */
export const likePin = async (req: Request, res: Response): Promise<void> => {
    if (req.body == null) {
        const response: ResponseModel = {
            error: true,
            status: 400,
            message: "Invalid data provided",
            data: {},
        };
        res.status(400).json(response);
        return;
    }

    const { pinId, userId } = req.body as LikeRequest;

    if (pinId == null || userId == null) {
        const response: ResponseModel = {
            error: true,
            status: 400,
            message: "One or more parameters are missing",
            data: {},
        };
        res.status(400).json(response);
        return;
    }

    const dbPin = await Pin.findById({ _id: pinId }).exec();
    const dbUser = await UserModel.findById({ _id: userId }).exec();

    if (dbPin == null || dbUser == null) {
        const response: ResponseModel = {
            error: true,
            status: 500,
            message: "Pin could not be found",
            data: {},
        };
        res.status(500).json(response);
        return;
    }

    dbPin.likes.push({ ...dbUser, password: null });
    dbUser.likes.push(dbPin);

    dbPin.save((err, _) => {
        if (err) {
            const response: ResponseModel = {
                error: true,
                status: 500,
                message: "Error saving pin",
                data: {},
            };
            res.status(500).json(response);
            return;
        }
    });

    dbUser.save((err, _) => {
        if (err) {
            const response: ResponseModel = {
                error: true,
                status: 500,
                message: "Error saving user",
                data: {},
            };
            res.status(500).json(response);
            return;
        }
    });

    const response: ResponseModel = {
        error: true,
        status: 200,
        message: "Success",
        data: {
            likedPin: dbPin,
            user: dbUser,
        },
    };

    res.status(200).json(response);
    return;
};
