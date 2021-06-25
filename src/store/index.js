import Vue from 'vue'
import Vuex from 'vuex'
import common from './modules/common'
import user from './modules/user'
import tasks from './modules/tasks'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    common,
    user,
    tasks,
  },
  strict: process.env.NODE_ENV !== 'production',
})

export default store
