import axios from './axios-config'

const api = {
  reqRegister: params => axios.post(`/register`, params),
  reqLogin: params => axios.post(`/login`, params),
  reqLogout: userId => axios.get(`/logout`, userId),
  reqGetLessonList: () => axios.get(`/getLessonList`),
  reqGetInfoList: () => axios.get(`/getInfoList`),
  reqGetTopicList: type => axios.get(`/getTopicList`, type),
  reqPostTopic: (uid, params) => axios.post(`/user/${uid}/postTopic`, params),
  reqGetFileList: () => axios.get(`/getFileList`),
  reqDownload: (uid, fid) => window.open(`http://localhost:8081/api/user/${uid}/file/${fid}`)
};

export default api
