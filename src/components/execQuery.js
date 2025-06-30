export async function execQuery(searchUrl) {
  try {
    const response = await fetch(searchUrl , { 
      method: 'GET',
      headers: {
        'Authorization': import.meta.env.VITE_API_KEY,
      }
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    if (data && data.articles && Array.isArray(data.articles)) {
      return data.articles;
    } else {
      console.warn("News API response did not contain expected track data structure.");
      throw new Error(data.message || "News API returned an unexpected response structure or status.");
    }
  } catch (err) {
    console.error('Error quering News API:', err);
    throw new Error(err.message || 'An unknown network error occurred.');
  }

}
