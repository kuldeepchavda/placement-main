import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import useApi from "../../utils/Request";

const AppliedJobs = () => {
  const { user } = useContext(AuthContext);
  const { request } = useApi();

  const [appliedJobs, setAppliedJobs] = useState([]);

  // Fetch applied jobs
  const fetchAppliedJobs = async () => {
    try {
      const data = await request(`${import.meta.env.VITE_BACKEND_URL}/apply`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      setAppliedJobs(data|| []);
    } catch (error) {
      console.error("Error fetching applied jobs:", error);
    }
  };

  useEffect(() => {
    fetchAppliedJobs();
  }, []);

  // Undo application
  const undoApplication = async (applicationId) => {
    try {
      const data = await request(
        `${import.meta.env.VITE_BACKEND_URL}/apply/undo`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ applicationId }),
        }
      );
      console.log("Undo response:", data);
      fetchAppliedJobs();
    } catch (error) {
      console.error("Error undoing application:", error);
    }
  };

  // Re-apply application
  const reapplyForJob = async (jobId) => {
    try {
        console.log("job id",jobId)
      const data = await request(`${import.meta.env.VITE_BACKEND_URL}/apply/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ jobId }),
      });
      console.log("Reapply response:", data);
      fetchAppliedJobs();
    } catch (error) {
      console.error("Error reapplying:", error);
    }
  };

  return (
    <div className="p-6   ">
      <h2 className="text-2xl font-bold mb-4">My Applications</h2>
      <div className="flex flex-row  ">
        {appliedJobs.length === 0 ? (
        <p className="text-gray-600">You haven’t applied to any jobs yet.</p>
      ) : (
       <div className="space-y-4 w-full flex flex-wrap gap-4 p-4">
  {appliedJobs.map((app) => (
    <div
      key={app._id}
      className="w-full   sm:w-[48%] md:w-[30%] lg:w-[23%] p-4 rounded-xl border border-gray-200 shadow-sm bg-white flex flex-col justify-between"
    >
      {/* Job Info */}
      <div>
        <h3 className="text-lg font-semibold text-blue-900">
          {app.jobTitle}
        </h3>
        <p className="text-sm text-gray-600">{app.companyName}</p>
        <p className="text-sm text-gray-500">{app.city}</p>
        <p className="text-sm text-gray-700 mt-2">
          Status:{" "}
          <span
            className={`font-medium ${
              app.status === "Pending"
                ? "text-yellow-600"
                : app.status === "Under Review"
                ? "text-blue-600"
                : app.status === "Accepted"
                ? "text-green-600"
                : app.status === "Rejected"
                ? "text-red-600"
                : app.status === "Withdrawn"
                ? "text-gray-400"
                : "text-gray-500"
            }`}
          >
            {app.status}
          </span>
        </p>
      </div>

      {/* Button changes based on status */}
      <div className="mt-3 ">
        {app.status === "Withdrawn" ? (
          <button
            onClick={() => reapplyForJob(app.jobId)}
            className=" cursor-pointer w-full px-4 py-2 bg-green-500 hover:bg-green-600 text-white font-medium rounded-lg shadow-sm"
          >
            Re-Apply
          </button>
        ) : (
          <button
            onClick={() => undoApplication(app._id)}
            className="cursor-pointer w-full px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-medium rounded-lg shadow-sm"
          >
            Undo
          </button>
        )}
      </div>
    </div>
  ))}
</div>

      )}
      </div>
    </div>
  );
};

export default AppliedJobs;
