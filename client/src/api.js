const baseUrl = import.meta.env.VITE_API_BASE_URL;

const apiFetch = async (path, options = {}) => {
  const response = await fetch(`${baseUrl}${path}`, options);
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  return response.json();
};

export default apiFetch;
