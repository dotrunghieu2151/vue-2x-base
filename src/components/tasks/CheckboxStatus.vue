<template>
  <div>
    <v-checkbox
      class="mt-n10"
      :ripple="false"
      :input-value="statusToBoolean"
      @click="onChangeStatus"
    />
  </div>
</template>

<script>
import { tasksActions } from "@/store/modules/tasks";

export default {
  name: "CheckboxStatus",
  props: {
    id: {
      type: String,
      required: true,
    },
    status: {
      type: Number,
      required: true,
    },
  },
  computed: {
    statusToBoolean() {
      return !!this.status;
    },
  },
  methods: {
    ...tasksActions(["updateTask"]),
    async onChangeStatus(e) {
      e.stopPropagation();
      const status = this.status ? 0 : 1;
      await this.updateTask({ id: this.id, status });
    },
  },
};
</script>

<style>
</style>