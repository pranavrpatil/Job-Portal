import axios from "axios";

const API_URL = process.env.REACT_APP_BASE_URL;
const BASE_URL = `${API_URL}/profile`;


const getProfile = async (id: number) => {
    return await axios.get(`${BASE_URL}/${id}`)
        .then(res => res.data)
        .catch(error => { throw error; });
}

const updateProfile = async (profile: any) => {
    console.log("Payload send to be", profile);
    return await axios.put(`${BASE_URL}/updateProfile`, profile)
        .then(res => res.data)
        .catch(error => { throw error; })

}

export { getProfile, updateProfile };