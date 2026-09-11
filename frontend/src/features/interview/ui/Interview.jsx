import { useEffect, useMemo, useState } from "react";
import { useInterview } from "../hooks/useInterview";
import { useParams } from "react-router";

const Interview = () => {
  const { interviewId } = useParams();
const [isGeneratingResume, setIsGeneratingResume] = useState(false);
  const { interviewData, reportByUser, generatedResumePdfByUser } =
    useInterview();

  useEffect(() => {
    const fetchInterview = async () => {
      if (interviewId) {
        await reportByUser({ interViewDataId: interviewId });
      }
    };
    fetchInterview();
  }, [interviewId]);

  const data =
    interviewData?.newInterViewReport ||
    interviewData?.interViewData ||
    interviewData;

  // console.log("🔥 INTERVIEW PAGE DATA:", data);

  const [activeSection, setActiveSection] = useState("technical");
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [activeDay, setActiveDay] = useState(0);
  const [search, setSearch] = useState("");
  const [showApproach, setShowApproach] = useState(false);

  const [notes, setNotes] = useState({});

  const [reviewed, setReviewed] = useState({
    technical: new Set(),
    behavioral: new Set(),
  });

  const [completedTasks, setCompletedTasks] = useState({});

  // --------------------------------
  // AI DATA
  // --------------------------------

  const technicalQuestions = data?.technicalQuestion || [];
  const behavioralQuestions = data?.behavioralQuestion || [];
  const skillGaps = data?.skillGap || [];
  const preparationPlan = data?.preparationPlan || [];

  const questions =
    activeSection === "technical" ? technicalQuestions : behavioralQuestions;

  // --------------------------------
  // SEARCH
  // --------------------------------

  const filteredQuestions = useMemo(() => {
    if (!search.trim()) {
      return questions.map((q, i) => ({
        ...q,
        _index: i,
      }));
    }

    const term = search.toLowerCase();

    return questions
      .map((q, i) => ({
        ...q,
        _index: i,
      }))
      .filter((q) => q.question?.toLowerCase().includes(term));
  }, [questions, search]);

  const currentQuestion = questions[activeQuestion];

  const noteKey = `${activeSection}-${activeQuestion}`;

  // --------------------------------
  // RESET APPROACH
  // --------------------------------

  useEffect(() => {
    setShowApproach(false);
  }, [activeQuestion, activeSection]);

  // --------------------------------
  // RESET QUESTION WHEN SECTION CHANGES
  // --------------------------------

  useEffect(() => {
    setActiveQuestion(0);
  }, [activeSection]);

  // --------------------------------
  // KEYBOARD
  // --------------------------------

  useEffect(() => {
    if (activeSection === "roadmap") return;

    const onKeyDown = (e) => {
      if (e.target.tagName === "TEXTAREA" || e.target.tagName === "INPUT") {
        return;
      }

      if (e.key === "ArrowRight" && activeQuestion < questions.length - 1) {
        setActiveQuestion((prev) => prev + 1);
      }

      if (e.key === "ArrowLeft" && activeQuestion > 0) {
        setActiveQuestion((prev) => prev - 1);
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [activeSection, activeQuestion, questions.length]);

  // --------------------------------
  // SECTION
  // --------------------------------

  const handleSectionChange = (section) => {
    setActiveSection(section);
    setActiveQuestion(0);
    setSearch("");
  };

  // --------------------------------
  // REVIEW
  // --------------------------------

  const toggleReviewed = (index) => {
    setReviewed((prev) => {
      const next = new Set(prev[activeSection]);

      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }

      return {
        ...prev,
        [activeSection]: next,
      };
    });
  };

  // --------------------------------
  // TASK
  // --------------------------------

  const toggleTask = (dayIndex, taskIndex) => {
    const key = `${dayIndex}-${taskIndex}`;

    setCompletedTasks((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  // --------------------------------
  // DAY COMPLETION
  // --------------------------------

  const dayCompletion = (day, dayIndex) => {
    const tasks = day.task || [];

    if (!tasks.length) return 0;

    const done = tasks.filter(
      (_, taskIndex) => completedTasks[`${dayIndex}-${taskIndex}`],
    ).length;

    return Math.round((done / tasks.length) * 100);
  };

  // --------------------------------
  // SECTION PROGRESS
  // --------------------------------

  const sectionProgress = (section) => {
    const total =
      section === "technical"
        ? technicalQuestions.length
        : behavioralQuestions.length;

    const done = reviewed[section]?.size || 0;

    return {
      done,
      total,
    };
  };

  // --------------------------------
  // OVERALL PROGRESS
  // --------------------------------

  const overallProgress = useMemo(() => {
    const technicalTotal = technicalQuestions.length;
    const behavioralTotal = behavioralQuestions.length;

    const technicalDone = reviewed.technical?.size || 0;

    const behavioralDone = reviewed.behavioral?.size || 0;

    const total = technicalTotal + behavioralTotal;

    const done = technicalDone + behavioralDone;

    if (!total) return 0;

    return Math.round((done / total) * 100);
  }, [reviewed, technicalQuestions.length, behavioralQuestions.length]);

  // --------------------------------
  // LOADING / EMPTY
  // --------------------------------

  if (!interviewData) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#080808] text-white">
        <div className="text-center">
          <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-2 border-white/10 border-t-orange-500" />

          <p className="text-sm text-zinc-400">
            Loading your interview plan...
          </p>
        </div>
      </div>
    );
  }

  // --------------------------------
  // UI
  // --------------------------------

  return (
    <div className="min-h-screen bg-[#080808] text-white">
      {/* Background */}

      <div className="fixed inset-0 -z-0 overflow-hidden pointer-events-none">
        <div className="absolute left-[-250px] top-[-250px] h-[500px] w-[500px] rounded-full bg-orange-600/10 blur-[150px]" />

        <div className="absolute right-[-250px] top-[20%] h-[500px] w-[500px] rounded-full bg-red-600/10 blur-[160px]" />

        <div className="absolute bottom-[-300px] left-[35%] h-[500px] w-[500px] rounded-full bg-orange-500/5 blur-[150px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1500px] p-3 sm:p-5 lg:p-8">
        {/* Main Card */}

        <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#111]/95 shadow-2xl shadow-black/40">
          <div className="grid min-h-[750px] grid-cols-1 lg:grid-cols-[240px_minmax(0,1fr)_280px]">
            {/* ================================= */}
            {/* LEFT SIDEBAR */}
            {/* ================================= */}

            <aside className="border-b border-white/10 lg:border-b-0 lg:border-r">
              <div className="flex h-full flex-col p-5">
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <p className="text-xs text-zinc-500">Interview</p>

                    <h1 className="mt-1 text-sm font-semibold text-orange-300">
                      {data?.title || "Interview Plan"}
                    </h1>
                  </div>

                  <span className="text-[10px] text-zinc-500">
                    {overallProgress}%
                  </span>
                </div>

                {/* Progress */}

                <div className="mb-6 h-1.5 overflow-hidden rounded-full bg-white/5">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-orange-400 to-red-500 transition-all duration-500"
                    style={{
                      width: `${overallProgress}%`,
                    }}
                  />
                </div>

                {/* Navigation */}

                <nav className="space-y-2">
                  <button
                    onClick={() => handleSectionChange("technical")}
                    className={`w-full rounded-lg px-3 py-3 text-left text-sm transition ${
                      activeSection === "technical"
                        ? "bg-gradient-to-r from-orange-500 to-red-500 text-white"
                        : "text-zinc-400 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <div className="flex justify-between">
                      <span>Technical Questions</span>

                      <span className="text-[10px]">
                        {technicalQuestions.length}
                      </span>
                    </div>
                  </button>

                  <button
                    onClick={() => handleSectionChange("behavioral")}
                    className={`w-full rounded-lg px-3 py-3 text-left text-sm transition ${
                      activeSection === "behavioral"
                        ? "bg-gradient-to-r from-orange-500 to-red-500 text-white"
                        : "text-zinc-400 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <div className="flex justify-between">
                      <span>Behavioral Questions</span>

                      <span className="text-[10px]">
                        {behavioralQuestions.length}
                      </span>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      setActiveSection("roadmap");
                      setActiveDay(0);
                    }}
                    className={`w-full rounded-lg px-3 py-3 text-left text-sm transition ${
                      activeSection === "roadmap"
                        ? "bg-gradient-to-r from-orange-500 to-red-500 text-white"
                        : "text-zinc-400 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    Road Map
                  </button>
                </nav>

                {/* Questions */}

                {activeSection !== "roadmap" && (
                  <div className="mt-8 flex min-h-0 flex-1 flex-col">
                    <div className="mb-3 flex justify-between">
                      <p className="text-xs uppercase tracking-wider text-zinc-600">
                        Questions
                      </p>

                      <p className="text-[10px] text-zinc-600">
                        {sectionProgress(activeSection).done}/
                        {sectionProgress(activeSection).total}
                      </p>
                    </div>

                    <input
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder="Search questions..."
                      className="mb-3 w-full rounded-lg border border-white/10 bg-[#191919] px-3 py-2 text-xs text-zinc-200 outline-none placeholder:text-zinc-600 focus:border-orange-500/50"
                    />

                    <div className="max-h-[380px] space-y-1 overflow-y-auto">
                      {filteredQuestions.map((item) => (
                        <button
                          key={item._index}
                          onClick={() => setActiveQuestion(item._index)}
                          className={`w-full rounded-lg px-3 py-2 text-left text-xs ${
                            activeQuestion === item._index
                              ? "bg-white/10 text-white"
                              : "text-zinc-500 hover:bg-white/5"
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <span
                              className={`h-1.5 w-1.5 rounded-full ${
                                reviewed[activeSection]?.has(item._index)
                                  ? "bg-orange-400"
                                  : "bg-zinc-700"
                              }`}
                            />
                            Question {item._index + 1}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <button
  disabled={isGeneratingResume}
  onClick={async () => {
    try {
      if (!interviewId) {
        console.log("Id not found");
        return;
      }

      setIsGeneratingResume(true);

      const pdfBlob = await generatedResumePdfByUser(interviewId);

      console.log("PDF received:", pdfBlob);

      // PDF download
      const url = window.URL.createObjectURL(
        new Blob([pdfBlob], {
          type: "application/pdf",
        })
      );

      const link = document.createElement("a");

      link.href = url;
      link.download = "my-resume.pdf";

      document.body.appendChild(link);
      link.click();

      link.remove();
      window.URL.revokeObjectURL(url);

    } catch (error) {
      console.error("Resume generation failed:", error);
    } finally {
      setIsGeneratingResume(false);
    }
  }}
  className="
    group relative
    flex items-center gap-3
    overflow-hidden
    rounded-xl
    border border-orange-500/20
    bg-[#111111]/80
    px-5 py-2.5
    text-sm font-medium text-zinc-300
    shadow-lg shadow-black/30
    backdrop-blur-xl
    transition-all duration-300

    hover:border-orange-500/50
    hover:bg-orange-500/10
    hover:text-orange-400

    active:scale-95
    disabled:cursor-not-allowed
    disabled:opacity-60
  "
>
  {/* Icon */}
  <span className="relative flex h-8 w-8 items-center justify-center rounded-lg border border-orange-500/20 bg-gradient-to-br from-orange-500/20 to-red-500/20">
    {isGeneratingResume ? (
      <span className="h-4 w-4 animate-spin rounded-full border-2 border-zinc-600 border-t-orange-400" />
    ) : (
      <span className="animate-[iconPulse_2s_ease-in-out_infinite]">
        ✨
      </span>
    )}
  </span>

  {/* Text */}
  <span className="relative">
    {isGeneratingResume
      ? "Generating Resume..."
      : "Resume Download"}
  </span>

  {/* Arrow */}
  {!isGeneratingResume && (
    <span className="relative text-zinc-600 transition-all duration-300 group-hover:translate-x-1 group-hover:text-orange-400">
      →
    </span>
  )}
</button>
              </div>
            </aside>

            {/* ================================= */}
            {/* MAIN */}
            {/* ================================= */}

            <main className="min-w-0">
              <div className="min-h-[750px] p-5 sm:p-8">
                {/* ROADMAP */}

                {activeSection === "roadmap" ? (
                  <div className="mx-auto max-w-3xl">
                    <div className="mb-8">
                      <p className="text-xs uppercase tracking-widest text-zinc-500">
                        AI Preparation Plan
                      </p>

                      <h1 className="mt-2 text-3xl font-semibold">
                        {preparationPlan.length}-Day Roadmap
                      </h1>
                    </div>

                    <div className="space-y-3">
                      {preparationPlan.map((day, dayIndex) => {
                        const completion = dayCompletion(day, dayIndex);

                        return (
                          <div
                            key={dayIndex}
                            className="overflow-hidden rounded-xl border border-white/10 bg-white/[0.02]"
                          >
                            <button
                              onClick={() =>
                                setActiveDay(
                                  activeDay === dayIndex ? -1 : dayIndex,
                                )
                              }
                              className="flex w-full items-center justify-between p-4 text-left hover:bg-white/5"
                            >
                              <div className="flex items-center gap-4">
                                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-xs">
                                  {day.day}
                                </span>

                                <div>
                                  <p className="text-sm text-zinc-200">
                                    {day.focus}
                                  </p>

                                  <p className="mt-1 text-[10px] text-zinc-600">
                                    {completion}% complete
                                  </p>
                                </div>
                              </div>

                              <span className="text-zinc-500">
                                {activeDay === dayIndex ? "−" : "+"}
                              </span>
                            </button>

                            {activeDay === dayIndex && (
                              <div className="border-t border-white/10 px-5 py-4">
                                <div className="space-y-3">
                                  {day.task?.map((task, taskIndex) => {
                                    const key = `${dayIndex}-${taskIndex}`;

                                    const done = !!completedTasks[key];

                                    return (
                                      <div
                                        key={taskIndex}
                                        className="flex gap-3"
                                      >
                                        <button
                                          onClick={() =>
                                            toggleTask(dayIndex, taskIndex)
                                          }
                                          className={`mt-1 h-4 w-4 rounded border ${
                                            done
                                              ? "border-orange-400 bg-orange-400 text-black"
                                              : "border-zinc-600"
                                          }`}
                                        >
                                          {done && "✓"}
                                        </button>

                                        <p
                                          className={`text-sm leading-6 ${
                                            done
                                              ? "text-zinc-600 line-through"
                                              : "text-zinc-400"
                                          }`}
                                        >
                                          {task}
                                        </p>
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ) : currentQuestion ? (
                  /* QUESTION */

                  <div className="flex min-h-[700px] items-center">
                    <div className="mx-auto w-full max-w-3xl">
                      <div className="mb-8 flex items-center justify-between">
                        <span className="rounded-full border border-orange-500/30 bg-orange-500/10 px-3 py-1 text-xs text-orange-300">
                          {activeSection === "technical"
                            ? "Technical"
                            : "Behavioral"}
                        </span>

                        <span className="text-xs text-zinc-600">
                          {activeQuestion + 1} / {questions.length}
                        </span>
                      </div>

                      <h1 className="text-2xl font-medium leading-relaxed text-zinc-100 sm:text-3xl">
                        {currentQuestion.question}
                      </h1>

                      {/* Practiced */}

                      <button
                        onClick={() => toggleReviewed(activeQuestion)}
                        className={`mt-6 rounded-lg border px-3 py-2 text-xs ${
                          reviewed[activeSection]?.has(activeQuestion)
                            ? "border-orange-400/40 bg-orange-500/10 text-orange-300"
                            : "border-white/10 text-zinc-400"
                        }`}
                      >
                        {reviewed[activeSection]?.has(activeQuestion)
                          ? "✓ Practiced"
                          : "Mark as practiced"}
                      </button>

                      {/* Intention */}

                      <div className="mt-8">
                        <p className="mb-3 text-xs uppercase tracking-widest text-zinc-600">
                          What interviewer is checking
                        </p>

                        <p className="text-sm leading-7 text-zinc-400">
                          {currentQuestion.intention}
                        </p>
                      </div>

                      {/* Answer approach */}

                      <div className="mt-6 rounded-xl border border-white/10 bg-white/[0.02] p-5">
                        <button
                          onClick={() => setShowApproach((prev) => !prev)}
                          className="flex w-full justify-between text-left"
                        >
                          <span className="text-xs uppercase tracking-widest text-zinc-600">
                            Answer Approach
                          </span>

                          <span className="text-xs text-orange-300">
                            {showApproach ? "Hide" : "Reveal"}
                          </span>
                        </button>

                        {showApproach && (
                          <p className="mt-4 text-sm leading-7 text-zinc-300">
                            {currentQuestion.answerApproach}
                          </p>
                        )}
                      </div>

                      {/* Notes */}

                      <div className="mt-6">
                        <p className="mb-2 text-xs uppercase tracking-widest text-zinc-600">
                          Your Draft Answer
                        </p>

                        <textarea
                          value={notes[noteKey] || ""}
                          onChange={(e) =>
                            setNotes((prev) => ({
                              ...prev,
                              [noteKey]: e.target.value,
                            }))
                          }
                          placeholder="Write your answer here..."
                          className="h-32 w-full resize-none rounded-xl border border-white/10 bg-[#191919] p-4 text-sm text-zinc-200 outline-none placeholder:text-zinc-600 focus:border-orange-500/50"
                        />
                      </div>

                      {/* Buttons */}

                      <div className="mt-8 flex justify-between">
                        <button
                          disabled={activeQuestion === 0}
                          onClick={() => setActiveQuestion((prev) => prev - 1)}
                          className="rounded-lg border border-white/10 px-4 py-2 text-sm text-zinc-300 disabled:opacity-30"
                        >
                          ← Previous
                        </button>

                        <button
                          disabled={activeQuestion === questions.length - 1}
                          onClick={() => setActiveQuestion((prev) => prev + 1)}
                          className="rounded-lg bg-gradient-to-r from-orange-500 to-red-500 px-5 py-2 text-sm font-medium"
                        >
                          Next →
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex min-h-[700px] items-center justify-center text-zinc-500">
                    No questions available.
                  </div>
                )}
              </div>
            </main>

            {/* ================================= */}
            {/* RIGHT SIDEBAR */}
            {/* ================================= */}

            <aside className="border-t border-white/10 p-5 lg:border-t-0">
              <div className="sticky top-6">
                <p className="text-xs uppercase tracking-widest text-zinc-600">
                  Interview Analysis
                </p>

                <h2 className="mt-2 text-xl font-semibold text-orange-300">
                  Skill Gaps
                </h2>

                <p className="mt-2 text-xs leading-5 text-zinc-500">
                  Areas that need improvement before your interview.
                </p>

                {/* Skill gaps */}

                <div className="mt-5 space-y-2">
                  {skillGaps.map((item, index) => (
                    <div
                      key={index}
                      className={`rounded-xl border p-3 ${
                        item.severity === "high"
                          ? "border-red-500/30 bg-red-500/5"
                          : item.severity === "medium"
                            ? "border-orange-500/20 bg-orange-500/5"
                            : "border-white/10 bg-white/[0.02]"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-zinc-300">
                          {item.skill}
                        </span>

                        <span
                          className={`text-[10px] uppercase ${
                            item.severity === "high"
                              ? "text-red-400"
                              : item.severity === "medium"
                                ? "text-orange-400"
                                : "text-zinc-500"
                          }`}
                        >
                          {item.severity}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Match Score */}

                <div className="mt-8 border-t border-white/10 pt-6">
                  <p className="text-xs uppercase tracking-widest text-zinc-600">
                    Resume Match
                  </p>

                  <div className="mt-3 flex items-end gap-2">
                    <span className="text-5xl font-semibold text-transparent bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text">
                      {data?.matchScore ?? 0}
                    </span>

                    <span className="mb-2 text-sm text-zinc-600">/ 100</span>
                  </div>

                  <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/5">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-orange-400 to-red-500"
                      style={{
                        width: `${data?.matchScore ?? 0}%`,
                      }}
                    />
                  </div>
                </div>

                {/* Priority */}

                <div className="mt-8 border-t border-white/10 pt-6">
                  <p className="text-xs uppercase tracking-widest text-zinc-600">
                    Highest Priority
                  </p>

                  <div className="mt-4 space-y-3">
                    {skillGaps
                      .filter((item) => item.severity === "high")
                      .map((item, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between"
                        >
                          <span className="text-sm text-zinc-300">
                            {item.skill}
                          </span>

                          <span className="text-xs text-red-400">HIGH</span>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Interview;
