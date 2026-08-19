import { Router } from "express";
import { SubmissionController } from "../../controllers/submission.controller.js";
import { SubmissionService } from "../../services/submission.service.js";
import { SubmissionRepository } from "../../repositories/submission.repository.js";

export const submissionRouter = Router();

const submissionController = new SubmissionController(new SubmissionService(new SubmissionRepository));

// implement all the routers below