import { immutable } from "@/libs/helpers";

export default ({ http }) => immutable({
  get(url, config = {}) {
    return http.get(url, config);
  },

  post(url, data, config = {}) {
    return http.post(url, data, config)
  },

  delete(url, data, config = {}) {
    return http.delete(url, data, config)
  },

  put(url, data, config = {}) {
    return http.put(url, data, config)
  },

  patch(url, data, config = {}) {
    return http.patch(url, data, config)
  },

  custom(config) {
    return http.request(config);
  }
})