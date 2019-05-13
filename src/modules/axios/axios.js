import axios from 'axios'
export const baseURL = 'https://qoocpkvxu7.execute-api.ap-southeast-1.amazonaws.com/'
const instance = axios.create({
    baseURL
});
export default instance
