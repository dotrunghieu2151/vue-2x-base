import { BaseModuleBuilder } from '../base';

const state = {
  loading: 0,
  message: null,
  error: null,
}

const getters = {
  isLoading(state) {
    return state.loading > 0
  },
  error(state) {
    return state.error
  },
  message(state) {
    return state.message
  }
}

const actions = {
}

const mutations = {
  decreaseLoading(state) {
    if (state.loading > 0) {
      state.loading--
    }
  },
  clearLoading(state) {
    state.loading = 0
  },
  clearMessage(state) {
    state.message = null
  },
  clearError(state) {
    state.error = null
  }
}

const { module, computedNames, names } = BaseModuleBuilder.buildModule({
  state,
  getters,
  actions,
  mutations
})

export default module

export const commonComputed = computedNames;
export const commonNames = names;

