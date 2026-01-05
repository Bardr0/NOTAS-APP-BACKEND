import express from "express";
import Note from "../model/notesModel.js";

//permite enviar las rutas a la aplicacion principal
const router = express.Router()

// Definir una ruta GET para la raíz
router.get("/", async (req, res) => {
    try {
        const notes = await Note.find()
        res.status(200).json({ message: "Todas la notas", note: notes })


    } catch (error) {
        console.error("Error al obtener las notas:", error)
        res.status(500).json({ message: "Internal server error" })
    }
})


// Definir una ruta GET para obtener una nota por ID
router.get("/:id", async (req, res) => {
    try {
        const note = await Note.findById(req.params.id)
        res.status(404).json({ message: "nota no encontrada" })

    } catch (error) {
        console.error("Error al obtener la nota por ID:", error)
        res.status(500).json({ message: "Internal server error" })
    }

})

// Definir una ruta POST para crear una nueva nota
router.post("/", async (req, res) => {
    try {
        const { title, description } = req.body
        const note = new Note({ title, description })

        //el aewait es para esperar a que se guarde la nota en la base de datos
        const savedNote = await note.save()
        res.status(201).json({ message: "Nota creada correctamente", note: savedNote })


    } catch (error) {
        console.error("Error al crear una nueva nota:", error)
        res.status(500).json({ message: "Interna server error" })

    }
})

// Definir una ruta DELETE para eliminar una nota por ID
router.delete("/:id", async (req, res) => {
    try {
        const id = req.params.id
        const note = await Note.findByIdAndDelete(id)
        if (!note) return res.status(404).json({ error: "Note no eliminada" })
        res.status(200).json({ message: "Nota eliminada correctamente", note: note })

    } catch (error) {

        console.error("Error al eliminar la nota por ID:", error)
        res.status(500).json({ message: "Internal server error" })
    }

})

// Definir una ruta PUT para actualizar una nota por ID
router.put("/:id", async (req, res) => {
    try {
        const { title, description } = req.body
        const id = req.params.id
        // el "new:true"  sirve para que nos devuelva el objeto actualizado en la misma constante
        const note = await Note.findByIdAndUpdate(id, {title, description}, {new: true})
        if (!note) return res.status(404).json({ error: "Note no actualizada" })
        res.status(200).json({ message: "Nota actualizada correctamente", note: note })


    } catch (error) {
        console.error("Error al actualizar la nota por ID:", error)
        res.status(500).json({ message: "Internal server error" })

    }

})

export default router;



