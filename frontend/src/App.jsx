import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import AddJob from "./pages/AddJob";
import EditJob from "./pages/EditJob";
import JobDetails from "./pages/JobDetails";
import NotFound from "./pages/NotFound";

import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-job" element={<AddJob />} />
        <Route path="/edit-job/:id" element={<EditJob />} />
        <Route path="/job/:id" element={<JobDetails />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;