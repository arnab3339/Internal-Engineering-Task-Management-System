import { Router } from "express";

import { UnassignmentReasonController } from "../../controllers/unassignmentReason.controller.js";
import { UnassignmentReasonService } from "../../services/unassignmentReason.service.js";
import { UnassignmentReasonRepository } from "../../repositories/unassignmentReason.repository.js";
import { authenticateUser } from "../../middlewares/authentication.middleware.js";
import { authorizeUser } from "../../middlewares/authorization.middleware.js";
import { validateRequestParams } from "../../middlewares/validate.middleware.js";
import { reasonIdParamSchema } from "../../dtos/unassignmentReason.dto.js";
import { RoleName } from "../../types/role.type.js";

const unassignmentReasonController = new UnassignmentReasonController(
  new UnassignmentReasonService(new UnassignmentReasonRepository())
);

const unassignmentReasonRouter = Router();

unassignmentReasonRouter.get(
  "/",
  authenticateUser,
  authorizeUser(RoleName.ADMIN),
  unassignmentReasonController.getAllUnassignmentReasonsHandler.bind(unassignmentReasonController)
);

unassignmentReasonRouter.get(
  "/:reasonId",
  authenticateUser,
  authorizeUser(RoleName.ADMIN),
  validateRequestParams(reasonIdParamSchema),
  unassignmentReasonController.getUnassignmentReasonByIdHandler.bind(unassignmentReasonController)
);

export default unassignmentReasonRouter;