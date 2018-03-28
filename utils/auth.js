import Cookies from 'js-cookie'

const accessToken = 'accessToken';

export function getToken() {
  return Cookies.get(accessToken)
}

export function setToken(token) {
  return Cookies.set(accessToken, token)
}

export function removeToken() {
  return Cookies.remove(accessToken)
}
