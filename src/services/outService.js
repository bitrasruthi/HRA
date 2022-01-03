import http from './httpService';



const apiEndPoint = 'http://cghrportal.herokuapp.com/api/employee/post/outTime';


export function checkOut(user) {
    return http.post(apiEndPoint, {outTime: user});
  }


  export function getUsers() {
    return http.get(apiEndPoint);
   }