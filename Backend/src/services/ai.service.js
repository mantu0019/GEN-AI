import { GoogleGenAI } from "@google/genai";
import config from "../config/config.js";
import * as z from "zod";

const ai = new GoogleGenAI({
  apiKey: config.GEMINI_API_KEY,
});

const interviewReportQuestion = z.object({
  matchScore: z
    .number()
    .int()
    .min(0)
    .max(100)
    .describe(
      "An integer score from 0 to 100 representing how well the candidate's current profile matches the target job role requirements",
    ),
  title: z
    .string()
    .describe(
      "the title fo the job for which the interview report is generated",
    ),

  technicalQuestion: z.array(
    z.object({
      question: z
        .string()
        .describe("The technical question that can be asked in the interview"),

      intention: z
        .string()
        .describe(
          "The interviewer's intention behind asking the technical question",
        ),

      answerApproach: z
        .string()
        .describe(
          "How the candidate should answer the question, including the approach, important concepts, and key points to cover",
        ),
    }),
  ),

  behavioralQuestion: z.array(
    z.object({
      question: z
        .string()
        .describe("The behavioral question that can be asked in the interview"),

      intention: z
        .string()
        .describe(
          "What the interviewer is trying to evaluate through the behavioral question",
        ),

      answerApproach: z
        .string()
        .describe(
          "How the candidate should structure the answer and what important points to cover",
        ),
    }),
  ),

  skillGap: z.array(
    z.object({
      skill: z
        .string()
        .describe(
          "The skill that is missing, weak, outdated, or insufficiently demonstrated by the candidate",
        ),

      severity: z
        .enum(["low", "medium", "high"])
        .describe("The severity of the skill gap: low, medium, or high"),
    }),
  ),

  preparationPlan: z.array(
    z.object({
      day: z.number().int().describe("The preparation day number"),

      focus: z
        .string()
        .describe(
          "The main topic or objective the candidate should focus on that day",
        ),

      task: z
        .array(z.string())
        .describe(
          "Specific, actionable, and measurable tasks to complete that day",
        ),
    }),
  ),
});

const generateInterviewReport = async ({
  resume,
  selfDescription,
  jobDescription,
}) => {
  try {
    const prompt = `
You are an expert technical interviewer, hiring manager, and career coach.

Analyze the candidate's resume, self-description, and target job description.

CANDIDATE RESUME:
${resume}

CANDIDATE SELF DESCRIPTION:
${selfDescription}

TARGET JOB DESCRIPTION:
${jobDescription}

Generate a realistic and honest interview preparation report.

MATCH SCORE:
Calculate matchScore from 0 to 100 based ONLY on the candidate's
current skills, experience, projects, and the job requirements.

Do not consider future learning when calculating matchScore.

TECHNICAL QUESTIONS:
Generate exactly 8 technical interview questions.

Each question must contain:
- question
- intention
- answerApproach

BEHAVIORAL QUESTIONS:
Generate exactly 5 behavioral interview questions.

Each question must contain:
- question
- intention
- answerApproach

SKILL GAP:
Generate up to 5 meaningful skill gaps.

Each skill gap must contain:
- skill
- severity

severity must be exactly one of:
"low"
"medium"
"high"

PREPARATION PLAN:
Generate exactly 7 days.

Each day must contain:
- day
- focus
- task

task must be an array of strings.

IMPORTANT:

Return ONLY the JSON object.

The root object MUST contain exactly these fields:

matchScore
technicalQuestion
behavioralQuestion
skillGap
preparationPlan

Never omit any field.

Never rename any field.

Never wrap the response inside another object.

For example, DO NOT return:

{
  "report": {
    ...
  }
}

Return the report object directly.

If a category has no meaningful items, return [].

Do not invent candidate experience, skills, projects, or qualifications.
`;

    const interaction = await ai.models.generateContent({
      model: "gemini-3.5-flash-lite",
      // gemini-3.6-flash
      contents: prompt,

      config: {
        responseMimeType: "application/json",
        responseJsonSchema: z.toJSONSchema(interviewReportQuestion),
      },
    });

    const rawText = interaction.text;

    if (!rawText) {
      throw new Error("Empty response received from Gemini API");
    }

    const parsedReport = JSON.parse(rawText);

    console.dir(parsedReport, {
      depth: null,
    });

    const interviewReport = interviewReportQuestion.parse(parsedReport);

    return interviewReport;
  } catch (error) {
    console.error("Interview report generation error:", error);

    throw error;
  }
};

export default generateInterviewReport;
