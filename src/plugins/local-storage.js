import { compareDates, compareVersion } from "@/utils/helpers";
import moment from "moment";

let pluginOptions = {
  expireKey: "_expiresAt",
  versionKey: "_version",
  cacheVersion: null,
}

export const localStorage = {
  get(key, defaultVal = null) {
    const item = window.localStorage.getItem(key);
    if (!item) return defaultVal;
    if (this.isCacheOutdated(key)) {
      this.delete(key);
      return defaultVal;
    }
    return JSON.parse(window.localStorage.getItem(key));
  },

  set(key, val, metaData = {}) {
    const { expiresAt = null, version = pluginOptions.cacheVersion } = metaData;
    expiresAt && this.setExpireAt(key, expiresAt);
    this.setVersion(key, version);
    window.localStorage.setItem(key, JSON.stringify(val));
  },

  setExpireAt(key, date) {
    const storeDate = moment.isMoment(date) ? date.valueOf() : date;
    window.localStorage.setItem(`${key}${pluginOptions.expireKey}`, storeDate);
  },

  setVersion(key, version) {
    window.localStorage.setItem(`${key}${pluginOptions.versionKey}`, version);
  },

  delete(key) {
    window.localStorage.removeItem(key);
    window.localStorage.removeItem(`${key}${pluginOptions.expireKey}`);
    window.localStorage.removeItem(`${key}${pluginOptions.versionKey}`);
  },

  isCacheOutdated(key) {
    return this.hasExpired(key) || this.isVersionOutdated(key);
  },

  hasExpired(key) {
    const expiresAt = window.localStorage.getItem(`${key}${pluginOptions.expireKey}`);
    if (!expiresAt) return false; // if expireAt is not set, assume always valid
    return compareDates(moment(), '>=', expiresAt);
  },

  isVersionOutdated(key) {
    const version = window.localStorage.getItem(`${key}${pluginOptions.versionKey}`);
    if (!version) return true; // if object has no version, assume it is outdated
    return compareVersion(pluginOptions.cacheVersion, version) > 0;
  }
}

export default {
  // called by Vue.use(LocalStorage)
  install(Vue, options) {
    pluginOptions = { ...pluginOptions, ...options };
    Vue.prototype.$localStorage = localStorage;
  }
}