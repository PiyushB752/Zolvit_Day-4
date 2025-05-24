import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";

export default async function connect(){
    const mongoServer = await MongoMemoryServer.create()
    const mongoURI = mongoServer.getUri()

    await mongoose.connect(mongoURI,{dbName:"sample_datas"})
    console.log(`MongoDB connected successfully to ${mongoURI}`)
}
