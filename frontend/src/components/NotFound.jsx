const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#080808] text-white">
      <div className="text-center">
        <h1 className="text-7xl font-bold text-orange-500">
          404
        </h1>

        <p className="mt-4 text-xl text-zinc-300">
          Page Not Found
        </p>

        <p className="mt-2 text-sm text-zinc-500">
          The page you're looking for doesn't exist.
        </p>

        <a
          href="/"
          className="inline-block mt-6 rounded-lg bg-orange-500 px-5 py-2 text-sm font-medium hover:bg-orange-600"
        >
          Go Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;