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
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
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

    setSubmitting(true);

    try {
      await updateJob(id, job);

      alert("Job updated successfully!");

      navigate("/");
    } catch (error) {
      console.error(error);
      alert("Failed to update job.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-80">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent mx-auto"></div>
          <p className="mt-4 text-gray-500">Loading job...</p>
        </div>
      </div>
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
                required
                placeholder="Backend Developer"
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
                required
                placeholder="Google"
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
                required
                placeholder="Hyderabad"
                className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block mb-1.5 text-sm font-medium text-gray-700">
                Job Type
              </label>

              <select
                name="jobType"
                value={job.jobType}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Job Type</option>
                <option value="Full Time">Full Time</option>
                <option value="Part Time">Part Time</option>
                <option value="Internship">Internship</option>
                <option value="Contract">Contract</option>
                <option value="Remote">Remote</option>
              </select>

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
                placeholder="12 LPA"
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
                required
                placeholder="2 Years"
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
              required
              rows="4"
              placeholder="Describe the role..."
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
              required
              rows="3"
              placeholder="Java, Spring Boot, React"
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

          <div className="flex flex-col sm:flex-row gap-4">

            <button
              type="submit"
              disabled={submitting}
              className="flex-1 bg-amber-500 text-white py-3.5 rounded-lg font-medium hover:bg-amber-600 transition disabled:bg-gray-400"
            >
              {submitting ? "Updating..." : "Update Job"}
            </button>

            <button
              type="button"
              onClick={() => navigate("/")}
              className="flex-1 bg-gray-200 text-gray-700 py-3.5 rounded-lg font-medium hover:bg-gray-300 transition"
            >
              Cancel
            </button>

          </div>

        </form>

      </div>
    </div>
  );
}

export default EditJob;