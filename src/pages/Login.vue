<template>
  <v-container>
    <v-row class="mt-12" align="center" justify="center">
      <v-card class="px-4">
        <v-card-text>
          <v-form ref="loginForm" v-model="valid" lazy-validation>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="email"
                  :rules="[rules.required, rules.email]"
                  label="E-mail"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="password"
                  :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
                  :rules="[rules.required]"
                  :type="showPass ? 'text' : 'password'"
                  name="input-10-1"
                  label="Password"
                  @click:append="showPass = !showPass"
                ></v-text-field>
              </v-col>
              <v-col class="d-flex" cols="12" sm="6" xsm="12"> </v-col>
              <v-spacer></v-spacer>
              <v-col class="d-flex" cols="12" sm="3" xsm="12" align-end>
                <v-btn
                  x-large
                  block
                  :disabled="!valid"
                  color="success"
                  @click="submit"
                >
                  Login
                </v-btn>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
import { userActions } from "@/store/modules/user";

export default {
  name: "Login",
  methods: {
    ...userActions(["login"]),
    async submit() {
      if (this.$refs.loginForm.validate()) {
        const { email, password } = this;
        await this.login({ email, password });
        this.$router.push({ name: this.redirect });
      }
    },
  },
  props: {
    redirect: {
      type: String,
      default: "home",
    },
  },
  data: () => ({
    valid: true,
    email: "",
    password: "",
    showPass: false,
    rules: {
      required: (value) => !!value || "Required.",
      email: (value) => /.+@.+\..+/.test(value) || "E-mail must be valid",
    },
  }),
};
</script>