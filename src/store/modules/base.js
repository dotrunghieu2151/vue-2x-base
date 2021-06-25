import { capitalize } from "@/libs/helpers";
import { mapActions, mapGetters, mapMutations } from "vuex";
import { isFunction } from "@/libs/helpers";

export const BaseModuleBuilder = {
  buildModule(base) {
    const module = Object.assign({}, base);
    module.state = isFunction(module.state) ? module.state() : module.state;
    module.namespaced = true;
    module.mutations = this.buildMutations(module.state, module.mutations);
    return module;
  },

  buildComputedNameMaps(namespace) {
    return {
      [`${namespace}Getters`]: this.buildComputedNameMap(
        namespace,
        mapGetters
      ),
      [`${namespace}Mutations`]: this.buildComputedNameMap(
        namespace,
        mapMutations
      ),
      [`${namespace}Actions`]: this.buildComputedNameMap(
        namespace,
        mapActions
      ),
    }
  },

  buildComputedNameMap(namespace, mapper) {
    return (componentNameMap) => mapper(namespace, componentNameMap)
  },

  buildMutations(state = {}, addOns = {}) {
    const mutations = {};
    Object.keys(state).forEach(key => {
      const name = capitalize(key);
      mutations[`set${name}`] = (state, data) => {
        state[key] = data;
      };

      if (Array.isArray(state[key])) {
        mutations[`push${name}`] = (state, data) => {
          data = Array.isArray(data) ? data : [data];
          state[key] = [...state[key], ...data];
        };

        mutations[`append${name}`] = (state, data) => {
          data = Array.isArray(data) ? data : [data];
          state[key] = [...data, ...state[key]];
        };

        mutations[`remove${name}`] = (state, id) => {
          state[key] = state[key].filter(e => e.id !== id);
        };

        mutations[`update${name}`] = (state, { id, ...updateData }) => {
          state[key] = state[key].map(e => e.id === id ? { ...e, ...updateData } : e);
        };
      }
    });
    return Object.assign(mutations, addOns);
  }
};
