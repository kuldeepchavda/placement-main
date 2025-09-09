import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import InputField from "../InputField";
import TextAreaField from "../TextAreaField";
import useApi from "../../utils/Request";

const EditExperienceForm = () => {
  const { id } = useParams();
  const { request } = useApi();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    company: "",
    role: "",
    startDate: "",
    endDate: "",
    description: "",
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExperience = async () => {
      try {
        const data = await request(`http://localhost:5000/experience/${id}`);
        setFormData({
          company: data?.company || "",
          role: data.role || "",
          startDate: data.startDate?.slice(0, 10) || "",
          endDate: data.endDate?.slice(0, 10) || "",
          description: data.description || "",
        });
        console.log(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching experience:", err);
      }
    };

    fetchExperience();
  },[] );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await request(`http://localhost:5000/experience/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      navigate("/profile");
    } catch (err) {
      console.error("Error updating experience:", err);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="bg-gray-50 p-6 md:p-10 min-h-screen font-sans">
      <div className="max-w-3xl mx-auto bg-white p-8 md:p-10 rounded-2xl shadow-lg border border-gray-200">
        <h1 className="text-2xl md:text-3xl font-bold text-blue-900 mb-6 text-center">
          Edit Experience
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <InputField
            label="Company"
            name="company"
            value={formData.company}
            onChange={handleInputChange}
            placeholder="Enter company name"
          />
          <InputField
            label="Role"
            name="role"
            value={formData.role}
            onChange={handleInputChange}
            placeholder="E.g. Software Engineer"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <InputField
              label="Start Date"
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleInputChange}
            />
            <InputField
              label="End Date"
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleInputChange}
            />
          </div>
          <TextAreaField
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Add details about your role..."
            rows={4}
          />

          <div className="text-center">
            <button
              type="submit"
              className="px-6 py-3 bg-green-600 text-white font-medium text-lg rounded-xl shadow hover:bg-green-700 transition"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditExperienceForm;
