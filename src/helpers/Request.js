import axios from 'axios';

let myAxios = axios.create({
  baseURL: "https://slvproject.herokuapp.com"
  // baseURL: "http://localhost:5000"
});

export default myAxios;