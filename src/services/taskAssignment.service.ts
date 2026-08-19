import { ITaskAssignmentRepository } from "../repositories/taskAssignment.repository.js";

export interface ITaskAssignmentService {
    assignTask(): Promise<void>  // populate parameter and return type using dto
    reAssignTask(): Promise<void>  // populate parameter and return type using dto
    unAssignTask(): Promise<void>  // populate parameter and return type using dto

    // rest methods create one by one
}

export class TaskAssignmentService implements ITaskAssignmentService {
    private readonly taskassignmentRepository: ITaskAssignmentRepository;

    constructor(taskassignmentRepository: ITaskAssignmentRepository) {
        this.taskassignmentRepository = taskassignmentRepository;
    }

    async assignTask(): Promise<void> {
        // implement properly
    }

    async reAssignTask(): Promise<void> {
        // implement properly
    }

    async unAssignTask(): Promise<void> {
        // implement properly
    }
}