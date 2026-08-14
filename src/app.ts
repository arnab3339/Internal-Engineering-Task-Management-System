import express from 'express';
import { errorHandler } from './middlewares/error.middleware.js';
import { attchCorrelationMiddleware } from './middlewares/correlationId.middleware.js';
import apiRouter from './routes/index.js';

// Add this patch to handle Prisma's BigInt serialization
(BigInt.prototype as any).toJSON = function () {
    return this.toString();
};

const app = express();

app.use(express.json());
app.use(express.text());

app.use(attchCorrelationMiddleware);

app.get('/health', (_req, res) => {
    res.send({
        status: 'OK'
    });
});

app.use('/api', apiRouter);

app.use(errorHandler);

export { app };