import { BadRequestError } from "../errors/app.error.js";
import { RoleName } from "../../types/role.type.js";

export function validateStatusTransition(
  currentStatus: string,
  nextStatus: string,
  role: string
): void {

  if (role === RoleName.DEVELOPER) {
    if (
      nextStatus !== "IN_PROGRESS" ||
      (
        currentStatus !== "TODO" &&
        currentStatus !== "CHANGES_REQUESTED" &&
        currentStatus !== "REOPENED"
      )
    ) {
      throw new BadRequestError(
        `Task cannot be moved from ${currentStatus} to ${nextStatus}`
      );
    }
  }

  if (role === RoleName.ADMIN) {
    if (
      currentStatus !== "IN_REVIEW" ||
      (
        nextStatus !== "COMPLETED" &&
        nextStatus !== "CHANGES_REQUESTED"
      )
    ) {
      throw new BadRequestError(
        `Task cannot be moved from ${currentStatus} to ${nextStatus}`
      );
    }
  }
}