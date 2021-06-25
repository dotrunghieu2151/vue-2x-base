<template>
  <div>
    <div class="header-content">
      <LogoutButton />
      <div>
        <input
          id="outlined-basic"
          outlined
          @input="handleChangeInput"
          v-model="taskName"
          class="input-name"
          type="text"
        />
        <v-btn
          @click="onCreatedTask"
          class="btn-add"
          :disabled="disabledButton"
        >
          追加
        </v-btn>
      </div>
    </div>
    <div class="body-content">
      <div v-if="getTaskLoading" class="loadding">
        <div class="loader"></div>
      </div>
      <div v-if="error">Error ....</div>
      <ListTask v-if="tasks" :tasks="tasks" />
      <v-btn
        v-if="areMoreTasks"
        @click="onLoadMoreTask"
        :disabled="getTaskLoading"
        class="load-more-btn mt-5"
      >
        Show more
      </v-btn>
    </div>
  </div>
</template>

<script>
import { tasksGetters, tasksActions } from "@/store/modules/tasks";
import ListTask from "@/components/tasks/ListTask";
import LogoutButton from "@/components/tasks/LogoutButton";

export default {
  name: "TaskContainer",
  components: {
    ListTask,
    LogoutButton,
  },
  data: () => ({
    disabledButton: true,
    taskName: "",
    getTaskLoading: false,
    error: null,
  }),
  computed: {
    ...tasksGetters(["tasks", "taskMeta"]),
    areMoreTasks() {
      return this.tasks && this.taskMeta.currentPage < this.taskMeta.totalPages;
    },
  },
  methods: {
    ...tasksActions(["createTask", "loadMoreTasks"]),
    handleChangeInput() {
      this.disabledButton = this.taskName.trim() ? false : true;
    },
    async onCreatedTask() {
      this.disabledButton = true;
      await this.createTask({ name: this.taskName }).catch(
        (err) => (this.error = err)
      );
      this.taskName = "";
      this.disabledButton = false;
    },
    async onLoadMoreTask() {
      this.getTaskLoading = true;
      await this.loadMoreTasks().catch((err) => (this.err = err));
      this.getTaskLoading = false;
    },
  },
};
</script>

<style lang="scss">
@import "@/assets/scss/pages/task";
</style>