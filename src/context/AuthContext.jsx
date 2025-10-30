import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {

  const navigate = useNavigate();
  const [user, setUser] = useState();
  const [userDetails, setUserDetails] = useState();
  const [loading, setLoading] = useState();
  const [errInfo, setErrInfo] = useState();
  // this is working 

  async function fetchUserDetails() {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/user/me`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          console.log("got user details", data);
          setUserDetails(data);
          // console.log("everve",data.email);
        }
        setLoading(false);
      }).
      catch((errr) => {
        console.log("Err", errr)
      });
  }
  useEffect(() => {
    async function g(params) {
      fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/user/checksession`, {
        credentials: "include",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.verified) {
            setUser(data.user.email);
            // console.log("everve",data.email);
          }
          setLoading(false);
        }).
        catch((errr) => {
          console.log("Err", errr)
        });


      fetchUserDetails();
    }
    g();
  }, []);

  // SIGN UP 
  const signup = async (email, password) => {
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/user/signup`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const response_ = await res.json()
    if (res.ok) {
      setUser({ email });
      navigate("/")
      console.log("Signed up successfully!!")
      // console.log("Got body\n","email",response_.data.email,"\npassword",response_.data.password,response_.success );
    }
    if (!res.ok) {
      setErrInfo(response_.message);
      console.log("Got an error!!")
    }
  };

  // LOGIN 
  const login = async (email, password) => {
    console.log(email, password)

    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/user/login`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json()
    if (res.ok) {
      console.log("Logged in successfully!!")
      navigate("/");
      setUser(email);
    }
    if (!res.ok) {
      setErrInfo(data.message);
      console.log(data.message)
    }
  };

  const logout = async () => {

    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/user/logout`, {
        credentials: "include",
      });
      const data = await res.json()
      if (res.ok) {
        console.log(data)
        setUser(null);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  console.log(user);
  const testingData = "Context provider";

  return (
    <AuthContext.Provider value={{ testingData, user, login, signup, logout, loading, errInfo, userDetails , fetchUserDetails}}>
      {children}
    </AuthContext.Provider>
  )

}

export default AuthProvider;
