import mongoose from "mongoose"

const noteSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    }
}, 
//timestamps sirve para saber cuando se creo o actualizo una nota
{timestamps: true})

//crear el modelo de nota
const Note = new mongoose.model("Note", noteSchema)

export default Note