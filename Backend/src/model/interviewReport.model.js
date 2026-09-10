import mongoose from "mongoose";

const technicalQuestionSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: [true, "technical question required"],
    },

    intention: {
      type: String,
      required: [true, "intention is required"],
    },

    answerApproach: {
      type: String,
      required: [true, "answer approach is required"],
    },
  },
  { _id: false }
);

const behavioralQuestionSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: [true, "behavioral question required"],
    },

    intention: {
      type: String,
      required: [true, "intention is required"],
    },

    answerApproach: {
      type: String,
      required: [true, "answer approach is required"],
    },
  },
  { _id: false }
);

const skillGapSchema = new mongoose.Schema(
  {
    skill: {
      type: String,
      required: [true, "skill gap is required"],
    },

    severity: {
      type: String,
      enum: ["low", "medium", "high"],
      required: [true, "severity is required"],
    },
  },
  { _id: false }
);

const preparationPlanSchema = new mongoose.Schema(
  {
    day: {
      type: Number,
      required: [true, "day is required"],
    },

    focus: {
      type: String,
      required: [true, "focus is required"],
    },

    task: {
      type: [String],
      required: [true, "task is required"],
    },
  },
  { _id: false }
);

const interviewReportSchema = new mongoose.Schema(
  {
    jobDescription: {
      type: String,
      required: [true, "job description required"],
    },

    resume: {
      type: String,
    },

    selfDescription: {
      type: String,
    },

    matchScore: {
      type: Number,
      min: 0,
      max: 100,
    },

    technicalQuestion: [technicalQuestionSchema],

    behavioralQuestion: [behavioralQuestionSchema],

    skillGap: [skillGapSchema],

    preparationPlan: [preparationPlanSchema],

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    title:{
      type:String,
      required:[true,"job title is required"]

    }
  }
);

const interviewReportModel = mongoose.model(
  "interViewReportModel",
  interviewReportSchema
);

export default interviewReportModel;