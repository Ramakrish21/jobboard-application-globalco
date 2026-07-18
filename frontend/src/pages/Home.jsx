import { useEffect, useState } from "react";
import { getAllJobs, deleteJob } from "../services/jobService";
import JobCard from "../components/JobCard";
import { Search } from "lucide-react";

function Home() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    loadJobs();
  }, []);

  const loadJobs = async () => {
    try {
      const response = await getAllJobs();
      setJobs(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this job?"
    );

    if (!confirmDelete) return;

    try {
      await deleteJob(id);
      loadJobs();
    } catch (error) {
      console.error(error);
    }
  };

  const filteredJobs = jobs.filter((job) => {
    const term = searchTerm.toLowerCase();
    return (
      job.title.toLowerCase().includes(term) ||
      job.company.toLowerCase().includes(term) ||
      job.location.toLowerCase().includes(term)
    );
  });

  if (loading) {
    return (
      <div className="text-center mt-16 text-gray-500">Loading jobs...</div>
    );
  }

  return (
    <div>

      <div className="bg-gradient-to-b from-blue-50 to-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16 text-center">
          <h1 className="text-3xl sm:text-5xl font-bold text-gray-900 tracking-tight">
            Find your next role
          </h1>
          <p className="text-gray-500 mt-3 text-base sm:text-lg">
            {jobs.length} open {jobs.length === 1 ? "position" : "positions"} waiting for you
          </p>

          <div className="mt-8 max-w-xl mx-auto relative">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Search by title, company, or location"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-3.5 rounded-full border border-gray-200 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
        {filteredJobs.length === 0 ? (
          <div className="text-center py-20 border border-dashed border-gray-200 rounded-2xl">
            <h2 className="text-lg font-medium text-gray-700">
              {searchTerm ? "No matching jobs" : "No jobs found"}
            </h2>
            <p className="text-gray-400 text-sm mt-1">
              {searchTerm
                ? "Try a different search term."
                : "Check back soon or post a new opening."}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredJobs.map((job) => (
              <JobCard key={job.id} job={job} onDelete={handleDelete} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;