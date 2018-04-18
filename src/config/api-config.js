import axios from './axios-config'

const api = {
  reqRegister: params => axios.post(`/register`, params),
  reqLogin: params => axios.post(`/login`, params),
  reqLogout: userId => axios.get(`/logout`, userId),
  reqGetUserList: () => axios.get(`admin/getUserList`),
  reqCreateUser: params => axios.put(`/admin/createUser`, params),
  reqUpdateUser: (uid, params) => axios.patch(`/admin/updateUserInfo/${uid}`, params),
  reqGetLessonList: () => axios.get(`/getLessonList`),
  reqGetInfoList: () => axios.get(`/getInfoList`),
  reqGetTopicList: type => axios.get(`/getTopicList`, type),
  reqGetDocList: () => axios.get(`/getDocList`),
  reqPostTopic: (uid, params) => axios.post(`/user/${uid}/postTopic`, params),
  reqDownload: (uid, fid) => window.open(`http://localhost:8081/api/user/${uid}/file/${fid}`)
};

export default api
