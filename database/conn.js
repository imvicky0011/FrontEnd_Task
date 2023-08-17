import mongoose from 'mongoose';

const connectMongo = async () => {
    try{
        console.log(process.allowedNodeEnvironmentFlags.MONGO_URI)

        console.log("connection file : " + process.env.MONGO_URI)
        
        const { connection }  = await mongoose.connect(process.env.MONGO_URI)

        if(connection.readyState == 1){
            console.log("Database Connected")
        }

    }catch(errors){
        return Promise.reject(errors)
    }
}

export default connectMongo;