import axios from 'axios';

// const baseDomain = "http://127.0.0.1:8000";
const baseDomain = "https://bbcd856a2ec5.ngrok.io";

const baseURL = `${baseDomain}/api`;

const httpRequest = {
    get(link) {
        return axios.get(baseURL + link);
    },
    post(link, params) {
        return axios.post(baseURL + link, params);
    },
    getAuthen(link) {
        let token = localStorage.getItem('token');
        let headers = { Authorization: `Bearer ${token}` };
        return axios.get(baseURL + link, { headers });
    },
}

export default httpRequest;