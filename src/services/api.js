import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 120000,
  headers: { "Content-Type": "application/json" },
});

export function normalizeApiError(err) {
  // Network / refused connection
  if (!err.response) {
    return {
      title: "Network error",
      message:
        "We couldn’t reach the server. Please check the backend is running and your base URL is correct.",
      status: 0,
    };
  }

  const status = err.response.status;
  const data = err.response.data || {};

  // Backend 503 incomplete response (per doc)
  if (status === 503 || data?.status === "INCOMPLETE") {
    return {
      title: "Assessment incomplete",
      message:
        "We couldn’t complete your assessment right now. Please try again in a moment.",
      status,
      details: data,
    };
  }

  // Validation
  if (status === 400) {
    return {
      title: "Check your inputs",
      message:
        data?.error === "Validation error"
          ? "Some fields need attention. Please review and try again."
          : data?.message || "Please review the form and try again.",
      status,
      details: data,
    };
  }

  return {
    title: "Something went wrong",
    message: data?.message || data?.error || "Please try again.",
    status,
    details: data,
  };
}

export const analyzeAssessment = async (payload) => {
  const res = await api.post("/api/v1/assessments/analyze", payload);

  return res.data;
};

export const sendAssessmentReport = async (assessmentId, email) => {
  // Assuming a standard POST endpoint for emailing a report
  const res = await api.post(`/api/v1/assessments/${assessmentId}/send-report`, { email });
  return res.data;
};
