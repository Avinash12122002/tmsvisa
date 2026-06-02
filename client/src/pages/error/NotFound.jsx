import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-6xl font-bold">404</h1>

      <p className="mt-4 text-gray-500">Page not found</p>

      <Link
        to="/login"
        className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-xl"
      >
        Go Back
      </Link>
    </div>
  );
};

export default NotFound;
