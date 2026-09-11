import React from "react";

const TermAndCondition = () => {
  return (
    <div className="min-h-screen bg-[#080808] px-4 py-10 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">

        {/* Header */}
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-bold sm:text-4xl">
            Terms & Conditions
          </h1>

          <p className="mt-3 text-sm text-zinc-500">
            Last Updated: September 11, 2026
          </p>
        </div>

        {/* Content */}
        <div className="space-y-8 rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-10">

          <section>
            <h2 className="mb-3 text-xl font-semibold text-orange-400">
              1. Acceptance of Terms
            </h2>

            <p className="leading-7 text-zinc-400">
              By accessing or using this platform, you agree to be bound by
              these Terms & Conditions. If you do not agree with these terms,
              please do not use our services.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-orange-400">
              2. Our Services
            </h2>

            <p className="leading-7 text-zinc-400">
              Our platform provides AI-powered career and interview
              preparation services, including interview questions, interview
              analysis, skill-gap analysis, preparation roadmaps, and
              AI-generated resumes.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-orange-400">
              3. AI-Generated Content
            </h2>

            <p className="leading-7 text-zinc-400">
              Our platform uses artificial intelligence to generate content
              such as interview questions, recommendations, reports, and
              resumes. AI-generated information may sometimes be inaccurate,
              incomplete, or outdated.
            </p>

            <p className="mt-3 leading-7 text-zinc-400">
              Users should review and verify important information before
              relying on it. We do not guarantee that our AI recommendations
              will result in employment, interviews, job offers, or career
              advancement.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-orange-400">
              4. User Account
            </h2>

            <p className="leading-7 text-zinc-400">
              You are responsible for providing accurate information and
              maintaining the security of your account credentials. You are
              also responsible for all activities performed through your
              account.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-orange-400">
              5. Resume & Personal Information
            </h2>

            <p className="leading-7 text-zinc-400">
              You may provide information such as your name, education,
              skills, experience, and projects to generate career-related
              content. You are responsible for ensuring that the information
              you provide is accurate and that you have the right to provide
              it.
            </p>

            <p className="mt-3 leading-7 text-zinc-400">
              You should review your generated resume before submitting it to
              employers or other third parties.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-orange-400">
              6. Prohibited Activities
            </h2>

            <ul className="list-disc space-y-2 pl-5 leading-7 text-zinc-400">
              <li>Using the platform for illegal activities.</li>
              <li>Attempting unauthorized access to our systems.</li>
              <li>Uploading malicious files or harmful code.</li>
              <li>Abusing, scraping, or disrupting the platform.</li>
              <li>Impersonating another person.</li>
              <li>Creating fraudulent or misleading professional information.</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-orange-400">
              7. Intellectual Property
            </h2>

            <p className="leading-7 text-zinc-400">
              The platform, including its design, source code, branding,
              graphics, features, and original content, is protected by
              applicable intellectual-property laws.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-orange-400">
              8. Third-Party Services
            </h2>

            <p className="leading-7 text-zinc-400">
              Our platform may use third-party services such as AI providers,
              authentication services, cloud services, and APIs. We are not
              responsible for interruptions or failures caused by third-party
              services.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-orange-400">
              9. Service Availability
            </h2>

            <p className="leading-7 text-zinc-400">
              We aim to keep the platform available and functional, but we do
              not guarantee uninterrupted or error-free service. We may
              modify, suspend, or discontinue features when necessary.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-orange-400">
              10. Disclaimer
            </h2>

            <p className="leading-7 text-zinc-400">
              The platform and its AI-generated content are provided on an
              "as is" and "as available" basis. Users are responsible for
              evaluating and verifying information before using it.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-orange-400">
              11. Account Termination
            </h2>

            <p className="leading-7 text-zinc-400">
              We reserve the right to suspend or terminate accounts that
              violate these Terms & Conditions or misuse the platform.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-orange-400">
              12. Changes to These Terms
            </h2>

            <p className="leading-7 text-zinc-400">
              We may update these Terms & Conditions from time to time.
              Updated terms will be published on this page with a revised
              "Last Updated" date.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-orange-400">
              13. Contact Us
            </h2>

            <p className="leading-7 text-zinc-400">
              If you have any questions regarding these Terms & Conditions,
              please contact us at:
            </p>

            <p className="mt-3 font-medium text-orange-300">
              support@yourapp.com
            </p>
          </section>

        </div>
      </div>
    </div>
  );
};

export default TermAndCondition;