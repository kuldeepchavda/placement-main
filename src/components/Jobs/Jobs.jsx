import { useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { AppContext } from "../../context/AppContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import useApi from "../../utils/Request"
const JobList = () => {
    const { request } = useApi();


    const { user } = useContext(AuthContext);
    const { jobs } = useContext(AppContext);

    const applyForJob = async (id) => {
        console.log("Applied for", id)
        try {
            const data = await request(`${import.meta.env.VITE_BACKEND_URL}/apply/`,
                {
                    "method": "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ "jobId": id })
                })
            alert(data.msg);
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <div className="min-h-screen   text-zinc-100 p-3 md:p-6">
            <h1 className="text-2xl md:text-3xl font-bold mb-6 text-zinc-800">Available Jobs</h1>
            <div className="grid md:grid-cols-2 lg:grid-cols-3  gap-3 md:gap-6">
                {jobs.map((job) => (
                    <div
                        key={job._id}
                        className="bg-zinc-200 p-6 rounded-2xl shadow-md hover:shadow-lg transition"
                    >
                        <h2 className="text-xl font-semibold text-zinc-900">{job.jobTitle}</h2>
                        <p className="text-zinc-700 mt-2">{job.companyName}</p>
                        <p className="text-zinc-500 mt-4">{job.jobDescription}</p>
                        <div className="mt-6   flex justify-end">

                            <button onClick={() => { applyForJob(job._id) }} className="cursor-pointer px-4 py-2  bg-blue-500 hover:bg-blue-700 rounded-lg text-zinc-100 font-medium">
                                Apply
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default JobList;
