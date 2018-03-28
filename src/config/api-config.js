import axios from './axios-config'

const api = {
  reqRegister : params => axios.post(`/register`,params),
  reqLogin : params => axios.post(`/login`,params),
  reqGetInfoList: () => axios.get(`/user/getInfoList`),
  reqGetTopicList: type => axios.get(`/user/getTopicList`,type),
  reqPostTopic: params => axios.post(`/user/postTopic`,params),
};

export default api
