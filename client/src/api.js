const baseUrl = import.meta.env.VITE_API_BASE_URL;

const apiFetch = async (path, options = {}) => {
  try {
    const response = await fetch(`${baseUrl}${path}`, options);
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      throw new TypeError('Response not JSON');
    }

    return response.json();
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
};

export default apiFetch;
