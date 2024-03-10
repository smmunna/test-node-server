import express, { Request, Response, NextFunction } from 'express'
import 'dotenv/config'
import cors from 'cors'
import { userRoutes } from './app/modules/user/user.route'

const app = express()

app.use(express.json())
app.use(cors())

// Route handlings;
app.use('/api/v1/users', userRoutes)


app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!')
})

// Route Error
app.all('*', (req: Request, res: Response) => {
    res.status(404).json({
        status: 404,
        message: 'Not Found'
    })   
})

// Global Error Handler
app.use((error:any, req:Request, res:Response, next:NextFunction)=>{
    if(error)
    {
        res.status(500).send({
            success: false,
            message: error.message
        })
    }
})

export default app;