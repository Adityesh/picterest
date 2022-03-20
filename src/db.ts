import mongoose from "mongoose";

export default async function connect() : Promise<void>{
    const db = mongoose.connection;
    Promise.resolve(mongoose.connect('mongodb://localhost:27017/pictrest'));
    db.on('open', () => {
        console.log("Connected to the database");
    });

    db.on('disconnected', () => console.log("Database connection disconnected"));
}
