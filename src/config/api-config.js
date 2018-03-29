import axios from './axios-config'

const api = {
  reqRegister : params => axios.post(`/register`,params),
  reqLogin : params => axios.post(`/login`,params),
  reqLogout: userId => axios.get(`/logout`,userId),
  reqGetInfoList: () => axios.get(`/getInfoList`),
  reqGetTopicList: type => axios.get(`/getTopicList`,type),
  reqPostTopic: params => axios.post(`/user/postTopic`,params),
};

export default api
