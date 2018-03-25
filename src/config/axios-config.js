import axios from 'axios'

//axios confing
axios.defaults.timeout = 5000;
axios.defaults.baseURL = 'http://localhost:8081/api';

//req res interceptors

axios.interceptors.request.use(config =>{
  const AUTH_TOKEN = sessionStorage.getItem('AUTH_TOKEN');
  if(AUTH_TOKEN){
    config.headers.AUTH_TOKEN = AUTH_TOKEN
  }
  return config
});

export default axios;

