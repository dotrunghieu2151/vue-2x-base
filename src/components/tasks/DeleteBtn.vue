<template>
  <div v-if="showDelete">
    <v-btn class="delete-btn" color="error" @click="onRemoveTask">削除</v-btn>
  </div>
</template>

<script>
import { tasksActions } from "@/store/modules/tasks";

export default {
  name: "DeleteBtn",
  props: {
    id: {
      type: String,
      required: true,
    },
    showDelete: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    ...tasksActions(["deleteTask"]),
    async onRemoveTask() {
      await this.deleteTask(this.id);
    },
  },
};
</script>

<style>
</style>