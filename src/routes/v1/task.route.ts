import { Router } from "express";
import { TaskController } from "../../controllers/task.controller.js";
import { TaskService } from "../../services/task.service.js";
import { TaskRepository } from "../../repositories/task.repository.js";
import { authenticateUser } from "../../middlewares/authentication.middleware.js";
import { validateRequestParams } from "../../middlewares/validate.middleware.js";
import { taskIdSchema } from "../../dtos/task.dto.js";

const taskController = new TaskController(new TaskService(new TaskRepository()));

const taskRouter = Router();

taskRouter.get(
    "/:taskId",
    authenticateUser,
    validateRequestParams(taskIdSchema),
    taskController.getTaskByIdHandler.bind(taskController)
);

export default taskRouter;