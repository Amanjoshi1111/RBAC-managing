import express, { NextFunction, Request, Response } from "express";
import routes from "./routes";

const app = express();

app.use(express.json());
app.use(routes);

const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction)=>{
    res.status(500).json({
        msg: err.message
    })
}

app.use(errorHandler);

export default app;