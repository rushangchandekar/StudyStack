const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

/**
 * Helper to make authenticated HTTP requests to the FastAPI backend.
 * Automatically injects the Authorization bearer token and handles errors.
 */
async function request(path, token, options = {}) {
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token || 'mock-user-token'}`,
    ...options.headers
  };
  
  // If sending FormData (file uploads), the browser needs to set the multi-part boundary header itself
  if (options.body instanceof FormData) {
    delete headers['Content-Type'];
  }

  try {
    const response = await fetch(`${API_URL}${path}`, {
      ...options,
      headers
    });

    if (!response.ok) {
      let errorDetail = `Error ${response.status}: Failed to perform API request`;
      try {
        const errorData = await response.json();
        errorDetail = errorData.detail || errorDetail;
      } catch (e) {
        // Response wasn't JSON
      }
      throw new Error(errorDetail);
    }

    return await response.json();
  } catch (error) {
    console.error(`API Error on path ${path}:`, error);
    throw error;
  }
}

export const api = {
  // Materials API
  getMaterials: (token) => request('/api/materials', token),
  createMaterial: (token, data) => request('/api/materials', token, {
    method: 'POST',
    body: JSON.stringify(data)
  }),
  updateMaterial: (token, id, data) => request(`/api/materials/${id}`, token, {
    method: 'PUT',
    body: JSON.stringify(data)
  }),
  deleteMaterial: (token, id) => request(`/api/materials/${id}`, token, {
    method: 'DELETE'
  }),

  // Subjects API
  getSubjects: (token) => request('/api/subjects', token),
  createSubject: (token, data) => request('/api/subjects', token, {
    method: 'POST',
    body: JSON.stringify(data)
  }),
  deleteSubject: (token, id) => request(`/api/subjects/${id}`, token, {
    method: 'DELETE'
  }),

  // Creators API
  getCreators: (token) => request('/api/creators', token),
  createCreator: (token, data) => request('/api/creators', token, {
    method: 'POST',
    body: JSON.stringify(data)
  }),
  deleteCreator: (token, id) => request(`/api/creators/${id}`, token, {
    method: 'DELETE'
  }),

  // File Upload API
  uploadFile: (token, file) => {
    const formData = new FormData();
    formData.append('file', file);
    return request('/api/upload', token, {
      method: 'POST',
      body: formData
    });
  },

  // To-Dos API
  getTodos: (token) => request('/api/todos', token),
  createTodo: (token, text) => request('/api/todos', token, {
    method: 'POST',
    body: JSON.stringify({ text })
  }),
  updateTodo: (token, id, is_completed) => request(`/api/todos/${id}`, token, {
    method: 'PUT',
    body: JSON.stringify({ is_completed })
  }),
  deleteTodo: (token, id) => request(`/api/todos/${id}`, token, {
    method: 'DELETE'
  }),

  // Monthly Targets API
  getMonthlyTargets: (token, month) => request(`/api/targets/${month}`, token),
  createMonthlyTarget: (token, month, text) => request('/api/targets', token, {
    method: 'POST',
    body: JSON.stringify({ month, text })
  }),
  updateMonthlyTarget: (token, id, is_completed) => request(`/api/targets/${id}`, token, {
    method: 'PUT',
    body: JSON.stringify({ is_completed })
  }),
  deleteMonthlyTarget: (token, id) => request(`/api/targets/${id}`, token, {
    method: 'DELETE'
  })
};
