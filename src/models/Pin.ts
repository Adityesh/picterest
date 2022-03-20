import mongoose, { model, Schema } from "mongoose";
import { User } from "./UserModel";

export interface Pin {
    image: string;
    description: string;
    owner: User;
    likes: Array<User>,
    isDeleted : boolean,
}

const PinSchema = new Schema<Pin>({
    image: {
        type: String,
        required: true,
    },

    description: {
        type: String,
        required: true,
    },

    owner: {
        type: mongoose.Types.ObjectId,
        ref: "User",
    },

    likes: [
        {
            type: mongoose.Types.ObjectId,
            ref: "User",
        },
    ],

    isDeleted : {
        type : Boolean,
        default : false,
    },
});

export default model<Pin>("Pin", PinSchema);
