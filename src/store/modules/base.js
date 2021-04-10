import { isObject, arrayToObject, capitalize } from "@/utils/helpers";
import { mapActions, mapGetters, mapMutations } from "vuex";

// store/modules/base.js
const buildMutations = (state = {}, addOns = {}) => {
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
};

export const BaseModuleBuilder = {
  buildModule(base, namespace) {
    const module = Object.assign({}, base);
    module.namespaced = true;
    module.mutations = buildMutations(base.state, base.mutations);
    return {
      module,
      computedNames: this.buildComputedNameMaps(module, namespace),
      names: this.buildNames(module),
    }
  },

  buildNames(module) {
    return {
      getters: arrayToObject(
        Object.keys(module.getters),
        (current) => ({ [current]: current })
      ),
      mutations: arrayToObject(
        Object.keys(module.mutations),
        (current) => ({ [current]: current })
      ),
      actions: arrayToObject(
        Object.keys(module.actions),
        (current) => ({ [current]: current })
      ),
    }
  },

  buildComputedNameMaps(module, namespace) {
    return {
      [`${namespace}MapGetters`]: this.buildComputedNameMap(
        namespace,
        Object.keys(module.getters),
        mapGetters
      ),
      [`${namespace}MapMutations`]: this.buildComputedNameMap(
        namespace,
        Object.keys(module.mutations),
        mapMutations
      ),
      [`${namespace}MapActions`]: this.buildComputedNameMap(
        namespace,
        Object.keys(module.actions),
        mapActions
      ),
    }
  },

  buildComputedNameMap(namespace, moduleNameMap, mapper) {
    return (componentNameMap = {}) => {
      // convert componentNameMap to an object if is Array
      if (Array.isArray(componentNameMap)) {
        componentNameMap = arrayToObject(
          componentNameMap,
          (current) => ({
            [current]: current
          })
        );
      }
      let nameMap = null;
      if (Array.isArray(moduleNameMap)) {
        nameMap = arrayToObject(
          moduleNameMap,
          (current) => (componentNameMap?.[current] ?
            {
              [componentNameMap[current]]: current
            } : {}
          )
        )
      } else if (isObject(moduleNameMap)) {
        nameMap = arrayToObject(
          Object.entries(moduleNameMap),
          (current) => {
            const [mappedName, moduleName] = current;
            return componentNameMap?.[mappedName] ?
              {
                [componentNameMap[mappedName]]: moduleName
              } : {}
          }
        )
      } else {
        throw new Error("moduleGetterNameMap must be array or object");
      }
      return {
        ...mapper(namespace, nameMap)
      }
    }
  },
};
