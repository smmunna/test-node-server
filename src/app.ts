import express, { Request, Response, NextFunction } from 'express';
import 'dotenv/config';
import cors from 'cors';
// Import your routes here
import { userRoutes } from './app/modules/user/user.route';
import helmet from 'helmet';
import { orderRoutes } from './app/modules/orders/orders.route';
import { orderController } from './app/modules/orders/orders.controller';

const app = express();

app.use(express.json());
app.use(cors());

// Helmet for Security purpose, hiding the 'Express' server name from Header
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));

// Handling uploading the files to server
app.use('/uploads', express.static('uploads'));

/*
Payment Gateway redirection URL success, fail and cancel
Don't move after the cors policy, it will not work there.
Will show the response like Access Blocked.
*/
app.use('/success/:tranId', orderController.success);
app.use('/fail/:tranId', orderController.fail);
app.use('/cancel/:tranId', orderController.cancel);

// Allow only requests from a specific domain, frontend domain url eg. http://www.example.com
const allowedDomains = ['http://localhost:5173']; // You can add more domains by separating with comma.
// default React.js frontend local domain url
app.use(
    cors({
        origin: function (origin: any, callback) {
            if (allowedDomains.includes(origin) || !origin) {
                // Allow if the request is from the allowed domain or if there's no origin (e.g., from Postman)
                callback(null, true);
            } else {
                callback(new Error('Access blocked: Unauthorized access!!!'));
            }
        },
        credentials: true, // Enable if you want to allow cookies with the request
    }),
);

/*-------------------HANDLE ALL OF YOUR ROUTES HERE ----------------------*/

app.use('/api/v1/users', userRoutes); //users routes
app.use('/api/v1/orders', orderRoutes); //orders routes

/*-------------------HANDLE ALL OF YOUR ROUTES HERE ----------------------*/

// Home route json messages
app.get('/', (req: Request, res: Response) => {
    res.status(200).json({
        success: true,
        message: 'Welcome to Node.js Server',
        author: 'Minhazul Abedin Munna',
        github: 'https://github.com/smmunna',
        linkedin: 'https://www.linkedin.com/in/minhazulabedinmunna/',
    });
});

// Route Error for any  url not found
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
