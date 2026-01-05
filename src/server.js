// Importar express:libreria paa creacion de servidores
import express from 'express'
import notesRoutes from './routes/notesRoutes.js'
//importar dotenv para variables de entorno
import dotenv from 'dotenv'
//importar la conexion a la base de datos
import { connectDB } from './config/db.js'
import cors from "cors"

//nos permite acceder al archivo dotenv
dotenv.config()

// Crear una instancia de express
const app = express()

app.use(cors({
  origin: ["http://localhost:5173", "https://peppy-longma-2b2c3e.netlify.app"]
}))

//middleware para que el servidor entienda json
app.use(express.json())

//middleware para rutas de notas
app.use("/api/note", notesRoutes)

const PORT = process.env.PORT || 3001

// Conectar a la base de datos y luego iniciar el servidor
connectDB()
// el .then es para esperar a que la conexion a la base de datos se complete
  .then(() => {
    // Iniciar el servidor en el puerto 3000
    app.listen(PORT, () => {
      console.log(`Server levantado en http://localhost:${PORT}`)
    })
  })





