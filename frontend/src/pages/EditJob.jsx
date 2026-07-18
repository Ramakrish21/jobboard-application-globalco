import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getJobById, updateJob } from "../services/jobService";

function EditJob() {
  const { id } = useParams();
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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadJob();
  }, []);

  const loadJob = async () => {
    try {
      const response = await getJobById(id);

      setJob({
        ...response.data,
        applicationDeadline: response.data.applicationDeadline || "",
      });
    } catch (error) {
      console.error(error);
      alert("Unable to load job.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setJob({
      ...job,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateJob(id, job);

      alert("Job updated successfully!");

      navigate("/");
    } catch (error) {
      console.error(error);
      alert("Failed to update job.");
    }
  };

  if (loading) {
    return (
      <div className="text-center mt-16 text-gray-500">Loading job...</div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <div className="bg-white shadow-md rounded-2xl p-6 sm:p-10">
        <h1 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-8">
          Edit Job
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
                value={job.title}
                onChange={handleChange}
                placeholder="e.g. Backend Developer"
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
                value={job.company}
                onChange={handleChange}
                placeholder="e.g. Google"
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
                value={job.location}
                onChange={handleChange}
                placeholder="e.g. Hyderabad"
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
                value={job.jobType}
                onChange={handleChange}
                placeholder="e.g. Full Time"
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
                value={job.salary}
                onChange={handleChange}
                placeholder="e.g. 12 LPA"
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
                value={job.experience}
                onChange={handleChange}
                placeholder="e.g. 2 Years"
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
              value={job.description}
              onChange={handleChange}
              placeholder="Describe the role and responsibilities..."
              rows="4"
              required
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
          </div>

          <div>
            <label className="block mb-1.5 text-sm font-medium text-gray-700">
              Required Skills
            </label>
            <textarea
              name="skills"
              value={job.skills}
              onChange={handleChange}
              placeholder="e.g. Java, Spring Boot, React"
              rows="3"
              required
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
            className="w-full bg-amber-500 text-white py-3.5 rounded-lg font-medium hover:bg-amber-600 transition-colors"
          >
            Update Job
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditJob;