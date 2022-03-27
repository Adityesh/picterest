import { Request, Response } from "express";
import UserModel from "../models/UserModel";
import PinModel, { Pin } from "../models/Pin";
import { User } from "../models/UserModel";
import { ResponseModel } from "./auth";
import mongoose from "mongoose";

interface PinRequest {
    image: string;
    description: string;
    owner: string;
    tags: Array<string>;
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

    const { image, description, owner, tags } = req.body as PinRequest;

    if (image == null || description == null || owner == null || tags == null) {
        const response: ResponseModel = {
            error: true,
            status: 400,
            message: "One or more parameters are missing",
            data: {},
        };
        res.status(400).json(response);
        return;
    }

    const newPin = new PinModel({
        owner,
        image,
        description,
        tags,
    });

    newPin.save(async (err, pin) => {
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

        const userDb = await UserModel.findById(owner).exec();

        userDb.pins.push(pin);

        userDb.save((err, doc) => {
            res.status(200).json(response);
        });
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

    const dbPin = await PinModel.findOne({ _id, owner });

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
    pinId: mongoose.Types.ObjectId;
    userId: mongoose.Types.ObjectId;
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

    const dbPin = await PinModel.findById({ _id: pinId }).exec();
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

    dbPin.likes.push(dbUser);
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

interface GetPinsRequest {
    page?: number;
    limit: number;
}

interface GetPinsResult {
    page: number;
    totalPages: number;
    totalCount: number;
    documents: any;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
}

/**
 * /GET Get all pins paginated
 *
 */
export const GetPins = async (
    { body }: Request,
    res: Response,
): Promise<void> => {
    const { page = 1, limit = 0 } = body as GetPinsRequest;

    const getQuery = PinModel.find({});

    const countDocuments = await getQuery.countDocuments();
    const totalPages = Math.floor(countDocuments / limit);
    PinModel.find({})
        .skip(limit * page)
        .populate<{ child: User }>("owner likes", "-password")
        .limit(limit)
        .exec((err, documents) => {
            if (err) {
                const response: ResponseModel = {
                    error: true,
                    message: `Could not fetch pins, ${err.message}`,
                    data: {},
                    status: 500,
                };

                res.status(500).json(response);
                return;
            }

            const paginatedResponse: GetPinsResult = {
                page,
                totalCount: countDocuments,
                totalPages,
                documents,
                hasNextPage: page < totalPages,
                hasPreviousPage: page > 1,
            };

            const response: ResponseModel = {
                error: false,
                message: "Success",
                data: paginatedResponse,
                status: 200,
            };

            res.status(200).json(response);
            return;
        });
};
