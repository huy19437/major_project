import axios from 'axios';

const baseDomain = "https://12b3f470cd80.ngrok.io";
const baseURL = `${baseDomain}/api/v1`;
const token = localStorage.getItem('token');
const headers = {
    headers: {
        Authorization: 'Bearer ' + token,
    }
};


const instance = axios.create({
    baseURL: baseURL,
    headers: { 'Authorization': 'Bearer ' + token }
});
const httpRequest = {
    get(link, params) {
        return instance.get(link, params, headers);
    },
    post(link, params) {
        return instance.post(link, params, headers);
    },
    delete(link, params) {
        return instance.delete(link, params, headers);
    },
    put(link, params) {
        return instance.put(link, params, headers);
    },
    patch(link, params) {
        return instance.patch(link, params, headers);
    },
}

export default httpRequest;