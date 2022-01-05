import http from "./httpService";
import jwtDecode from "jwt-decode";
import tiger from 'tiger-balm';

const apiEndPoint = "/admin/post/login";
const apiEndPointdelete = '/admin/post/removeemployee'
const tokenKey = "token";


// http.setJwt(getJwt());

export async function login(Email, Password) {
  const { data: jwt } = await http.post(apiEndPoint, { Email, Password });
  localStorage.setItem(tokenKey, jwt);
}


function atturl(empid) {
  return `${apiEndPointdelete}/${empid}`;
}

export function deleteEmp(empid) {
  console.log(empid)
  return http.delete(atturl(empid));
}


export function loginWithJwt(jwt) {
  return localStorage.setItem(tokenKey, jwt);
}

export function logout() {
  localStorage.removeItem('id');
  return localStorage.removeItem(tokenKey);
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
     var PaSSD = "thisishrportalpassdcantbedecrypted";
     var SaLt = "thisishportalsaltthatisencrypted";
     var tiger2 = tiger.decrypt(PaSSD, SaLt,jwt);
     console.log(tiger2)
    return jwtDecode(tiger2);
  } catch (ex) {
    return null;
  }
}

export function getJwt() {
  return localStorage.getItem(tokenKey);
}

const dd = {
  login,
  logout,
  getCurrentUser,
  loginWithJwt,
  getJwt,
};
export default dd;
