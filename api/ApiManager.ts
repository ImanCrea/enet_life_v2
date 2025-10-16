import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {AUTH} from './apiAccessInfo'

// LOCAL CONFIG
//const AXIOS_BASEURL = 'http://192.168.1.4/api_enet_v1/index.php/api';

// PRODUCTION CONFIG
const AXIOS_BASEURL = 'https://apienetv1.enet.africa/index.php/api';

axios.defaults.headers.post['Content-Type'] = 'application/json';

export const getAuthToken = async () => {
  return await AsyncStorage.getItem('authToken');
};

export const setAuthToken = (token: string) => {
  AsyncStorage.setItem('authToken', token);
};

export const removeAuthToken = () => {
  AsyncStorage.removeItem('authToken');
};

export const getRequest = async (baseURL: string, url: string) => {
  const completeURL = baseURL === '' ? AXIOS_BASEURL + url : baseURL + url;
  let options = {
    auth: {
      username: AUTH.username,
      password: AUTH.password,
    },
  };
  const response = await axios.get(completeURL, options);
  return response.data;
};

export const postRequest = async (
  baseURL: any = AXIOS_BASEURL,
  url: any,
  data: any,
) => {
  const completeURL = baseURL === '' ? AXIOS_BASEURL + url : baseURL + url;
  const auth = {
    auth: {
      username: AUTH.username,
      password: AUTH.password,
    },
  };
  const response = await axios.post(completeURL, data, auth);
  return response.data;
};
