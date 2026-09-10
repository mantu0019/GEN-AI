import { Router } from "express";
import authMiddleware from "../middleware/user.middleware.js";
import upload from "../middleware/file.middleware.js";
import { generateInterviewReportController, getAllInterview, getInterviewReportController } from "../controller/interview.controller.js";

const interviewRouter = Router();



 interviewRouter.post("/", authMiddleware,upload.single("resume"),generateInterviewReportController)
 interviewRouter.get("/report/:interViewDataId",authMiddleware,getInterviewReportController)
 interviewRouter.get("/",authMiddleware,getAllInterview)



 

export default interviewRouter;