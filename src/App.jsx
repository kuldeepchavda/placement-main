import "./App.css";
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from "react-router-dom";
import { useContext } from "react";
import Navbar from "./components/Navbar"
import Login from "./components/Authentication/Login";
import Signup from "./components/Authentication/Signup";
import { AuthContext } from "./context/AuthContext";
import JobList from "./components/Jobs/Jobs";
import HomePage from "./components/HomePage";
import ProfilePage from "./components/profile/Profile";
import EditProfileForm from "./components/profile/EditProfileForm"
import EducationCreateForm from "./components/profile/CreateEducation";
import EducationEditForm from "./components/profile/EducationEditForm";
import ExperienceCreateForm from "./components/profile/CreateExperience"; 
import EditExperienceForm from "./components/profile/ExperienceEditForm";
// Home component
import AppliedJobs from "./components/Jobs/AppliedJobs";

// Protected route wrapper
const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <h2>Loading...</h2>;
  return user ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <div className="bg-zinc-100">
      <Navbar />
      <div className=" md:w-11/12 mx-auto ">
        <Routes>

          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/list_jobs" element={<JobList />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/editprofile" element={<EditProfileForm />} />
          <Route path="/education/create" element={<EducationCreateForm/>}/>
          <Route path="/experience/create" element={<ExperienceCreateForm/>}/>
          <Route path="/experience/:id" element={<EditExperienceForm/>}/>
          <Route path="/education/:id" element={<EducationEditForm/>}/>
          <Route path="/job/applied" element={<AppliedJobs/>}/>

          {/* Catch-all */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
