import { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputField from "../InputField";
import TextAreaField from "../TextAreaField";
import useApi from "../../utils/Request";

const ExperienceCreateForm = () => {
  const { request } = useApi();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    company: "",
    startDate: "",
    position:"",
    endDate: "",
    description: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await request("http://localhost:5000/experience", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      navigate("/profile");
    } catch (err) {
      console.error("Error creating experience:", err);
    }
  };

  return (
    <div className="bg-gray-50 p-6 md:p-10 min-h-screen font-sans">
      <div className="max-w-3xl mx-auto bg-white p-8 md:p-10 rounded-2xl shadow-lg border border-gray-200">
        <h1 className="text-2xl md:text-3xl font-bold text-blue-900 mb-6 text-center">
          Add Experience
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
            name="position"
            value={formData.position}
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
              className="px-6 py-3 bg-blue-600 text-white font-medium text-lg rounded-xl shadow hover:bg-blue-700 transition"
            >
              Add Experience
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ExperienceCreateForm;
