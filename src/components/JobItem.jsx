import { useState } from "react";

const BASE_URL =
  "https://botfilter-h5ddh6dye8exb7ha.centralus-01.azurewebsites.net";

function JobItem({ job, candidate }) {
  const [repoUrl, setRepoUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    // Validación: campo vacío
    if (!repoUrl.trim()) {
      setError("Please enter your GitHub repository URL.");
      return;
    }

    // Validación: URL de GitHub
    if (!repoUrl.includes("github.com")) {
      setError("Please enter a valid GitHub URL (must contain 'github.com')");
      return;
    }

    setLoading(true);
    setMessage("");
    setError("");

    try {
      const response = await fetch(
        `${BASE_URL}/api/candidate/apply-to-job`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            uuid: candidate.uuid,
            jobId: job.id,
            candidateId: candidate.candidateId,
            applicationId: candidate.applicationId, // requerido por la API
            repoUrl: repoUrl.trim(),
          }),
        }
      );

      const data = await response.json();

      if (response.ok && data.ok === true) {
        setMessage("Application sent successfully ✅");
        setRepoUrl(""); // Limpiar el input después del éxito
      } else {
        // Manejo mejorado de errores con más información
        const errorMessage = 
          data?.error || 
          data?.message || 
          response.statusText ||
          "Application failed. Please check your data";
        setError(`Application failed: ${errorMessage} ❌`);
      }
    } catch (err) {
      // Manejo de errores de red con más detalle
      setError(
        `Network error: ${err.message || "Please check your connection and try again"} ❌`
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ marginBottom: "1.5rem" }}>
      <h3>{job.title}</h3>

      <input
        type="text"
        placeholder="GitHub repo URL"
        value={repoUrl}
        onChange={(e) => setRepoUrl(e.target.value)}
        style={{ marginRight: "1rem", padding: "0.4rem" }}
      />

      <button
        onClick={handleSubmit}
        disabled={loading}
        style={{ padding: "0.4rem 0.8rem" }}
      >
        {loading ? "Submitting..." : "Submit"}
      </button>

      {message && (
        <p style={{ color: "lightgreen", marginTop: "0.5rem" }}>
          {message}
        </p>
      )}

      {error && (
        <p style={{ color: "salmon", marginTop: "0.5rem" }}>
          {error}
        </p>
      )}
    </div>
  );
}

export default JobItem;