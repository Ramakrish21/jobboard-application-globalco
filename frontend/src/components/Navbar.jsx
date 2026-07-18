import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const linkClasses = ({ isActive }) =>
    `px-4 py-2 rounded-full text-sm font-medium transition-colors ${
      isActive ? "bg-blue-600 text-white" : "text-gray-600 hover:bg-gray-100"
    }`;

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">

        {/* Logo */}
        <Link
          to="/"
          className="text-xl sm:text-2xl text-blue-600 font-extrabold tracking-tight"
          onClick={() => setIsOpen(false)}
        >
          Job<span className="text-gray-800">Board</span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex gap-2">
          <NavLink to="/" className={linkClasses} end>
            Home
          </NavLink>
          <NavLink to="/add-job" className={linkClasses}>
            Add Job
          </NavLink>
        </div>

        {/* Hamburger button */}
        <button
          className="md:hidden text-gray-700"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
          aria-expanded={isOpen}
        >
          {isOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile dropdown */}
      {isOpen && (
        <div className="md:hidden flex flex-col gap-1 px-4 sm:px-6 pb-4 border-t border-gray-100">
          <NavLink
            to="/"
            end
            className={linkClasses}
            onClick={() => setIsOpen(false)}
          >
            Home
          </NavLink>
          <NavLink
            to="/add-job"
            className={linkClasses}
            onClick={() => setIsOpen(false)}
          >
            Add Job
          </NavLink>
        </div>
      )}
    </nav>
  );
}

export default Navbar;