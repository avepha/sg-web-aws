import axios from 'axios'
export const baseURL = 'https://api.smartgrobot.com'
const instance = axios.create({
    baseURL
});
export default instance
