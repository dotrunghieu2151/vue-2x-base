import { BaseModuleBuilder } from '../base';


const defaultState = () => ({
  loading: 0,
  message: null,
  errorObj: {
    error: null,
    response: {}
  },
});

const getters = {
  isLoading: (state) => state.loading > 0,
  error: state => state.errorObj,
  message: state => state.message,
}

const actions = {
}

const mutations = {
  decreaseLoading(state) {
    if (state.loading > 0) {
      state.loading--;
    }
  },
  setLoading(state) {
    state.loading++;
  },
  clearLoading(state) {
    state.loading = defaultState().loading
  },
  clearMessage(state) {
    state.message = defaultState().message
  },
  clearError(state) {
    state.errorObj = defaultState().errorObj;
  },
}

const module = BaseModuleBuilder.buildModule({
  state: defaultState,
  getters,
  actions,
  mutations
})

export const { commonGetters, commonMutations, commonActions } = BaseModuleBuilder.buildComputedNameMaps('common');

export default module;

