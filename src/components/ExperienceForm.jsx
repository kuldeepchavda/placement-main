import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useApi from "../utils/Request";
import ListCard from "./ListCard";
import DataLoader from "./DataLoader"; 
export default function ExperienceList({ edit = false }) {
  const { request } = useApi();
  const [experience, setExperience] = useState([]);
  const [loading, setLoading] = useState(true);  
  const [error, setError] = useState(null);
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(null);
      try {
        const data = await request("http://localhost:5000/experience", {
          method: "GET",
        });
        setExperience(data || []);
      } catch (err) {
        setError("Failed to load work experience.");
        console.error("ExperienceList Fetch Error:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [ ]);  

  const formatDuration = (start, end) => {
    const startDate = start?.split("T")[0];
    const endDate = end ? end.split("T")[0] : "Present";
    return `${startDate} — ${endDate}`;
  };

  return (
    <div className="space-y-6 w-full">
      {edit && (
        <div className="w-4/5 mx-auto flex justify-end">
          <Link
            className="bg-blue-600 py-2 px-4 text-white rounded-xl hover:bg-blue-700 transition duration-200 text-sm font-medium"
            to="/experience/create"
          >
            + Add Experience
          </Link>
        </div>
      )}

      <DataLoader
        loading={loading}
        error={error}
        data={experience}
        edit={edit}
        emptyMessage="No experience entries found. Click 'Add Experience' to start."
      >
        <div className="flex gap-6 w-4/5 mx-auto overflow-x-auto scroll-smooth pb-4 snap-x snap-mandatory">
          {experience.map((exp, index) => (
            <ListCard
              key={exp._id}
              item={exp}
              index={index}
              type="experience"
              idKey="_id"
              edit={edit}
              headerContent={
                <>
                  <h3 className="text-xl font-semibold text-blue-900 leading-snug">
                    {exp.role}
                  </h3>
                  <p className="text-sm text-gray-500">@ {exp.company}</p>
                </>
              }
              bodyContent={
                <div className="mb-4">
                  <p className="text-gray-700 mb-2">
                    <span className="font-medium">Duration:</span>{" "}
                    {formatDuration(exp.startDate, exp.endDate)}
                  </p>
                  <p className="text-gray-700 font-medium mb-1">Description</p>
                  <p className="text-gray-600 leading-relaxed text-sm">
                    {exp.description || "No description provided."}
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