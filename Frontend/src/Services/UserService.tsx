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

const sendOTP = async (email: string) => {
    return await axios.post(`${BASE_URL}/sendOtp/${email}`)
        .then(res => res.data)
        .catch(error => { throw error; });
}

const verifyOTP = async (email: string, otp: string) => {
    return await axios.get(`${BASE_URL}/verifyOtp/${email}/${otp}`)
        .then(res => res.data)
        .catch(error => { throw error; });
}

const resetPassword = async (email: string, password: string) => {
    return await axios.post(`${BASE_URL}/resetPassword`, { email, password })
        .then(res => res.data)
        .catch(error => { throw error; });
}

const changePassword = async (email: string, oldPassword: string, newPassword: string) => {
    return await axios.put(`${BASE_URL}/changePassword`, { email, oldPassword, newPassword })
        .then(res => res.data)
        .catch(error => { throw error; });
}
export { loginUser, registerUser, sendOTP, verifyOTP, resetPassword, changePassword };