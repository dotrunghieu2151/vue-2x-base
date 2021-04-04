import Vue from 'vue';
import localStoragePlugin from './local-storage';
import globalEventBus from './global-event-bus';
import './vee-validate';
import './vue-debounce';

Vue.use(localStoragePlugin, {
  cacheVersion: '1.0'
});

Vue.use(globalEventBus);

