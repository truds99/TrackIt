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

export { postLogin, postSignup };