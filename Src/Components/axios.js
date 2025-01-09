import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://admin.nootans.com/provider/',
});

export default instance;
