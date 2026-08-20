import { BadRequestError } from "../errors/app.error.js";

export function validateStatusTransition(currentStatus: string,nextStatus: string): void {

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

export function validateAdminStatusTransition(currentStatus: string,nextStatus: string): void {
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