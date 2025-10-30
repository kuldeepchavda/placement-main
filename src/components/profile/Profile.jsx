import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import userLogo from "../../assets/k.png";
import ExperienceList from "../ExperienceForm" 
import EducationList from "../EducationForm";  

const Profile = () => {
  const { user, userDetails, logout } = useContext(AuthContext); 

  if (!user)
    return (
      <h2 className="text-center text-xl mt-16 text-red-600 font-semibold">
        Please log in to view your profile.
      </h2>
    );

  return (
    <div className="w-full max-w-7xl mx-auto min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="bg-white p-8 mb-10 rounded-2xl shadow-xl border border-gray-100">
        <div className="flex  flex-col-reverse md:flex-row justify-between items-center md:items-start gap-8">
          
          <img
            src={userLogo}
            alt="Profile Avatar"
            className="w-32 h-32 rounded-full object-cover border-4 border-blue-400 shadow-lg flex-shrink-0"
          />
          <div className="flex-1 w-fit  text-center ">
            <h2 className="  text-left w-fit text-4xl font-extrabold text-gray-900 mb-1">
              {userDetails?.fullName || "Unnamed User"}
            </h2>
            <p className="text-left w-fit text-xl text-blue-600 font-medium mb-2">
              {userDetails?.email}
            </p>
            <p className= "text-left w-fit text-gray-600 mt-4 max-w-xl mx-auto md:mx-0 leading-relaxed italic">
              "{userDetails?.bio || "No bio available. Click 'Edit Profile' to add one."}"
            </p>
          </div>
          
        </div>

        <div className="mt-8 pt-4 border-t border-gray-100 flex justify-center md:justify-start gap-4">
          <Link
            to="/editprofile"
            className="px-6 py-2 ml-auto bg-blue-600 text-white rounded-xl font-semibold shadow-md hover:bg-blue-700 transition duration-300 transform hover:scale-[1.03]"
          >
            Edit Profile
          </Link>
          {/* <button
            onClick={logout}
            className="px-6 py-2 bg-red-500 text-white rounded-xl font-semibold shadow-md hover:bg-red-600 transition duration-300 transform hover:scale-[1.03]"
          >
            Logout
          </button> */}
        </div>
      </div>

      <section className="mt-12">
        <h3 className="text-3xl font-bold text-gray-800 mb-6 text-center">Work Experience </h3>
        {/* Pass the 'add' prop to show the '+ Add' button */}
        <ExperienceList edit={false}  />
      </section>

      <section className="mt-12">
        <h3 className="text-3xl font-bold text-gray-800 mb-6 text-center">Education </h3>
        <EducationList edit={false} />
      </section>
    </div>
  );
};

export default Profile;