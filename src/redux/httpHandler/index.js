import axios from 'axios';
import { store } from '../../../store/store'


const fetchState = () => {
  return store.getState();
}

const state = fetchState();


const httpHandler = {
  get: (endpoint, headers) => {
    headers = headers || {};

    return axios.get(endpoint, headers)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error;
      })
  },
  post: (endpoint, body, headers) => {
    body = body || {};
    headers = headers || {};
    return axios.post(endpoint, body, headers)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error;
      })
  }
}

export default httpHandler;
