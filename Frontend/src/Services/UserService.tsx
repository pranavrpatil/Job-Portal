import axios from "axios";

const API_URL = process.env.REACT_APP_BASE_URL;
const BASE_URL = `${API_URL}/users`;

const registerUser = async (user: any) => {
    return await axios.post(`${BASE_URL}/registerUser`, user)
        .then(res => res.data)
        .catch(error => { throw error; });
}

const loginUser = async (login: any) => {
    return await axios.post(`${BASE_URL}/loginUser`, login)
        .then(res => res.data)
        .catch(error => { throw error; });
}

export { loginUser, registerUser };