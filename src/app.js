import express, {json} from "express"
import cors from  "cors"
import dotenv from "dotenv"
import { router } from "./routes/routes.js"

const app = express()
app.use(cors())
app.use(json())
dotenv.config()

app.use(router)

const PORT = process.env.PORT || 5000


app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`)
})