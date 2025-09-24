// HomePage.jsx
import { Link } from "react-router-dom";
import ModalExample from "../utils/ModalExaplles";
const HomePage = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16 px-4 font-inter">
      <ModalExample />
      {/* Hero Section */}
      <h1 className="text-3xl md:text-5xl font-bold text-gray-800 mb-4">
        Welcome to <span className="text-blue-600">LaunchBoard</span>
      </h1>
      <p className="text-gray-600 max-w-2xl mb-6 md:text-lg">
        Your one-stop platform to manage jobs, connect with talent, and oversee
        everything from one simple dashboard.
        Streamline hiring, manage profiles, and keep track of opportunities with ease.
      </p>

      {/* Call-to-Actions */}
      <div className="flex gap-4">
        <Link
          to="/signup"
          className="px-6 py-3 rounded-2xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
        >
          Get Started
        </Link>
        <Link
          to="/list_jobs"
          className="px-6 py-3 rounded-2xl bg-gray-200 text-gray-800 font-semibold hover:bg-gray-300 transition"
        >
          View Jobs
        </Link>
      </div>

      {/* Features Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 max-w-5xl">
        <div className="p-6 bg-white rounded-2xl shadow">
          <h3 className="text-xl font-semibold text-blue-600 mb-2">Post Jobs</h3>
          <p className="text-gray-600">
            Create and manage job postings to find the right candidates quickly.
          </p>
        </div>
        <div className="p-6 bg-white rounded-2xl shadow">
          <h3 className="text-xl font-semibold text-blue-600 mb-2">Manage Profiles</h3>
          <p className="text-gray-600">
            Keep track of applicants and maintain detailed candidate profiles.
          </p>
        </div>
        <div className="p-6 bg-white rounded-2xl shadow">
          <h3 className="text-xl font-semibold text-blue-600 mb-2">Stay Organized</h3>
          <p className="text-gray-600">
            Use your dashboard to monitor job listings and application progress.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
