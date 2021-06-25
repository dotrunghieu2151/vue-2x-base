import { immutable } from "@/libs/helpers";

export default ({ apiService }) => immutable({
  async getTasks({ paginate, filter }) {
    const { data: { items, meta } } = await apiService
      .post("/todo/list", { paginate, filter });
    return { items, meta };
  },

  async createTask({ name }) {
    const { data: task } = await apiService
      .post("/todo", { name, deleteflg: 0, status: 0 });
    return task;
  },

  async updateTask({ status, id }) {
    const { data: task } = await apiService
      .patch(`/todo/${id}`, { status });
    return task;
  },

  async deleteTask(id) {
    await apiService.delete(`/todo/${id}`);
    return true;
  },
});
