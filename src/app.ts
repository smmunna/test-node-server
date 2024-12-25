import express, { Request, Response, NextFunction } from 'express';
import 'dotenv/config';
import cors from 'cors';
import helmet from 'helmet';
import { orderController } from './app/modules/orders/orders.controller';
import router from './app/routes';
import config from './app/config';

const app = express();

app.use(express.json());
app.use(cors());

// Helmet for Security purpose, hiding the 'Express' server name from Header
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));

// Handling uploading the files to server
app.use('/uploads', express.static('uploads'));

/*
Payment Gateway redirection URL 'success, fail and cancel'
Don't move after the cors policy, it will not work there.
Because we are serving the payment gateway by using another server url (e.g. https://sslcommerze.com/api/payment)
Will show the response like Access Blocked. [by default sslcommerze, you can use others payment gateway]
*/
app.use('/success/:tranId', orderController.success);
app.use('/fail/:tranId', orderController.fail);
app.use('/cancel/:tranId', orderController.cancel);

// Allow only requests from a specific domain, frontend domain url eg. http://www.example.com, modify- src/app/config/index.ts
app.use(config.corsConfig)

/*-------------------HANDLE ALL OF YOUR ROUTES HERE ----------------------*/
app.use('/api/v1', router); //Main routes
/*-------------------HANDLE ALL OF YOUR ROUTES HERE ----------------------*/

// Home route json messages
app.get('/', (req: Request, res: Response) => {
    res.status(200).json({
        success: true,
        message: 'Welcome to Node.js Server',
        author: 'Minhazul Abedin Munna',
        github: 'https://github.com/smmunna',
        linkedin: 'https://www.linkedin.com/in/minhazulabedinmunna/',
        year: '2023-2025©',
    });
});

// Route Error for any  url not found .
app.all('*', (req: Request, res: Response) => {
    res.status(404).json({
        status: 404,
        message: 'Not Found',
    });
});

// Global Error Handler
app.use((error: any, req: Request, res: Response, next: NextFunction) => {
    if (error) {
        res.status(500).send({
            success: false,
            message: error.message,
        });
    }
});

export default app;
