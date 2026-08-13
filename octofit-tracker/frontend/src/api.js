// API Configuration with environment-aware URL
const getApiBaseUrl = () => {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
  
  if (codespaceName && codespaceName !== 'undefined') {
    return `https://${codespaceName}-8000.app.github.dev/api`;
  }
  
  // Fallback to localhost for local development
  return 'http://localhost:8000/api';
};

export const API_BASE_URL = getApiBaseUrl();

export const apiClient = {
  async get(endpoint) {
    try {
      const url = `${API_BASE_URL}${endpoint}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`API Error: ${endpoint}`, error);
      throw error;
    }
  },

  async post(endpoint, data) {
    try {
      const url = `${API_BASE_URL}${endpoint}`;
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`API Error: ${endpoint}`, error);
      throw error;
    }
  },

  async put(endpoint, data) {
    try {
      const url = `${API_BASE_URL}${endpoint}`;
      const response = await fetch(url, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`API Error: ${endpoint}`, error);
      throw error;
    }
  },

  async delete(endpoint) {
    try {
      const url = `${API_BASE_URL}${endpoint}`;
      const response = await fetch(url, { method: 'DELETE' });
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`API Error: ${endpoint}`, error);
      throw error;
    }
  },
};
