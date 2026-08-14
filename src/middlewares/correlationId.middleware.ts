import { NextFunction, Request, Response  } from "express"

import { asyncLocalStorage } from "../utils/helpers/request.helper.js";

export const attchCorrelationMiddleware = (req: Request, _res: Response, next: NextFunction) => {
    const correlationId = crypto.randomUUID();

    req.headers['x-correlation-id'] = correlationId;

    asyncLocalStorage.run({ correlationId }, () => next());
}