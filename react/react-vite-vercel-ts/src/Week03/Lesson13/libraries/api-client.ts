import apiClientAdvanced from "./api-client-advanced";
import apiClientSimple from "./api-client-simple";

const mode: "simple" | "advanced" = "advanced";

const apiClient = mode === "advanced" ? apiClientAdvanced : apiClientSimple; // Default export for simplicity

export { apiClient }; // Export both for flexibility
