import http from './httpService';



const apiEndPoint = 'http://cghrportal.herokuapp.com/api/employee/post/inTime';

function atturl(id) {
  return `${apiEndPoint}/${id}`;
}


export  async function checkIn(user) {
    const res =  await http.post(apiEndPoint, user);
    return res
    
  }


  export function getCheck(id) {
    return http.get(atturl(id));
   }