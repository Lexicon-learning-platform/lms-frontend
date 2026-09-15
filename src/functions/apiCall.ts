import apiConfig from '../config/apiConfig.ts';

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

const apiCall = async <T, >(endpoint: string, options: RequestInit = {}): Promise<T | null> => {

    const response = await fetch(`${apiConfig.URLstring}${endpoint}`, {
        ...options,
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            ...options.headers
        }
    });


    if (response.status === 401) { // Unauthorized
        throw new Error(`${response.status}`);
    }


    if (response.status === 403) {  // Forbidden
        throw new Error(`${response.status}`);
    }


    if (response.status === 404) {
        throw new Error(`${await response.text()}`);
    }
    if (!response.ok && response.status !== 204) {
        let message = `Ett API-fel uppstod ${response.status}`;

        try {
            const body = await response.json();
            message = body?.detail ?? body?.title ?? message;
        } catch {
            // Response body wasn't JSON (or was empty) - keep the generic message.
        }

        throw new Error(message);
    }

    return response.status === 204 ? null : await response.json();
};

export default apiCall
