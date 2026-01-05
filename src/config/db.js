//libreria para conectar a la base de datos
import mongoose from 'mongoose' 


// Connect to MongoDB
//async = asincrona 
export const connectDB = async () => {
    try{
        const dbURI = process.env.MONGO_URI

        //conexion a la base de datos
        mongoose.connect(dbURI)
        console.log("Base de datos conectada")

    }catch(error){
        console.error("Error al conectar a la base de datos:", error)
        process.exit(1)  
    }
}