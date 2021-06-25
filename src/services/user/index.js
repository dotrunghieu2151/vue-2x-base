import { immutable } from "@/libs/helpers";

export default ({ apiService }) => immutable({
  async login({ email, password }) {
    const result = await apiService.post("/auth/login", { email, password });
    return result.data;
  },

  // async logout() {
  //   await apiService.post("/auth/logout");
  //   return true;
  // },

  // async getUserInfo() {
  //   const result = await apiService.get("/user/userinfo");
  //   return result.data;
  // },
});
