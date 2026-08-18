import { Router } from "express";
import { TaskController } from "../../controllers/task.controller.js";
import { TaskService } from "../../services/task.service.js";
import { TaskRepository } from "../../repositories/task.repository.js";
import { authenticateUser } from "../../middlewares/authentication.middleware.js";
import { validateRequestParams } from "../../middlewares/validate.middleware.js";
import { taskIdSchema, updateTaskSchema } from "../../dtos/task.dto.js";
import { validateRequestBody } from "../../middlewares/validate.middleware.js";
const taskController = new TaskController(new TaskService(new TaskRepository()));

const taskRouter = Router();

taskRouter.get(
    "/:taskId",
    authenticateUser,
    validateRequestParams(taskIdSchema),
    taskController.getTaskByIdHandler.bind(taskController)
);

taskRouter.patch(
    "/:taskId",
    authenticateUser,
    validateRequestParams(taskIdSchema),
    validateRequestBody(updateTaskSchema), 
    taskController.updateTaskHandler.bind(taskController)
);

export default taskRouter;