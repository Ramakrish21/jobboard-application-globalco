import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createJob } from "../services/jobService";

function AddJob() {
  const navigate = useNavigate();
  const [job, setJob] = useState({
    title: "",
    company: "",
    location: "",
    jobType: "",
    salary: "",
    experience: "",
    description: "",
    skills: "",
    applicationDeadline: "",
  });

  const handleChange = (e) => {
    setJob({
      ...job,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createJob(job);
      alert("Job added successfully!");
      navigate("/");
    } catch (error) {
      console.error(error);
      alert("Failed to add job.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <div className="bg-white shadow-md rounded-2xl p-6 sm:p-10">
        <h1 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-8">
          Add New Job
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block mb-1.5 text-sm font-medium text-gray-700">
                Job Title
              </label>
              <input
                type="text"
                name="title"
                placeholder="e.g. Backend Developer"
                value={job.title}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block mb-1.5 text-sm font-medium text-gray-700">
                Company
              </label>
              <input
                type="text"
                name="company"
                placeholder="e.g. Google"
                value={job.company}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block mb-1.5 text-sm font-medium text-gray-700">
                Location
              </label>
              <input
                type="text"
                name="location"
                placeholder="e.g. Hyderabad"
                value={job.location}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block mb-1.5 text-sm font-medium text-gray-700">
                Job Type
              </label>
              <input
                type="text"
                name="jobType"
                placeholder="e.g. Full Time"
                value={job.jobType}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block mb-1.5 text-sm font-medium text-gray-700">
                Salary
              </label>
              <input
                type="text"
                name="salary"
                placeholder="e.g. 12 LPA"
                value={job.salary}
                onChange={handleChange}
                className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block mb-1.5 text-sm font-medium text-gray-700">
                Experience
              </label>
              <input
                type="text"
                name="experience"
                placeholder="e.g. 2 Years"
                value={job.experience}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block mb-1.5 text-sm font-medium text-gray-700">
              Job Description
            </label>
            <textarea
              name="description"
              placeholder="Describe the role and responsibilities..."
              value={job.description}
              onChange={handleChange}
              required
              rows="4"
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
          </div>

          <div>
            <label className="block mb-1.5 text-sm font-medium text-gray-700">
              Required Skills
            </label>
            <textarea
              name="skills"
              placeholder="e.g. Java, Spring Boot, React"
              value={job.skills}
              onChange={handleChange}
              required
              rows="3"
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
          </div>

          <div>
            <label className="block mb-1.5 text-sm font-medium text-gray-700">
              Application Deadline
            </label>
            <input
              type="date"
              name="applicationDeadline"
              value={job.applicationDeadline}
              onChange={handleChange}
              className="w-full sm:w-1/2 border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3.5 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Add Job
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddJob;