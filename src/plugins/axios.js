import axios from 'axios';
import store from '@/store'
import { apiConfig } from "@/config";

const handleError = (response, ignore = []) => {
  if (ignore.length > 0 && ignore.includes(response.status)) return response
  let error = null
  if (!navigator.onLine || !response) {
    error = new Error('no internet')
  } else {
    switch (response.status) {
      case 400:
        error = new Error(response.data.message)
        break;

      case 401:
        // store.dispatch(LOGOUT, response.status)
        error = new Error('unauthenticated')
        break;

      case 403:
        error = new Error('forbidden')
        break;

      case 404:
        error = new Error(response.data.message)
        break;

      case 422:
        if (`${response.config.baseUrl}${response.config.url}` === apiConfig.loginUrl) {
          error = new Error('login failed')
        }
        break;

      default:
        error = new Error('servere error')
        break;
    }
  }
  store.commit("common/setErrorObj", { error, response });
}

const setInterceptors = () => {
  axios.interceptors.request.use(
    (config) => {
      const accessToken = store.getters['user/token'];
      accessToken && (config.headers.common['Authorization'] = `Bearer ${accessToken}`);
      // config.setLoading && store.commit("common/setLoading")
      return config
    },
    (error) => {
      const { response } = error;
      // response.config.setLoading && store.commit("common/decreaseLoading")
      // Do something with request error
      return Promise.reject(response)
    }
  );

  axios.interceptors.response.use(
    (response) => {
      // const { config } = response;
      // config.setLoading && store.commit("common/decreaseLoading")
      return response
    },
    async (error) => {
      const { response, config } = error;
      // config.setLoading && store.commit("common/decreaseLoading")
      // refresh token
      // if (response && response.status === 401 && config.url !== 'auth/refresh') {
      //   await store.dispatch('auth/refreshToken');
      //   return this.customRequest(config);
      // }
      // check if config errorHandler is on
      config.globalErrorHandler.on && handleError(response, config.globalErrorHandler.exclude)
      return Promise.reject(response)
    }
  );
}


const setDefaultConfig = () => {
  axios.defaults.baseURL = apiConfig.endpoint;
  axios.defaults.headers["content-type"] = "application/json";
  axios.defaults.withCredentials = false;
  axios.defaults.setLoading = true;
  axios.defaults.globalErrorHandler = {
    on: true,
    exclude: [],
  };
};

setDefaultConfig();
setInterceptors();