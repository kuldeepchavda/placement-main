import { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputField from "../InputField"
import TextAreaField from "../TextAreaField";
import useApi from "../../utils/Request";
import { AppContext } from "../../context/AppContext";
const EducationCreateForm = () => {
  const { request } = useApi();
  const navigate = useNavigate();
//   const {}
  const [formData, setFormData] = useState({
    school: "",
    degree: "",
    field: "",
    startDate: "",
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
      await request("http://localhost:5000/education", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      navigate("/profile");
    } catch (err) {
      console.error("Error creating education:", err);
    }
  };

  return (
    <div className="bg-gray-50 p-6 md:p-10 min-h-screen font-sans">
      <div className="max-w-3xl mx-auto bg-white p-8 md:p-10 rounded-2xl shadow-lg border border-gray-200">
        <h1 className="text-2xl md:text-3xl font-bold text-blue-900 mb-6 text-center">
          Add Education
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <InputField
            label="School / University"
            name="school"
            value={formData.school}
            onChange={handleInputChange}
            placeholder="Enter school/university name"
          />
          <InputField
            label="Degree"
            name="degree"
            value={formData.degree}
            onChange={handleInputChange}
            placeholder="E.g. B.Sc, M.Tech"
          />
          <InputField
            label="Field of Study"
            name="field"
            value={formData.field}
            onChange={handleInputChange}
            placeholder="E.g. Computer Science"
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
            placeholder="Add any extra details..."
            rows={4}
          />

          <div className="text-center">
            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 text-white font-medium text-lg rounded-xl shadow hover:bg-blue-700 transition"
            >
              Add Education
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EducationCreateForm;
