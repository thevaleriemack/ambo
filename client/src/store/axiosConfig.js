import axios from 'axios';

export default axios.create({
  baseURL: 'http://localhost:3001',
  headers: {'X-Requested-With': 'XMLHttpRequest'},
  timeout: 3000,
  withCredentials: false,
  responseType: 'json',
  maxRedirects: 0
});
