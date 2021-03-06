import axios from 'axios';

const baseDomain = "https://qakha-delivery.ngrok.io";
// const baseDomain = "https://0d319a3a76e5.ngrok.io";
const baseURL = `${baseDomain}/api/v1`;
const token = localStorage.getItem('token');
// const headers = {
//     headers: {
//         Authorization: 'Bearer ' + token,
//     }
// };

// console.log(localStorage.getItem('token'));
const instance = axios.create({
    baseURL: baseURL,
    headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') },
    // timeout: 1000 * 5
});

//one minute for waiting response
instance.defaults.timeout = 1000 * 60 * 1;
// console.log(instance.headers);

const httpRequest = {
    get(link, params) {
        return instance.get(link, params);
    },
    post(link, params) {
        return instance.post(link, params);
    },
    delete(link, params) {
        return instance.delete(link, params);
    },
    put(link, params) {
        return instance.put(link, params);
    },
    patch(link, params) {
        return instance.patch(link, params);
    },
}

export default httpRequest;