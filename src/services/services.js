import axios from 'axios'
const URL = 'https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit'

function postLogin(body) {
    const promise = axios.post(`${URL}/auth/login`, body);
    return promise;
}

function postSignup(body) {
    const promise = axios.post(`${URL}/auth/sign-up`, body);
    return promise;
}

function getHabits(token) {
    const headers = {
        Authorization: `Bearer ${token}`
    };
    const promise = axios.get(`${URL}/habits`, { headers });
    return promise;
}

function deleteRequest(token, id) {
    const headers = {
        Authorization: `Bearer ${token}`
    };
    const promise = axios.delete(`${URL}/habits/${id}`, { headers });
    return promise;
}

function postHabit(token, body) {
    const headers = {
        Authorization: `Bearer ${token}`
    };
    const promise = axios.post(`${URL}/habits`, {headers, body});
    return promise;
}

export { postLogin, postSignup, getHabits, deleteRequest, postHabit };