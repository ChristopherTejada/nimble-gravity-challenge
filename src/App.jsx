import { useEffect, useState } from "react";
import CandidateInfo from "./components/CandidateInfo";
import JobList from "./components/JobList";

const BASE_URL =
  "https://botfilter-h5ddh6dye8exb7ha.centralus-01.azurewebsites.net";
const CANDIDATE_EMAIL = "christopherdramirez07@gmail.com";

function App() {
  const [candidate, setCandidate] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const candidateRes = await fetch(
          `${BASE_URL}/api/candidate/get-by-email?email=${CANDIDATE_EMAIL}`
        );
        const candidateData = await candidateRes.json();
        setCandidate(candidateData);

        const jobsRes = await fetch(`${BASE_URL}/api/jobs/get-list`);
        const jobsData = await jobsRes.json();
        setJobs(jobsData);
      } catch (err) {
        setError("Error loading data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Nimble Gravity Challenge</h1>
      <CandidateInfo candidate={candidate} />
      <JobList jobs={jobs} candidate={candidate} />
    </div>
  );
}


export default App;
