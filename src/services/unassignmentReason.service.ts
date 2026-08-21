import { UnassignmentReason } from "../../generated/prisma/client.js";
import { IUnassignmentReasonRepository } from "../repositories/unassignmentReason.repository.js";
import { InternalServerError, NotfoundError } from "../utils/errors/app.error.js";

export interface IUnassignmentReasonService {
  findAllUnassignmentReasons(): Promise<UnassignmentReason[]>;
  findUnassignmentReasonById(reasonId: bigint): Promise<UnassignmentReason>; 
}

export class UnassignmentReasonService implements IUnassignmentReasonService {
  private readonly unassignmentReasonRepository: IUnassignmentReasonRepository;

  constructor(unassignmentReasonRepository: IUnassignmentReasonRepository) {
    this.unassignmentReasonRepository = unassignmentReasonRepository;
  }

  async findAllUnassignmentReasons(): Promise<UnassignmentReason[]> {
    try {
      return await this.unassignmentReasonRepository.findAll();
    } catch (error) {
      throw new InternalServerError("Failed to fetch unassignment reasons");
    }
  }
  async findUnassignmentReasonById(reasonId: bigint): Promise<UnassignmentReason> {
    const reason = await this.unassignmentReasonRepository.findById(reasonId);

    if (!reason) {
      throw new NotfoundError(`No unassignment reason found with this given id: ${reasonId}`);
    }

    return reason;
  }
}