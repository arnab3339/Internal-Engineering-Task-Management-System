import { Request, Response, NextFunction } from "express";
import { IUnassignmentReasonService } from "../services/unassignmentReason.service.js";
import { sendSuccess } from "../utils/helpers/response.helper.js";

export class UnassignmentReasonController {
  private readonly unassignmentReasonService: IUnassignmentReasonService;

  constructor(unassignmentReasonService: IUnassignmentReasonService) {
    this.unassignmentReasonService = unassignmentReasonService;
  }

  async getAllUnassignmentReasonsHandler(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const reasons = await this.unassignmentReasonService.findAllUnassignmentReasons();

      sendSuccess(res, reasons, 200, "Unassignment reasons fetched successfully");
    } catch (error) {
      next(error);
    }
  }
   async getUnassignmentReasonByIdHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const reasonId = BigInt(req.params.reasonId as string);

      const reason = await this.unassignmentReasonService.findUnassignmentReasonById(reasonId);

      sendSuccess(res, reason, 200, "Unassignment reason fetched successfully");
    } catch (error) {
      next(error);
    }
  }
}