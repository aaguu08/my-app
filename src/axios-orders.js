import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://myapp-4397a.firebaseio.com/'
});

export default instance;