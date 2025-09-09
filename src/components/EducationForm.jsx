import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import useApi from "../utils/Request";
import { AppContext } from "../context/AppContext";
export default function EducationList() {
  const { request } = useApi();
  const { education, setEducation } = useContext(AppContext);
  useEffect(() => {
    async function fetchEducation() {
      const data = await request("http://localhost:5000/education", {
        method: "GET",
      });
      setEducation(data || []);
      console.log(education)
    }
    fetchEducation();
  }, []);

  return (
    <div className="space-y-6 w-full">
      <Link className="bg-blue-600 py-2 px-4  text-white ml-auto rounded-xl flex flex-col justify-end" to="/education/create" >+ Add education.</Link>
      {education.map((edu, index) => (
        <div
          key={edu._id}
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
                  {edu.degree} in {edu.field}
                </h3>
                <p className="text-sm text-gray-500">{edu.school}</p>
              </div>
            </div>
            <Link
              className="py-2 px-4 bg-blue-600 rounded-xl text-white hover:bg-blue-700 transition"
              to={`/education/${edu._id}`}
            >
              Edit
            </Link>
          </div>

          {/* Description */}
          <div className="mb-4">
            <p className="text-gray-700 font-medium mb-1">Description</p>
            <p className="text-gray-600 leading-relaxed text-sm">
              {edu.description || "No description provided."}
            </p>
          </div>

          {/* Footer Info */}
          <div className="flex flex-wrap gap-6 text-xs text-gray-500 border-t pt-3">
            <p><span className="font-medium">ID:</span> {edu._id}</p>
            <p><span className="font-medium">Created:</span> {new Date(edu.createdAt).toLocaleDateString()}</p>
            <p><span className="font-medium">Updated:</span> {new Date(edu.updatedAt).toLocaleDateString()}</p>
          </div>
        </div>

      ))}
    </div>
  );
}
