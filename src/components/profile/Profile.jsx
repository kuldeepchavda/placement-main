import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import userLogo from "../../assets/user.png"
const Profile = () => {
  const { user, logout } = useContext(AuthContext);
  console.log("user",user);
  if (!user) return <h2 className="text-center text-xl mt-6">You are not logged in.</h2>;

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-2xl p-6 mt-10 text-center">
      {/* Profile Picture */}
      <img
        src={userLogo}
        alt="Profile"
        className="w-28 h-28 rounded-full mx-auto mb-4 border-2 border-blue-400"
      />

      {/* User Info */}
      <h2 className="text-2xl font-bold text-gray-800">{user.fullName || "Unnamed User"}</h2>
      <p className="text-gray-600">{user.email}</p>
      <p className="text-gray-500 mt-2">{user.bio || "No bio available"}</p>

      {/* Buttons */}
      <div className="mt-6 flex justify-center gap-4">
        <Link
          to="/editprofile"
          className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition"
        >
          Edit Profile
        </Link>
        <button
          onClick={logout}
          className="px-4 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
