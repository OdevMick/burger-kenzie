import axios from 'axios';

const api = axios.create({
  baseURL:'https://burguer-kenzie-api.herokuapp.com/'
});
export default api;