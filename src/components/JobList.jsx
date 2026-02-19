import JobItem from "./JobItem";

function JobList({ jobs, candidate }) {
  if (!jobs || jobs.length === 0) {
    return <p>No jobs available</p>;
  }

  return (
    <div>
      <h2>Available Positions</h2>
      {jobs.map((job) => (
        <JobItem key={job.id} job={job} candidate={candidate} />
      ))}
    </div>
  );
}

export default JobList;
