import { PDFParse } from "pdf-parse";
import generateInterviewReport, { generateResumePdf } from "../services/ai.service.js";
import interviewReportModel from "../model/interviewReport.model.js";
import { success } from "zod";
import { fa } from "zod/v4/locales";
 
export const generateInterviewReportController = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Resume PDF is required",
      });
    }

    const pdfResult = await new PDFParse(
      new Uint8Array(req.file.buffer),
    ).getText();

    const resumeContent = pdfResult.text;
    console.log(typeof resumeContent);
    console.log(resumeContent);

    const { jobDescription, selfDescription } = req.body;

    if (!jobDescription || !selfDescription) {
      return res.status(401).json({
        success: false,
        message: "All field are required",
      });
    }

    const interviewReportByAi = await generateInterviewReport({
      resume: resumeContent,
      jobDescription,
      selfDescription,
    });

    const newInterViewReport = await interviewReportModel.create({
      user: req.user.id,
      resume: resumeContent,
      selfDescription,
      jobDescription,
      ...interviewReportByAi,
    });

    res.status(201).json({
      success: true,
      message: "resume Created successfully",
      interViewDataId: newInterViewReport._id,

      newInterViewReport,
    });
  } catch (error) {
    console.log(
      "something went wrong from  generateInterviewReportController",
      error,
    );

    res.status(500).json({
      success: false,
      message: "something went wrong from  generateInterviewReportController",
    });
  }
};

export const getInterviewReportController = async (req, res) => {
  try {
    const { interViewDataId } = req.params;
    console.log("interviewid", interViewDataId);
    if (!interViewDataId) {
      return res.status(400).json({
        success: false,
        message: "Interview Data is required",
      });
    }

    const interViewData = await interviewReportModel.findById(interViewDataId);

    if (!interViewData) {
      return res.status(401).json({
        success: false,
        message: "Data Not Found",
      });
    }
    res.status(200).json({
      success: true,
      message: "fetched all interview data",
      interViewData,
    });
  } catch (error) {
    console.log(
      "something went wrong from  getInterviewReportController ",
      error,
    );
    res.status(500).json({
      success: false,
      message: "something went wrong from  getInterviewReportController",
    });
  }
};

export const getAllInterview = async (req, res) => {
  try {
    const interviewReport = await interviewReportModel
      .find({ user: req.user.id })
      .sort({ createdAt: -1 })
      .select(
        "-resume -jobDescription -selfDescription -__v  -technicalQuestion -behavioralQuestion -skillGap -preparationPlan",
      );

    if (!interviewReport) {
      return res.status(401).json({
        success: false,
        message: "Interview Report not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Data fetched successfully",
      interviewReport,
    });
  } catch (error) {
    console.log("something went wrong from getAllInterview ", error);
    res.status(500).json({
      success: false,
      message: "something went wrong from getAllInterview controller",
    });
  }
};
 

export const generateResumePdfController = async(req,res)=>{
  try {
    
  const {interviewReportId} = req.params;

   const  interviewReport = await interviewReportModel.findById(interviewReportId);
   if(!interviewReport){
    return res.status(404).json({
      success:false,
      message:"Interview Report Not Available "
    })
   }

 const {resume,jobDescription,selfDescription} =    interviewReport

 const pdfBuffer =   await generateResumePdf({resume,jobDescription,selfDescription})
  
 res.set({
  "Content-Type":"application/pdf",
  "Content-Disposition":`attachment; filename=resume_${interviewReportId}.pdf`
 })

res.send(pdfBuffer)









  } catch (error) {
    console.log("something went wrong from  generateResumePdfController",error);
  
    res.status(500)
    .json({
      success:false,
      message:"something went wrong from  generateResumePdfController"
    })
  }
}



