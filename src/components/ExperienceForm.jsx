import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useApi from "../utils/Request";

export default function ExperienceList() {
  const { request } = useApi();
  const [experience, setExperience] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const data = await request("http://localhost:5000/experience", {
        method: "GET",
      });
      setExperience(data || []);
    }
    fetchData();
  }, []);

  return (
    <div className="space-y-6 w-full">
      <Link
        className="bg-blue-600 py-2 px-4 text-white ml-auto rounded-xl flex flex-col justify-end"
        to="/experience/create"
      >
        + Add Experience
      </Link>

      {experience.map((exp, index) => (
       <div
  key={exp._id}
  className="bg-white p-6 rounded-2xl border border-gray-200 shadow-lg hover:shadow-xl transition"
>
  {/* Header */}
  <div className="flex justify-between items-center mb-4">
    <div className="flex items-center gap-4">
      <span className="text-sm bg-gray-100 border border-gray-300 px-3 py-1 font-bold rounded-full">
        #{index + 1}
      </span>
      <div>
        <h3 className="text-xl font-semibold text-blue-900">
          {exp.role}
        </h3>
        <p className="text-sm text-gray-500">@ {exp.company}</p>
      </div>
    </div>
    <Link
      to={`/experience/${exp._id}`}
      className="py-2 px-4 bg-blue-600 rounded-xl text-white hover:bg-blue-700 transition"
    >
      Edit
    </Link>
  </div>

  {/* Duration */}
  <p className="text-gray-700 mb-3">
    <span className="font-medium">Duration:</span>{" "}
    {exp.startDate?.split("T")[0]} —{" "}
    {exp.endDate ? exp.endDate.split("T")[0] : "Present"}
  </p>

  {/* Description */}
  <div className="mb-4">
    <p className="text-gray-700 font-medium mb-1">Description</p>
    <p className="text-gray-600 leading-relaxed text-sm">
      {exp.description || "No description provided."}
    </p>
  </div>

  {/* Footer Info */}
  <div className="flex flex-wrap gap-6 text-xs text-gray-500 border-t pt-3">
    <p><span className="font-medium">ID:</span> {exp._id}</p>
    <p><span className="font-medium">Created:</span> {new Date(exp.createdAt).toLocaleDateString()}</p>
    <p><span className="font-medium">Updated:</span> {new Date(exp.updatedAt).toLocaleDateString()}</p>
  </div>
</div>

      ))}
    </div>
  );
}
