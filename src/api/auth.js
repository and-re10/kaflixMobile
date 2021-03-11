import axios from 'axios'
// https://api-sound-app.herokuapp.com/api/auth/
const authApi = axios.create({
    baseURL: 'https://api-sound-app.herokuapp.com/api/auth/'
});

export default authApi;