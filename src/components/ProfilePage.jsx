import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const ProfilePage = () => {
  const { user } = useContext(AuthContext); // assume user data is in context
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(`http://localhost:8080/profile/${user._id}`);
        const data = await res.json();
        if (data.success) setProfile(data.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProfile();
  }, [user]);

  if (!profile) return <></>

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded-2xl shadow-lg mt-8">
      <div className="flex items-center space-x-6">
        <img
          src={profile.profilePicture || "https://via.placeholder.com/100"}
          alt="Profile"
          className="w-28 h-28 rounded-full object-cover border"
        />
        <div>
          <h1 className="text-2xl font-bold">{profile.fullName}</h1>
          <p className="text-gray-600">{profile.email}</p>
          <p className="text-gray-600">{profile.phone}</p>
        </div>
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-2">Bio</h2>
        <p className="text-gray-700">{profile.bio || "No bio added yet."}</p>
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-2">Skills</h2>
        <div className="flex flex-wrap gap-2">
          {profile.skills?.length > 0 ? (
            profile.skills.map((skill, idx) => (
              <span
                key={idx}
                className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
              >
                {skill}
              </span>
            ))
          ) : (
            <p className="text-gray-600">No skills listed.</p>
          )}
        </div>
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-2">Experience</h2>
        {profile.experience?.length > 0 ? (
          profile.experience.map((exp, idx) => (
            <div key={idx} className="mb-4 border-b pb-2">
              <h3 className="font-medium">{exp.title} @ {exp.company}</h3>
              <p className="text-sm text-gray-500">
                {new Date(exp.startDate).toLocaleDateString()} -{" "}
                {exp.endDate ? new Date(exp.endDate).toLocaleDateString() : "Present"}
              </p>
              <p className="text-gray-700">{exp.description}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-600">No experience added.</p>
        )}
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-2">Education</h2>
        {profile.education?.length > 0 ? (
          profile.education.map((edu, idx) => (
            <div key={idx} className="mb-4 border-b pb-2">
              <h3 className="font-medium">{edu.degree} in {edu.field}</h3>
              <p className="text-sm text-gray-500">{edu.school}</p>
              <p className="text-sm text-gray-500">
                {new Date(edu.startDate).toLocaleDateString()} -{" "}
                {edu.endDate ? new Date(edu.endDate).toLocaleDateString() : "Present"}
              </p>
            </div>
          ))
        ) : (
          <p className="text-gray-600">No education details added.</p>
        )}
      </div>

      {profile.resumeUrl && (
        <div className="mt-6">
          <a
            href={profile.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            View Resume
          </a>
        </div>
      )}
    </div>

  );
};

export default ProfilePage;
