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
    const config = {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }
    const promise = axios.get(`${URL}/habits`, config);
    return promise;
}

function deleteRequest(token, id) {
    const config = {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }
    const promise = axios.delete(`${URL}/habits/${id}`, config);
    return promise;
}

function postHabit(token, body) {
    const config = {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }
    const promise = axios.post(`${URL}/habits`, body, config);
    return promise;
}

export { postLogin, postSignup, getHabits, deleteRequest, postHabit };