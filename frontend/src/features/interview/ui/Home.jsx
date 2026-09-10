import { useEffect, useRef, useState } from "react";
import { useAuth } from "../../auth/hook/useAuth";
import { useInterview } from "../hooks/useInterview";
import Loading from "../../../components/Loading";
import { useNavigate } from "react-router";
const MAX_FILE_SIZE = 3 * 1024 * 1024; // 3MB

const Home = () => {
  const { authData } = useAuth();
  const navigate = useNavigate();
  const [reports, setReports] = useState([]);
  const {
    interviewByUser,
    isLoading,
    error: reduxError,
    getAllReportByUser,
  } = useInterview();

 

  useEffect(() => {
    const reports = async () => {
      const res = await getAllReportByUser();
      setReports(res.payload.interviewReport);
    };
    reports();
  }, [getAllReportByUser]);
   

  const fileInputRef = useRef(null);

  const [jobDescription, setJobDescription] = useState("");
  const [selfDescription, setSelfDescription] = useState("");
  const [resume, setResume] = useState(null);
  const [error, setError] = useState("");
  const [isDragging, setIsDragging] = useState(false);

  const handleGenerate = async () => {
    setError("");

    if (!jobDescription.trim()) {
      setError("Please enter the target job description.");
      return;
    }

    if (!resume && !selfDescription.trim()) {
      setError("Upload your resume or provide a self-description.");
      return;
    }

    try {
      const result = await interviewByUser({
        jobDescription,
        selfDescription,
        resumeFile: resume,
      });

      if (!result?.interViewDataId) {
        setError("Something went wrong. Please try again.");
        return;
      }

      navigate(`/dashboard/interview/${result.interViewDataId}`);
    } catch (error) {
      console.log("Interview generation failed:", error);
      setError(error?.message || "Something went wrong. Please try again.");
    }
  };

  // -------------------------
  // File validation
  // -------------------------
  if (isLoading) {
    return <Loading />;
  }

  const validateFile = (file) => {
    setError("");

    if (!file) return;

    // PDF check
    if (
      file.type !== "application/pdf" &&
      !file.name.toLowerCase().endsWith(".pdf")
    ) {
      al("Only PDF files are allowed.");
      return;
    }

    // 3MB check
    if (file.size > MAX_FILE_SIZE) {
      setError("Resume size must be less than 3MB.");
      return;
    }

    setResume(file);
  };

  // -------------------------
  // Input change
  // -------------------------

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    validateFile(file);
  };

  // -------------------------
  // Drag events
  // -------------------------

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files?.[0];

    validateFile(file);
  };

  // -------------------------
  // Remove resume
  // -------------------------

  const removeResume = () => {
    setResume(null);
    setError("");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // -------------------------
  // Format file size
  // -------------------------

  const formatFileSize = (bytes) => {
    if (bytes < 1024) {
      return `${bytes} B`;
    }

    if (bytes < 1024 * 1024) {
      return `${(bytes / 1024).toFixed(1)} KB`;
    }

    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  return (
    <main className="min-h-screen bg-[#080808] text-white">
      {/* Background */}
      <div className="fixed inset-0 -z-0 overflow-hidden pointer-events-none">
        <div className="absolute left-[-250px] top-[-250px] h-[500px] w-[500px] rounded-full bg-orange-600/10 blur-[150px]" />

        <div className="absolute right-[-250px] top-[20%] h-[500px] w-[500px] rounded-full bg-red-600/10 blur-[160px]" />

        <div className="absolute bottom-[-300px] left-[35%] h-[500px] w-[500px] rounded-full bg-orange-500/5 blur-[150px]" />
      </div>
      <button
        onClick={() => navigate("/dashboard/profile")}
        className="
    group fixed right-6 top-6 z-50
    flex items-center gap-2
    rounded-xl
    border border-orange-500/20
    bg-[#111111]/80
    px-4 py-2.5
    text-sm font-medium text-zinc-300
    shadow-lg shadow-black/30
    backdrop-blur-xl
    transition-all duration-300
    hover:border-orange-500/50
    hover:bg-orange-500/10
    hover:text-orange-400
    hover:shadow-orange-500/10
    active:scale-95
  "
      >
        <span
          className="
      flex h-8 w-8 items-center justify-center
      rounded-lg
      bg-gradient-to-br from-orange-500/20 to-red-500/20
      text-orange-400
      transition-transform duration-300
      group-hover:scale-110
    "
        >
          👤
        </span>

        <span>My Profile</span>

        <span className="text-zinc-600 transition-all duration-300 group-hover:translate-x-1 group-hover:text-orange-400">
          →
        </span>
      </button>
      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 py-12 sm:px-8">
        {/* Heading */}
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-bold tracking-tight sm:text-5xl">
            Create Your Custom{" "}
            <span className="bg-gradient-to-r from-orange-400 via-red-400 to-orange-500 bg-clip-text text-transparent">
              Interview Plan
            </span>
          </h1>

          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-zinc-400 sm:text-base">
            Let our AI analyze the job requirements and your unique profile to
            build a winning interview strategy.
          </p>
        </div>

        {/* Main Card */}
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#111111]/90 shadow-2xl shadow-black/40 backdrop-blur-xl">
          {/* Form */}
          <div className="grid lg:grid-cols-2">
            {/* ================================= */}
            {/* JOB DESCRIPTION */}
            {/* ================================= */}

            <section className="border-b border-white/10 p-5 sm:p-7 lg:border-b-0 lg:border-r">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-orange-500/15 text-orange-400">
                    💼
                  </span>

                  <h2 className="font-semibold text-orange-300">
                    Target Job Description
                  </h2>
                </div>

                <span className="rounded-md border border-white/10 bg-white/5 px-2 py-1 text-[10px] text-zinc-500">
                  REQUIRED
                </span>
              </div>

              <div className="relative">
                <textarea
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  maxLength={5000}
                  placeholder={`Paste the full job description here...

e.g. "Senior Frontend Engineer at Google requires proficiency in React, TypeScript, and large-scale system design..."`}
                  className="
                    h-[390px]
                    w-full
                    resize-none
                    rounded-xl
                    border
                    border-white/10
                    bg-[#191919]
                    p-5
                    text-sm
                    leading-6
                    text-zinc-200
                    outline-none
                    placeholder:text-zinc-600
                    transition
                    focus:border-orange-500/50
                    focus:ring-1
                    focus:ring-orange-500/20
                  "
                />

                <span className="absolute bottom-3 right-4 text-[10px] text-zinc-600">
                  {jobDescription.length}/5000 chars
                </span>
              </div>
            </section>

            {/* ================================= */}
            {/* PROFILE */}
            {/* ================================= */}

            <section className="p-5 sm:p-7">
              <div className="mb-5 flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-orange-500/15 text-orange-400">
                  👤
                </span>

                <h2 className="font-semibold text-orange-300">
                  {authData.userDetail.username}
                </h2>
              </div>

              {/* Upload heading */}

              <div className="mb-3 flex items-center gap-2">
                <p className="text-xs font-medium text-zinc-300">
                  Upload Resume
                </p>

                <span className="text-[10px] font-semibold text-red-400">
                  RECOMMENDED
                </span>
              </div>

              {/* ================================= */}
              {/* DROP ZONE */}
              {/* ================================= */}

              {!resume ? (
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`
                    group
                    flex
                    min-h-[170px]
                    cursor-pointer
                    flex-col
                    items-center
                    justify-center
                    rounded-xl
                    border
                    border-dashed
                    px-5
                    text-center
                    transition-all
                    duration-300
                    ${
                      isDragging
                        ? "border-orange-400 bg-orange-500/10 scale-[1.01]"
                        : "border-zinc-600 bg-[#191919] hover:border-orange-500/60 hover:bg-[#1d1d1d]"
                    }
                  `}
                >
                  {/* Upload icon */}

                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-orange-500/10 text-xl transition group-hover:scale-110 group-hover:bg-orange-500/20">
                    ⬆
                  </div>

                  <p className="text-sm font-semibold text-zinc-200">
                    {isDragging
                      ? "Drop your resume here"
                      : "Click to upload or drag & drop"}
                  </p>

                  <p className="mt-2 text-xs text-zinc-500">
                    PDF only • Maximum 3MB
                  </p>

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="application/pdf,.pdf"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </div>
              ) : (
                /* ================================= */
                /* SELECTED FILE */
                /* ================================= */

                <div className="flex items-center gap-4 rounded-xl border border-orange-500/20 bg-orange-500/5 p-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-red-500/10 text-xl">
                    📄
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-zinc-200">
                      {resume.name}
                    </p>

                    <p className="mt-1 text-xs text-zinc-500">
                      {formatFileSize(resume.size)}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={removeResume}
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-zinc-500 transition hover:bg-red-500/10 hover:text-red-400"
                  >
                    ✕
                  </button>
                </div>
              )}

              {/* ================================= */}
              {/* OR */}
              {/* ================================= */}

              <div className="my-6 flex items-center gap-4">
                <div className="h-px flex-1 bg-white/10" />

                <span className="text-[10px] font-medium uppercase text-zinc-600">
                  OR
                </span>

                <div className="h-px flex-1 bg-white/10" />
              </div>

              {/* ================================= */}
              {/* SELF DESCRIPTION */}
              {/* ================================= */}

              <label className="mb-3 block text-xs font-medium text-zinc-300">
                Quick Self-Description
              </label>

              <textarea
                value={selfDescription}
                onChange={(e) => setSelfDescription(e.target.value)}
                placeholder="Briefly describe your experience, key skills, and years of experience if you don't have a resume handy..."
                className="
                  h-[145px]
                  w-full
                  resize-none
                  rounded-xl
                  border
                  border-white/10
                  bg-[#191919]
                  p-4
                  text-sm
                  leading-6
                  text-zinc-200
                  outline-none
                  placeholder:text-zinc-600
                  transition
                  focus:border-orange-500/50
                  focus:ring-1
                  focus:ring-orange-500/20
                "
              />

              {/* Info */}

              <div className="mt-5 rounded-lg border border-white/10 bg-white/[0.02] px-4 py-3">
                <p className="text-xs leading-5 text-zinc-500">
                  💡 Either a Resume or a Self-Description is required to
                  generate a personalized plan.
                </p>
              </div>
            </section>
          </div>

          {/* ================================= */}
          {/* ERROR */}
          {/* ================================= */}

          {error && (
            <div className="border-t border-red-500/10 bg-red-500/5 px-6 py-3">
              <p className="text-xs text-red-400">⚠ {error}</p>
            </div>
          )}

          {/* ================================= */}
          {/* FOOTER */}
          {/* ================================= */}

          <div className="flex flex-col gap-5 border-t border-white/10 bg-[#0e0e0e] p-5 sm:flex-row sm:items-center sm:justify-between sm:px-7">
            <div>
              <p className="text-xs font-medium text-orange-300">
                ✦ AI-Powered Strategy Generation
              </p>

              <p className="mt-1 text-[11px] text-zinc-600">
                Usually takes around 30 seconds
              </p>
            </div>

            <button
              onClick={handleGenerate}
              className="
                group
                flex
                items-center
                justify-center
                gap-2
                rounded-xl
                bg-gradient-to-r
                from-orange-500
                to-red-500
                px-7
                py-3.5
                text-sm
                font-semibold
                text-white
                shadow-lg
                shadow-orange-500/20
                transition-all
                duration-300
                hover:-translate-y-0.5
                hover:shadow-orange-500/30
                active:translate-y-0
              "
            >
              ✦ Generate My Interview Strategy
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </button>
          </div>
        </div>

        {/* Bottom links */}

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {reports.map((elem) => {
            return (
              <div
                key={elem._id}
                onClick={() => navigate(`/dashboard/interview/${elem._id}`)}
                className="
          group cursor-pointer
          rounded-2xl
          border border-white/10
          bg-[#151515]
          p-5
          transition-all duration-300
          hover:-translate-y-1
          hover:border-orange-500/40
          hover:bg-[#1b1b1b]
          hover:shadow-xl
          hover:shadow-orange-500/10
          active:scale-[0.98]
        "
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-zinc-500">Interview Report</p>

                    <h3 className="mt-1 text-lg font-semibold text-white">
                      AI Interview Analysis
                    </h3>
                  </div>

                  <div
                    className="
              flex h-12 w-12 items-center justify-center
              rounded-full
              border border-orange-500/30
              bg-orange-500/10
              text-lg font-bold text-orange-400
            "
                  >
                    {elem.matchScore}%
                  </div>
                </div>

                <div className="mt-5 flex items-center justify-between">
                  <span className="text-xs text-zinc-500">Match Score</span>

                  <span className="text-xs font-medium text-orange-400 transition group-hover:translate-x-1">
                    View Report →
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-6 flex justify-center gap-6 text-[11px] text-zinc-600">
          <button className="transition hover:text-zinc-300">
            Privacy Policy
          </button>

          <button className="transition hover:text-zinc-300">
            Terms of Service
          </button>

          <button className="transition hover:text-zinc-300">
            Help Center
          </button>
        </div>
      </div>
    </main>
  );
};

export default Home;
