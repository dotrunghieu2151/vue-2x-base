<template>
  <div class="flex-body">
    <TaskElem v-for="task in tasks" :key="task.id" :task="task"></TaskElem>
  </div>
</template>

<script>
import TaskElem from "@/components/tasks/TaskElem";

export default {
  name: "ListTask",
  components: {
    TaskElem,
  },
  props: {
    tasks: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style>
</style>