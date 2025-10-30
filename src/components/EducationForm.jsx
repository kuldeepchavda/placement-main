import { useEffect, useContext, useState } from "react";
import { Link } from "react-router-dom";
import useApi from "../utils/Request";
import { AppContext } from "../context/AppContext";
import ListCard from "./ListCard"; 
import DataLoader from "./DataLoader";
export default function EducationList({ edit = false }) {
  const { request } = useApi();
  const { education, setEducation } = useContext(AppContext);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchEducation() {
      setLoading(true);
      setError(null);
      try {
        const data = await request("http://localhost:5000/education", {
          method: "GET",
        });
        setEducation(data || []);
      } catch (err) {
        setError("Failed to load education history.");
        console.error("EducationList Fetch Error:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchEducation();
  }, [ ]);
  return (
    <div className="space-y-6 w-full">
      {edit && (
        <div className="w-4/5 mx-auto flex justify-end">
          <Link
            className="bg-blue-600 py-2 px-4 text-white rounded-xl hover:bg-blue-700 transition duration-200 text-sm font-medium"
            to="/education/create"
          >
            + Add Education
          </Link>
        </div>
      )}

      <DataLoader
        loading={loading}
        error={error}
        data={education}
        emptyMessage="No education entries found. Click 'Add Education' to start."
      >
        <div className="flex gap-6 w-4/5 mx-auto overflow-x-auto scroll-smooth pb-4 snap-x snap-mandatory">
          {education.map((edu, index) => (
            <ListCard
              key={edu._id}
              item={edu}
              index={index}
              type="education"
              idKey="_id"
              edit={edit}
              headerContent={
                <>
                  <h3 className="text-xl font-semibold text-blue-900 leading-snug">
                    {edu.degree} in {edu.field}
                  </h3>
                  <p className="text-sm text-gray-500">{edu.school}</p>
                </>
              }
              bodyContent={
                <div className="mb-4">
                  <p className="text-gray-700 font-medium mb-1">Description</p>
                  <p className="text-gray-600 leading-relaxed text-sm">
                    {edu.description || "No description provided."}
                  </p>
                </div>
              }
            />
          ))}
        </div>
      </DataLoader>
    </div>
  );
}