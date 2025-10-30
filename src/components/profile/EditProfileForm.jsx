import { useContext, useEffect, useState } from "react";
import InputField from "../InputField";
import TextAreaField from "../TextAreaField";
import SkillsForm from "../SkillsForm";
import ExperienceForm from "../ExperienceForm";
import EducationForm from "../EducationForm";
import { AuthContext } from "../../context/AuthContext";
import useApi from "../../utils/Request";
const EditProfileForm = ({ initialData = {} }) => {
  const { request } = useApi();
  const { user, userDetails, fetchUserDetails } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    bio: "",
    resumeUrl: "",
    portfolioUrl: "",
    skills: [],         
    experience: [],     
    education: [],     
    ...initialData,
  });
  useEffect(() => {
    if (user) {
      fetchUserDetails();
      setFormData((prev) => ({
        ...prev,
        fullName: userDetails?.fullName || "",
        email: userDetails?.email || "",
        phone: userDetails?.phone || "",
        bio: userDetails?.bio || "",
        skills: userDetails?.skills || [],
        resumeUrl: userDetails?.resumeUrl || "",
        portfolioUrl: userDetails?.portfolioUrl || "",
      }));
    }
    
  }, [user]);


  useEffect(() => { }, [])


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Final Form Data:", formData);
    try {
      const res = await request(`${import.meta.env.VITE_BACKEND_URL}/user/me`, {
        "method": "PUT",
        headers: {
          "Content-Type": "Application/json"
        },
        body:JSON.stringify(formData)
      })  
      // if(res.ok) {
        alert("Saved the changes...")
      // }
      console.log("responded",res);
    } catch (error) {
console.log("Error updating profile", error.message)
    }

  };

  return (
    <div className="bg-gray-50 p-6 md:p-10 min-h-screen font-sans">
      <div className="max-w-4xl mx-auto bg-white p-8 md:p-10 rounded-2xl shadow-lg border border-gray-200">
        <h1 className="text-3xl md:text-4xl font-bold text-blue-900 mb-8 text-center">
          Edit Profile
        </h1>

        <form onSubmit={handleSubmit} className="space-y-10">
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Personal Information
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <InputField
                label="Full Name"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                placeholder="Your full name"
              />
              <InputField
                label="Email Address"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="example@email.com"
              />
              <InputField
                label="Phone Number"
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="+91 9876543210"
              />
              <TextAreaField
                label="Bio"
                name="bio"
                value={formData.bio}
                onChange={handleInputChange}
                placeholder="Brief bio about yourself..."
                rows={3}
              />
              <div className="flex flex-row gap-5 items-center ">
                <p className="text-xl font-bold text-blue-900 text-center">Skills</p>
                {formData.skills.map((skl, idx) => (
                  <div key={idx} className="bg-green-300 border-2 border-green-900 px-3 py-2 rounded-3xl">
                    <p>{skl}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
          <ExperienceForm  edit={true} />

          <EducationForm edit={true} />
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Documents</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <InputField
                label="Resume URL"
                name="resumeUrl"
                value={formData.resumeUrl}
                onChange={handleInputChange}
                placeholder="https://your-resume-link.com"
              />
              <InputField
                label="Portfolio URL"
                name="portfolioUrl"
                value={formData.portfolioUrl}
                onChange={handleInputChange}
                placeholder="https://your-portfolio-link.com"
              />
            </div>
          </section>

          <div className="text-center">
            <button
              type="submit"

              className="px-6 py-3 bg-green-600 text-white font-medium text-lg rounded-xl shadow hover:bg-green-700 transition"
            >
              Save Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfileForm;
