import { authInstanceApi } from "../../../app/api";

export const interview = async ({
  jobDescription,
  selfDescription,
  resumeFile,
}) => {
  try {
    const formData = new FormData();
    formData.append("jobDescription", jobDescription);
    formData.append("selfDescription", selfDescription);
    formData.append("resume", resumeFile);

    const res = await authInstanceApi.post("/api/interview", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return res.data;
  } catch (error) {
    console.log("something went wrong from services api interview", error);
    throw error;
  }
};

export const report = async ({ interViewDataId }) => {
  try {
    const res = await authInstanceApi.get(
      `/api/interview/report/${interViewDataId}`,
    );
    return res.data;
  } catch (error) {
    console.log("something went wrong from service report", error);
    throw error;
  }
};

export const getAllReport = async () => {
  try {
    const res = await authInstanceApi("/api/interview");
    return res.data;
  } catch (error) {
    console.log("something went wrong from services getAllReport", error);
    throw error;
  }
};

// export const generateResumePdf = async (interviewReportId) => {
//   try {
//     const res = await authInstanceApi.post(`/api/interview/resume/pdf/${interviewReportId}`);

//     return res.data;
//   } catch (error) {
//     console.log("something went wrong from services generateResumePdf");
//     throw error;
//   }
// };



export const generateResumePdf = async (interviewReportId) => {
  try {
    const res = await authInstanceApi.post(
      `/api/interview/resume/pdf/${interviewReportId}`,
      {},
      {
        responseType: "blob",
      }
    );

    return res.data;
  } catch (error) {
    console.log(
      "something went wrong from services generateResumePdf",
      error
    );

    throw error;
  }
};