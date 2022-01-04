import axios from "axios";
import logger from "./logService";
import { toast } from "react-toastify";
import { logout} from '../services/authService'


axios.defaults.baseURL = process.env.REACT_APP_API_URL;

axios.interceptors.response.use(null, (error) => {
  
  const expectedError =
    error.response &&
    error.response.status <= 405 &&
    error.response.status < 500;
  
    const loginerro =
    error.response &&
    error.response.status === 401
   
     if(loginerro) { 
      logger.log(error);
      logout()
     toast.error("already Login in another device");
     }
    
   if (!expectedError) {
     console.log(!expectedError)
    logger.log(error);
    toast.error("An unexpected error occurrred.");
    
  }

  return Promise.reject(error);
});



export function setJwt(jwt) {
  axios.defaults.headers.common["x-auth-token"] = jwt;
}


// const getCSRFToken = async () => {
//   const response = await axios.get('/dummy');
//   axios.defaults.headers.post['X-CSRF-Token'] = response.data.CSRFToken;
// };


const ht = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  setJwt,
  // getCSRFToken,
};

export default ht;
