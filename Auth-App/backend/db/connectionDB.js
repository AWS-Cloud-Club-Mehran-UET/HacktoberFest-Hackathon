// function to configure the mongodb database 
import mongoose from "mongoose";

export const connectDB = async ()=>{    // async function to connect to the database arrow  function
   
    try {
          console.log(process.env.MONGO_URI);
          
     const conn = await  mongoose.connect(process.env.MONGO_URI , {
        
        serverSelectionTimeoutMS: 20000,
     })
      console.log(`mongodb connected:${conn.connection.host}`)
      

    } catch (error) {
        console.log(error.message);
        process.exit(1)
        
    }
}