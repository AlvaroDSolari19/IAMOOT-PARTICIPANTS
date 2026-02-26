import axios from 'axios'; 

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL
})

/* Automatically attaches JWT to every outgoing API request.
 * If a token exists in localStorage, it is sent as Authorization: Bearer <token>. */
api.interceptors.request.use( (requestConfig) => {
    const storedToken = localStorage.getItem('writtenTeamToken'); 
    if (storedToken) requestConfig.headers.Authorization = `Bearer ${storedToken}`; 
    return requestConfig; 
});

export default api; 