import { userService } from "@/services";
import { BaseModuleBuilder } from "../base";

const checkToken = (token) => {
  let valid = false;
  if (token) {
    let ary = token.trim().split(".");
    let json = JSON.parse(window.atob(ary[1]));
    let now = new Date();
    if (Math.floor(now.getTime() / 1000) <= json.exp) {
      valid = true;
    }
  }
  return valid;
}

const defaultState = () => ({
  token: localStorage.getItem('token'),
  id: "",
  name: "",
  email: "",
  company: "",
  tel: "",
});

const getters = {
  token: state => state.token,
  isLoggedIn: (state, getters) => checkToken(getters.token),
  userInfo: ({ id, name, email, company, tel }) => ({
    id,
    name,
    email,
    company,
    tel
  }),
};

const mutations = {
  setDefault(state) {
    Object.assign(state, defaultState());
  },

  setToken(state, token) {
    state.token = token;
  },

  setUserInfo(state,
    {
      id,
      name,
      email,
      company,
      tel
    }
  ) {
    Object.assign(state, {
      id,
      name,
      email,
      company,
      tel
    })
  },
};

const actions = {
  async login({ commit }, { email, password }) {
    const { token, ...userInfo } = await userService.login({ email, password });
    commit("setToken", token);
    commit("setUserInfo", userInfo);
    localStorage.setItem('token', token);
  },
  async logout({ commit }) {
    localStorage.removeItem('token');
    commit("setDefault");
  },
};

const module = BaseModuleBuilder.buildModule({
  state: defaultState,
  getters,
  actions,
  mutations
})

export const { userGetters, userMutations, userActions } = BaseModuleBuilder.buildComputedNameMaps('user');

export default module;