import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import InputField from "../InputField";
import TextAreaField from "../TextAreaField";
import useApi from "../../utils/Request"; // your custom fetch wrapper

const EditEducationForm = () => {
  const { id } = useParams(); // get :id from route (/education/:id)
  const { request } = useApi();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    school: "",
    degree: "",
    fieldOfStudy: "",
    startDate: "",
    endDate: "",
    description: "",
  });

  const [loading, setLoading] = useState(true);

  // Fetch existing education by id
  useEffect(() => {
    const fetchEducation = async () => {
      try {
        const data = await request(`http://localhost:5000/education/${id}`);
        setFormData({
          school: data.school || "",
          degree: data.degree || "",
          fieldOfStudy: data.fieldOfStudy || "",
          startDate: data.startDate?.slice(0, 10) || "", // format for <input type="date">
          endDate: data.endDate?.slice(0, 10) || "",
          description: data.description || "",
        });
        setLoading(false);
      } catch (err) {
        console.error("Error fetching education:", err);
      }
    };

    fetchEducation();
  }, [id, request]);

  // Input change handler
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Submit handler (PUT request)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await request(`http://localhost:5000/education/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      navigate("/profile"); // redirect after success
    } catch (err) {
      console.error("Error updating education:", err);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="bg-gray-50 p-6 md:p-10 min-h-screen font-sans">
      <div className="max-w-3xl mx-auto bg-white p-8 md:p-10 rounded-2xl shadow-lg border border-gray-200">
        <h1 className="text-2xl md:text-3xl font-bold text-blue-900 mb-6 text-center">
          Edit Education
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
            name="fieldOfStudy"
            value={formData.fieldOfStudy}
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
            placeholder="Add any extra details about your education..."
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

export default EditEducationForm;
