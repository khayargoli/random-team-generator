const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

export const apiClient = {
  get: async (endpoint) => {
    const response = await fetch(`${API_BASE_URL}${endpoint}`);
    return handleResponse(response);
  },

  post: async (endpoint, data) => {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return handleResponse(response);
  },

  put: async (endpoint, data) => {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return handleResponse(response);
  },

  patch: async (endpoint, data) => {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return handleResponse(response);
  },

  delete: async (endpoint) => {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'DELETE',
    });
    return handleResponse(response);
  },
};

const handleResponse = async (response) => {
  if (!response.ok) {
    let errorMessage = `HTTP error! Status: ${response.status}`;

    try {
      const errorData = await response.json(); 
      if (errorData && errorData.error) {
        errorMessage = errorData.error;
      }
    } catch (e) {
      console.error("Failed to parse error response:", e);
    }

    throw new Error(errorMessage);
  }

  return response.json();
};
