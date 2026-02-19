function CandidateInfo({ candidate }) {
  if (!candidate) return null;

  return (
    <div style={{ marginBottom: "2rem" }}>
      <h2>Candidate Info</h2>
      <p><strong>Name:</strong> {candidate.firstName} {candidate.lastName}</p>
      <p><strong>Email:</strong> {candidate.email}</p>
    </div>
  );
}

export default CandidateInfo;
