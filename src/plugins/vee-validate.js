import Vue from 'vue';
import {
  extend,
  ValidationObserver,
  ValidationProvider,
  localize
} from "vee-validate";
import * as rules from "vee-validate/dist/rules";
import ja from 'vee-validate/dist/locale/ja.json';
import langJa from '@/assets/lang/validation/ja.json';
import { isNotNullOrNumber } from '@/utils/helpers';
import * as customRules from "@/utils/rules";

// set default locale and install ja locale (if use more than 1 locale, import more lang and install)
localize('ja', ja);

// add custom validation message
localize({
  ja: langJa
})

// copy default rules from vee-validate
Object.keys(rules).forEach(rule => {
  extend(rule, {
    ...rules[rule], // copies rule configuration
  });
});

//custom rules
extend('num_hyphen', {
  validate: customRules.numHyphen
});
extend('tel', {
  validate: customRules.tel
});
extend('zen_kana', {
  validate: customRules.zenKana
});
extend('zen_katakana', {
  validate: customRules.zenKatakana
});
extend('zip_search', {
  params: ["history"],
  validate: (value, { history }) => value === history
});

extend('required_array', {
  validate(value) {
    const valid = customRules.required(value);
    return {
      required: true,
      valid: valid
    };
  },
  computesRequired: true
})

extend('lte', {
  params: ['target'],
  validate(value, { target }) {
    if (isNotNullOrNumber(value) && isNotNullOrNumber(target)) {
      return customRules.lte(value, target);
    }
    return true;
  },
})


extend('gte', {
  params: ['target'],
  validate(value, { target }) {
    if (isNotNullOrNumber(value) && isNotNullOrNumber(target)) {
      return customRules.gte(value, target);
    }
    return true;
  },
})

// custom validation modes
export const passiveWhenValid = ({ errors }) => {
  if (errors.length) {
    return {
      on: ['input', 'change']
    };
  }
  return {
    on: []
  };
}

Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);