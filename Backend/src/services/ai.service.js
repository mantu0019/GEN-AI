import { GoogleGenAI } from "@google/genai";
import config from "../config/config.js";
import * as z from "zod";
import puppeteer from "puppeteer";


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

 

// }

const generatePdfFromHtml = async (html) => {
  const browser = await puppeteer.launch({
    headless: true,
  });

  try {
    const page = await browser.newPage();

    await page.setContent(html, {
      waitUntil: "networkidle0",
    });

    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: {
        top: "20px",
        right: "20px",
        bottom: "20px",
        left: "20px",
      },
    });

    return pdfBuffer;
  } finally {
    await browser.close();
  }
};


 

export const generateResumePdf = async ({
  resume,
  selfDescription,
  jobDescription,
}) => {
  const resumePdfSchema = z.object({
    html: z
      .string()
      .describe(
        "The complete HTML content of the resume which can be converted to PDF using Puppeteer"
      ),
  });

const prompt = `
You are an expert professional resume writer and senior recruiter.

Your task is to create a realistic, human-written, ATS-friendly resume in HTML based ONLY on the candidate information provided below.

========================
CANDIDATE INFORMATION
========================

CANDIDATE RESUME:
${resume}

CANDIDATE SELF DESCRIPTION:
${selfDescription}

TARGET JOB DESCRIPTION:
${jobDescription}

========================
CORE OBJECTIVE
========================

Create a resume that looks like it was carefully created by an experienced human professional.

The resume must NOT look AI-generated, overly designed, flashy, or like a modern website.

It should look like a real professional resume that a candidate would submit to a company.

Prioritize:
1. ATS compatibility
2. Readability
3. Clean typography
4. Professional hierarchy
5. Realistic human-written language
6. Relevant content
7. Accurate information

========================
CONTENT RULES
========================

- NEVER invent information.
- NEVER create fake companies, projects, certifications, degrees, achievements, dates, technologies, job titles, or work experience.
- Use ONLY information available in the candidate data.
- Do not exaggerate the candidate's experience.
- Do not add technologies that are not mentioned or clearly supported by the candidate's information.
- Do not add fake metrics such as "increased performance by 40%" unless the candidate actually provided that information.
- Do not add generic AI-generated claims such as "passionate developer", "results-driven professional", "highly motivated individual", etc. unless they naturally fit the candidate's provided information.
- Keep the candidate's actual identity and information unchanged.

========================
HUMAN-WRITTEN STYLE
========================

The resume must sound natural and human-written.

Avoid repetitive AI-style phrases such as:
- "passionate about"
- "results-driven"
- "dynamic professional"
- "proven track record"
- "leveraged cutting-edge technologies"
- "spearheaded"
- "highly motivated"
- "detail-oriented"
- "innovative solutions"
- "demonstrated expertise"

Do not use unnecessarily sophisticated vocabulary.

Use concise, direct, professional language.

Write bullet points like a real developer or professional would write them.

Prefer:
"Built a REST API using Node.js and Express."

Instead of:
"Leveraged cutting-edge backend technologies to architect and spearhead innovative scalable solutions."

========================
ATS REQUIREMENTS
========================

The resume must be highly ATS-friendly.

Use a simple single-column layout.

DO NOT use:
- tables for layout
- CSS grid
- CSS flexbox for major layout
- multiple columns
- sidebars
- icons
- emojis
- profile pictures
- charts
- skill bars
- progress bars
- graphical elements
- decorative shapes
- excessive borders
- text inside images
- SVG graphics
- complex visual components
- headers/footers containing important information

Use standard resume section headings such as:

SUMMARY
SKILLS
EXPERIENCE
PROJECTS
EDUCATION
CERTIFICATIONS

Only include sections that are relevant to the candidate.

Use standard text that ATS systems can easily parse.

========================
VISUAL DESIGN
========================

The resume must look like a traditional premium professional resume.

It should resemble a resume created manually in Microsoft Word or Google Docs.

DO NOT make it look like:
- a website
- a portfolio
- a dashboard
- a landing page
- an AI template
- a graphic design resume

COLOR RULE:

Use PURE BLACK for all text.

Primary text:
#000000

Headings:
#000000

Borders:
#000000

Do NOT use:
- blue
- purple
- green
- red
- orange
- gradients
- colored headings
- colored icons
- background colors

The page background must be white:
#FFFFFF

Use black text on white background.

========================
TYPOGRAPHY
========================

Use a professional ATS-safe font such as:

Arial, Helvetica, sans-serif

or

Times New Roman, Times, serif

Use a clean hierarchy:

Candidate name:
20-24px, bold

Section headings:
11-13px, bold, uppercase

Body:
9.5-11px

Do not use excessively large text.

Avoid decorative fonts.

========================
LAYOUT
========================

Use an A4-friendly single-column layout.

Recommended structure:

Candidate Name
Professional Title

Phone | Email | Location | LinkedIn | GitHub | Portfolio

SUMMARY

Short professional summary.

SKILLS

Technical skills grouped naturally.

EXPERIENCE

Company
Job Title | Location | Dates

• Achievement/responsibility
• Achievement/responsibility

PROJECTS

Project Name | Technologies

• Description
• Technical implementation
• Relevant result or functionality

EDUCATION

Degree
Institution | Location | Date

CERTIFICATIONS

Only if provided.

Do not force sections that have no meaningful information.

========================
CONTACT INFORMATION
========================

Keep contact information simple and text-based.

Do not use icons.

Example:

John Doe
Full Stack Developer
Patna, Bihar | +91 XXXXX XXXXX | john@email.com
LinkedIn: linkedin.com/in/johndoe | GitHub: github.com/johndoe

Do not invent missing contact information.

========================
JOB CUSTOMIZATION
========================

Analyze the TARGET JOB DESCRIPTION.

Prioritize skills, technologies, responsibilities, and keywords that genuinely match the candidate's existing experience.

Naturally include relevant keywords from the job description when supported by the candidate's actual experience.

DO NOT keyword-stuff.

DO NOT add a technology merely because it appears in the job description.

The resume should be tailored to the target job while remaining truthful.

========================
DEVELOPER RESUME RULES
========================

If the candidate is a software/web developer:

Prioritize relevant technical information such as:

- Programming languages
- Frameworks
- Libraries
- Databases
- APIs
- Tools
- Cloud technologies
- Development methodologies
- Relevant projects
- Git/GitHub
- Deployment
- Testing

Group skills clearly.

Example:

Languages: JavaScript, Python
Frontend: React, HTML, CSS, Tailwind CSS
Backend: Node.js, Express.js
Database: MongoDB, MySQL
Tools: Git, GitHub, Postman

Only include technologies actually supported by the candidate information.

========================
BULLET POINT RULES
========================

Use concise bullet points.

Each bullet should ideally:
- start with a strong action verb
- explain what was built/done
- mention relevant technology when useful
- describe the result when the information exists

Avoid long paragraphs.

Avoid repeating the same action verb excessively.

Do not create fake numerical achievements.

========================
LENGTH
========================

Target 1-2 pages depending on the amount of candidate information.

Do not unnecessarily stretch a short resume.

Do not remove important information simply to make it shorter.

Do not add filler content.

========================
HTML REQUIREMENTS
========================

Return a complete HTML document.

Use:

<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Resume</title>

<style>
...
</style>

</head>

<body>
...
</body>
</html>

All CSS must be inside the <style> tag.

Do not use external CSS.

Do not use JavaScript.

Do not use external images.

Do not use external fonts.

Make the HTML suitable for conversion to PDF using Puppeteer.

Use print-friendly CSS.

Include:

@page {
  size: A4;
  margin: 12mm 14mm;
}

body {
  background: #FFFFFF;
  color: #000000;
}

Ensure the resume fits naturally on A4 pages.

Avoid elements that can cause unexpected PDF rendering.

========================
QUALITY CONTROL
========================

Before returning the result, internally verify:

1. Is every piece of candidate information truthful?
2. Did you invent anything?
3. Is the resume ATS-friendly?
4. Is the layout single-column?
5. Is all text pure black?
6. Is the background pure white?
7. Are there any colors or gradients?
8. Are there any icons or emojis?
9. Does it look like a traditional human-created resume?
10. Does it avoid obvious AI-generated language?
11. Is the job description reflected naturally?
12. Is the HTML valid?
13. Is the resume suitable for Puppeteer PDF generation?
14. Are important keywords represented when supported by the candidate?
15. Is there unnecessary filler?

Fix any issue before returning the response.

========================
FINAL RESPONSE FORMAT
========================

Return ONLY valid JSON.

The JSON object MUST contain exactly one property:

{
  "html": "COMPLETE HTML DOCUMENT HERE"
}

Do NOT return Markdown.

Do NOT use a code block.

Do NOT add explanations before or after the JSON.

Do NOT add any additional JSON properties.
`;

  const response = await ai.models.generateContent({
    model: "gemini-3.5-flash-lite",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseJsonSchema: z.toJSONSchema(resumePdfSchema),
    },
  });

  const rawText = response.text;

  if (!rawText) {
    throw new Error("Empty response received from Gemini API");
  }

  // Gemini ka JSON string → JavaScript object
  const parsedResponse = JSON.parse(rawText);

  // Zod se validate
  const validatedResponse = resumePdfSchema.parse(parsedResponse);

  // HTML → PDF
  const pdfBuffer = await generatePdfFromHtml(validatedResponse.html);

  return pdfBuffer;
};




export default generateInterviewReport;
