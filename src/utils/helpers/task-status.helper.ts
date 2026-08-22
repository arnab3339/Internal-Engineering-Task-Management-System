import { BadRequestError } from "../errors/app.error.js";
import { RoleName } from "../../types/role.type.js";
import { TaskStatus } from "../../../generated/prisma/client.js";


export function validateStatusTransition( currentStatus: TaskStatus,nextStatus: TaskStatus,role: RoleName): void {

  if (role === RoleName.DEVELOPER) {
    validateDeveloperTransition(currentStatus, nextStatus);
    return;
  }

  if (role === RoleName.ADMIN) {
    validateAdminTransition(currentStatus, nextStatus);
  }
}

  function validateDeveloperTransition(currentStatus: TaskStatus,nextStatus: TaskStatus): void {

  if (
    nextStatus !== TaskStatus.IN_PROGRESS ||
    (
      currentStatus !== TaskStatus.TODO &&
      currentStatus !== TaskStatus.CHANGES_REQUESTED
    )
  ) {
    throw new BadRequestError(
      `Task cannot be moved from ${currentStatus} to ${nextStatus}`
    );
  }
}

function validateAdminTransition(currentStatus: TaskStatus,nextStatus: TaskStatus): void {

  if (
    currentStatus !== TaskStatus.IN_REVIEW ||
    (
      nextStatus !== TaskStatus.COMPLETED &&
      nextStatus !== TaskStatus.CHANGES_REQUESTED
    )
  ) {
    throw new BadRequestError(
      `Task cannot be moved from ${currentStatus} to ${nextStatus}`
    );
  }
}