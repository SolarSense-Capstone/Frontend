import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 120000,
  headers: { "Content-Type": "application/json" },
});

/**
 * Normalize any API error into a safe, user-friendly error object.
 * NEVER expose raw server error messages, stack traces, or internal codes to users.
 */
export function normalizeApiError(err) {
  // Network / refused connection
  if (!err.response) {
    return {
      title: "Connection Error",
      message: "We couldn't reach the server. Please check your internet connection and try again.",
      status: 0,
    };
  }

  const status = err.response.status;
  const data = err.response.data || {};

  // Backend 503 / INCOMPLETE status (per API doc)
  if (status === 503 || data?.status === "INCOMPLETE") {
    return {
      title: "Assessment incomplete",
      message:
        "We couldn't complete your assessment right now. Please try again in a moment.",
      status,
    };
  }

  // Validation errors (400, 422) — user-friendly only, no raw server details
  if (status === 400 || status === 422) {
    return {
      title: "Check your inputs",
      message:
        "Some of the information you entered needs to be corrected. Please review and try again.",
      status,
    };
  }

  // Auth errors
  if (status === 401 || status === 403) {
    return {
      title: "Access denied",
      message:
        "You don't have permission to perform this action. Please refresh and try again.",
      status,
    };
  }

  // Not found
  if (status === 404) {
    return {
      title: "Not found",
      message: "The requested resource could not be found. Please try again.",
      status,
    };
  }

  // Server errors (5xx) — never expose server error message to the user
  if (status >= 500) {
    return {
      title: "Server error",
      message:
        "Something went wrong on our end. Please try again in a few moments.",
      status,
    };
  }

  // Catch-all
  return {
    title: "Something went wrong",
    message: "An unexpected error occurred. Please try again.",
    status,
  };
}

export const analyzeAssessment = async (payload) => {
  const res = await api.post("/api/v1/assessments/analyze", payload);
  return res.data;
};
