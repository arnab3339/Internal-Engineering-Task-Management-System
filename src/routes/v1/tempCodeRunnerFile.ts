taskRouter.patch(
    "/:taskId",
    authenticateUser,
    validateRequestParams(taskIdSchema),
    validateRequestBody(updateTaskSchema), 
    taskController.updateTaskHandler.bind(taskController)
)