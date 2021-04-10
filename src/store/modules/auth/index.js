import { BaseModuleBuilder } from '../base'

const state = {
  currentUser: null,
  accessToken: null,
  refreshToken: null,
  refreshTokenPromise: null  // Holds the promise of the refresh token
}

const getters = {
}

const actions = {
  refreshToken({ commit, state }) {
    // // If this is the first time the refreshToken has been called, make a request
    // // otherwise return the same promise to the caller
    // if (!state.refreshTokenPromise) {
    //   const p = UserService.refreshToken()
    //   commit('refreshTokenPromise', p)

    //   // Wait for the UserService.refreshToken() to resolve. On success set the token and clear promise
    //   // Clear the promise on error as well.
    //   p.then(
    //     response => {
    //       commit('refreshTokenPromise', null)
    //       commit('loginSuccess', response)
    //     },
    //     error => {
    //       commit('refreshTokenPromise', null)
    //     }
    //   )
    // }

    // return state.refreshTokenPromise
  }
}

const mutations = {
  refreshTokenPromise(state, promise) {
    state.refreshTokenPromise = promise
  }
}

const { module, computedNames, names } = BaseModuleBuilder.buildModule({
  state,
  actions,
  mutations,
  getters
})
export default module

export const authComputed = computedNames;
export const authNames = names;