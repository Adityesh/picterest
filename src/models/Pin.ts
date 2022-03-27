import mongoose, { model, Schema } from "mongoose";
import paginate from 'mongoose-paginate-v2';
import { User } from "./UserModel";

export interface Pin {
    image: string;
    description: string;
    owner: User;
    likes: Array<User>,
    isDeleted : boolean,
    tags : Array<string>
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

    tags : [{
        type : String,
    }],

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



PinSchema.plugin(paginate);

export default model<Pin>("Pin", PinSchema);
