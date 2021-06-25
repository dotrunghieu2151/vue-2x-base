<template>
  <div
    class="flex-row"
    @mouseenter="() => (showDelete = true)"
    @touchstart="() => (showDelete = true)"
    @touchend="() => setTimeout(() => (showDelete = false), 1000)"
    @mouseleave="() => (showDelete = false)"
  >
    <CheckboxStatus :id="task.id" :status="task.status" />
    <div>
      <span :class="task.status ? 'text-decoration' : ''">{{ task.name }}</span>
    </div>
    <div class="delete-btn">
      <DeleteBtn :id="task.id" :showDelete="showDelete" />
    </div>
  </div>
</template>

<script>
import DeleteBtn from "@/components/tasks/DeleteBtn";
import CheckboxStatus from "@/components/tasks/CheckboxStatus";

export default {
  name: "TaskElem",
  components: {
    DeleteBtn,
    CheckboxStatus,
  },
  props: {
    task: {
      type: Object,
    },
  },
  data: () => ({
    showDelete: false,
  }),
};
</script>

<style>
</style>