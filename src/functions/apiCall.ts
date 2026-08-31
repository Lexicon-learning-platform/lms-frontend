  import globalValues from '../context/globalValues';

  /*
  Example use:
        await apiCall(`/v1/movies/`,  //API url
         { method: 'POST',            //The method to use
          body: JSON.stringify({      //Body data, if applicable
            title: title,
            genre: genre,
            year: year,
            duration: duration
          })
          });
  */
  
  const apiCall = async <T,>(endpoint: string, options: RequestInit = {}): Promise<T | null> => {
    
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      'credentials': 'include'
    };
    
    const response = await fetch(`${globalValues.URLstring}${endpoint}`, {
      ...options,
      headers: { ...headers, ...options.headers }
    });

    if (response.status === 401) {      // Unauthorized

      throw new Error('(${response.status})');
    }

    if (response.status === 403) {    // Forbidden  

      throw new Error('(${response.status})');
    }

        if (response.status === 404) {
      throw new Error(`${await response.text()}`);
    }
    if (!response.ok && response.status !== 204) {
      throw new Error(`Ett API-fel uppstod (${response.status})`);
    }

    return response.status === 204 ? null : await response.json();
  };

  export default apiCall