import axios from './axios-config'

const api = {
  reqRegister : params => axios.post(`/user/register`,params),
  reqLogin : params => axios.post(`/user/login`,params),
  reqGetTopicList: type => axios.get(`/user/getTopicList`,type),
  reqPostTopic: params => axios.post(`/user/postTopic`,params),
};

export default api
