import { Link } from "react-router-dom";

function JobCard({ job, onDelete }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition duration-300 border">
      <h2 className="text-2xl font-bold text-blue-700 mb-3">
        {job.title}
      </h2>

      <p className="mb-2">
        <span className="font-semibold">Company:</span> {job.company}
      </p>

      <p className="mb-2">
        <span className="font-semibold">Location:</span> {job.location}
      </p>

      <p className="mb-2">
        <span className="font-semibold">Experience:</span> {job.experience}
      </p>

      <p className="mb-2">
        <span className="font-semibold">Job Type:</span> {job.jobType}
      </p>

      <p className="mb-4">
        <span className="font-semibold">Salary:</span> {job.salary}
      </p>

      <div className="flex gap-3">
        <Link
          to={`/job/${job.id}`}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          View
        </Link>

        <Link
          to={`/edit-job/${job.id}`}
          className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
        >
          Edit
        </Link>

        <button
          onClick={() => onDelete(job.id)}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default JobCard;