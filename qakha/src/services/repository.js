import axios from 'axios';

// const baseDomain = "http://127.0.0.1:8000";
const baseDomain = "https://007d61a0dd63.ngrok.io";

const baseURL = `${baseDomain}/api/v1`;
axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');


const httpRequest = {
    get(link) {
        let token = localStorage.getItem('token');
        let headers = { Authorization: `Bearer ${token}` };
        return axios.get(baseURL + link, { headers });
    },
    post(link, params) {
        let token = localStorage.getItem('token');
        let headers = { Authorization: `Bearer ${token}` };
        return axios.post(baseURL + link, params, { headers });
    },
    delete(link) {
        let token = localStorage.getItem('token');
        let headers = { Authorization: `Bearer ${token}` };
        return axios.delete(baseURL + link, { headers });
    },
    put(link, params) {
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