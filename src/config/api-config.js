import axios from './axios-config'

const api = {
  reqRegister : params => axios.post(`/user/register`,params),
  reqLogin : params => axios.post(`/user/login`,params),
};

export default api
