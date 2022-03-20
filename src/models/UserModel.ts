import mongoose, { model, Schema } from "mongoose";
import uniqueValidator from 'mongoose-unique-validator';
import { Pin } from './Pin';

export interface User {
    userName : string,
    email : string,
    password : string,
    pins : Array<Pin>,
    isDeleted : boolean,
    likes : Array<Pin>
}

const UserSchema = new Schema<User>(
    {
        userName: { type: String, required: true, unique : true },
        email: {
            type: String,
            trim: true,
            lowercase: true,
            unique: true,
            validate: {
                validator: function (v: string) {
                    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
                        v,
                    );
                },
                message: "Please enter a valid email",
            },
            required: [true, "Email required"],
        },
        password: { type: String, required: true },
        pins : [{
            type : mongoose.Types.ObjectId,
            ref : "Pin",
        }],
        likes : [{
            type : mongoose.Types.ObjectId,
            ref : "Pin",
        }],
        isDeleted : { type : Boolean, default : false },
    },
    
    { timestamps: true, versionKey : false },
);

UserSchema.plugin(uniqueValidator, { message: 'Error, expected {PATH} to be unique.' });

export default model<User>('User', UserSchema);
