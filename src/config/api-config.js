import axios from './axios-config'

const api = {
  reqRegister: params => axios.post(`/register`, params),
  reqLogin: params => axios.post(`/login`, params),
  reqLogout: userId => axios.get(`/logout`, userId),
  reqGetUserList: () => axios.get(`admin/getUserList`),
  reqCreateUser: params => axios.put(`/admin/createUser`, params),
  reqUpdateUser: (uid, params) => axios.patch(`/admin/updateUserInfo/${uid}`, params),
  reqDeleteUser: uid => axios.delete(`/admin/deleteUser/${uid}`),
  reqGetLessonList: () => axios.get(`/getLessonList`),
  reqGetInfoList: () => axios.get(`/getInfoList`),
  reqPostInfo: params => axios.post(`/admin/postInfo`, params),
  reqUpdateInfo: (id, params) => axios.patch(`/admin/updateInfo/${id}`, params),
  reqDeleteInfo: (id, params) => axios.delete(`/admin/deleteInfo/${id}`),
  reqGetTopicList: type => axios.get(`/getTopicList`, type),
  reqPostTopic: params => axios.post(`/admin/postTopic`, params),
  //reqPostTopicList: params => axios.post(`/admin/postTopicList`, params),
  reqUpdateTopic: (id, params) => axios.patch(`/admin/updateTopic/${id}`, params),
  reqDeleteTopic: (id, params) => axios.delete(`/admin/deleteTopic/${id}`),
  reqGetDocList: () => axios.get(`/getDocList`),
  reqUploadFiles: params => axios.post(`/admin/uploadFiles`, params),
  reqUserPostTopic: (uid, params) => axios.post(`/user/${uid}/postTopic`, params),
  reqDownload: (uid, fid) => window.open(`http://localhost:8081/api/user/${uid}/file/${fid}`)
};

export default api
