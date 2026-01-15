import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MongoDBuri = process.env.MONGODB;

export const setupTheDatabase = () => {
    mongoose.connect(MongoDBuri).then(() => {
        console.log("Connection with database is successfull");
    }).catch((error) => {
        console.log("Unable to connect with Database");
    });
};