import http from "./httpService";
import jwtDecode from "jwt-decode";
import { apiUrl } from "../config.json";

const apiEndpoint = `${apiUrl}/auth`;
const tokenKey = "token";

http.setJwt(getJwt());

async function login(email, password) {
    const { data: jwt } = await http.post(apiEndpoint, { email, password });
    localStorage.setItem(tokenKey, jwt);
}

function loginWithJwt(jwt) {
    localStorage.setItem(tokenKey, jwt);
}

function logout() {
    localStorage.removeItem(tokenKey);
}

function getCurrentUser() {
    try {
        const jwt = localStorage.getItem(tokenKey);
        return jwtDecode(jwt);
    } catch (e) {
        return null;
    }
}

function getJwt() {
    return localStorage.getItem(tokenKey);
}

const auth = {
    login,
    loginWithJwt,
    logout,
    getCurrentUser,
    getJwt,
};

export default auth;
