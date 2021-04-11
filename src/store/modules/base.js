import { capitalize } from "@/utils/helpers";
import { mapActions, mapGetters, mapMutations } from "vuex";

export const BaseModuleBuilder = {
  buildModule(base) {
    const module = Object.assign({}, base);
    module.namespaced = true;
    module.mutations = this.buildMutations(base.state, base.mutations);
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
          state[key].push(data);
        };

        mutations[`remove${name}`] = (state, id) => {
          const index = state[key].find(i => i.id == id);
          state[key].splice(index, 1);
        };
      }
    });
    return Object.assign(mutations, addOns);
  }
};
