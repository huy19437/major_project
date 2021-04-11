import axios from 'axios';

// const baseDomain = "http://127.0.0.1:8000";
const baseDomain = "https://4596832d00c6.ngrok.io";

const baseURL = `${baseDomain}/api/v1`;
axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');


const httpRequest = {
    get(link, params) {
        let token = localStorage.getItem('token');
        let headers = { Authorization: `Bearer ${token}` };
        return axios.get(baseURL + link, params, { headers });
    },
    post(link, params) {
        let token = localStorage.getItem('token');
        let headers = { Authorization: `Bearer ${token}` };
        return axios.post(baseURL + link, params, { headers });
    },
    delete(link, params) {
        let token = localStorage.getItem('token');
        let headers = { Authorization: `Bearer ${token}` };
        return axios.delete(baseURL + link, params, { headers });
    },
    put(link, params) {
        let token = localStorage.getItem('token');
        let headers = { Authorization: `Bearer ${token}` };
        return axios.put(baseURL + link, params, { headers });
    },
    patch(link, params) {
        let token = localStorage.getItem('token');
        let headers = { Authorization: `Bearer ${token}` };
        return axios.put(baseURL + link, params, { headers });
    },
    getAuthen(link) {
        let token = localStorage.getItem('token');
        let headers = { Authorization: `Bearer ${token}` };
        return axios.get(baseURL + link, { headers });
    },
}

export default httpRequest;