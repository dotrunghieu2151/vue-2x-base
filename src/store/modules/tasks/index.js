import { taskService } from "../../../services";
import { BaseModuleBuilder } from "../base";

const defaultState = () => ({
  items: [],
  meta: {
    itemCount: 0,
    totalItems: 0,
    itemsPerPage: 0,
    totalPages: 0,
    currentPage: 0
  },
});

const defaultQueryOptions = {
  paginate: {
    limit: 10,
    page: 1
  },
  filter: {
    deleteflg: 0
  }
}

const getters = {
  tasks: state => state.items,
  taskMeta: state => state.meta,
};

const mutations = {
  setDefault(state) {
    Object.assign(state, defaultState);
  },
  // check "../base.js" for base mutation methods;
};

const actions = {
  async loadMoreTasks({ state, commit }, { paginate, filter } = defaultQueryOptions) {
    const excludeIds = state.items.map(item => item.id);
    const queryOptions = {
      paginate,
      filter: {
        ...filter,
        id: {
          NOT_IN: excludeIds
        }
      }
    }
    const { items, meta } = await taskService.getTasks(queryOptions);
    commit("pushItems", items);
    commit("setMeta", meta);
  },
  async createTask({ commit }, { name }) {
    const task = await taskService.createTask({ name });
    commit("appendItems", task);
  },
  async updateTask({ commit }, { status, id }) {
    const task = await taskService.updateTask({ status, id });
    commit("updateItems", task);
  },
  async deleteTask({ commit }, id) {
    const success = await taskService.deleteTask(id);
    success && commit("removeItems", id);
  },
};

const module = BaseModuleBuilder.buildModule({
  state: defaultState,
  getters,
  actions,
  mutations
})

export const { tasksGetters, tasksMutations, tasksActions } = BaseModuleBuilder.buildComputedNameMaps('tasks');

export default module;