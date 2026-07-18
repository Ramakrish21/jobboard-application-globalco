import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getJobById } from "../services/jobService";
import {
  Building2,
  MapPin,
  Clock,
  Briefcase,
  IndianRupee,
  CalendarClock,
  Pencil,
  ArrowLeft,
} from "lucide-react";

function JobDetails() {
  const { id } = useParams();
  const [job, setJob] = useState(null);

  useEffect(() => {
    loadJob();
  }, []);

  const loadJob = async () => {
    try {
      const response = await getJobById(id);
      setJob(response.data);
    } catch (error) {
      console.error(error);
      alert("Unable to load job details.");
    }
  };

  if (!job) {
    return (
      <div className="text-center mt-16 text-gray-500">Loading...</div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <div className="bg-white shadow-md rounded-2xl p-6 sm:p-10">

        <div className="flex items-start gap-4 mb-6">
          <div className="w-14 h-14 shrink-0 rounded-xl bg-blue-50 flex items-center justify-center">
            <Building2 size={26} className="text-blue-600" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-snug">
              {job.title}
            </h1>
            <p className="text-gray-500 mt-1">{job.company}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          <span className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-700 text-sm font-medium px-3 py-1.5 rounded-full">
            <Briefcase size={14} /> {job.jobType}
          </span>
          <span className="inline-flex items-center gap-1.5 bg-gray-100 text-gray-600 text-sm font-medium px-3 py-1.5 rounded-full">
            <MapPin size={14} /> {job.location}
          </span>
          <span className="inline-flex items-center gap-1.5 bg-gray-100 text-gray-600 text-sm font-medium px-3 py-1.5 rounded-full">
            <Clock size={14} /> {job.experience}
          </span>
        </div>

        <div className="grid sm:grid-cols-3 gap-4 mb-8 border-y border-gray-100 py-6">
          <div>
            <p className="text-xs text-gray-400 mb-1">Salary</p>
            <div className="flex items-center gap-1.5 font-semibold text-gray-900">
              <IndianRupee size={16} />
              {job.salary || "Not disclosed"}
            </div>
          </div>
          <div>
            <p className="text-xs text-gray-400 mb-1">Application deadline</p>
            <div className="flex items-center gap-1.5 font-semibold text-gray-900">
              <CalendarClock size={16} />
              {job.applicationDeadline || "—"}
            </div>
          </div>
          <div>
            <p className="text-xs text-gray-400 mb-1">Posted on</p>
            <p className="font-semibold text-gray-900">
              {job.postedDate ? job.postedDate.split("T")[0] : "—"}
            </p>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">
            Job description
          </h2>
          <p className="text-gray-600 leading-relaxed whitespace-pre-line">
            {job.description}
          </p>
        </div>

        <div className="mb-10">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">
            Required skills
          </h2>
          <div className="flex flex-wrap gap-2">
            {job.skills.split(",").map((skill, index) => (
              <span
                key={index}
                className="bg-gray-100 text-gray-700 text-sm px-3 py-1.5 rounded-full"
              >
                {skill.trim()}
              </span>
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-gray-100">
          <Link
            to={`/edit-job/${job.id}`}
            className="flex-1 flex items-center justify-center gap-2 bg-amber-500 text-white font-medium px-6 py-3 rounded-lg hover:bg-amber-600 transition-colors"
          >
            <Pencil size={16} /> Edit job
          </Link>
          <Link
            to="/"
            className="flex-1 flex items-center justify-center gap-2 bg-gray-100 text-gray-700 font-medium px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <ArrowLeft size={16} /> Back to jobs
          </Link>
        </div>
      </div>
    </div>
  );
}

export default JobDetails;