<template>
  <aside class="lessons-list">

  </aside>
</template>

<script>
export default {
  name: "LessonsList"
}
</script>

<style>
.lessons-list {
  height: calc(100vh - var(--title-bar-size));
  overflow-x: hidden;
  overflow-y: auto;
  background-color: var(--main-color-dark-2);
  min-width: 150px;
  width: 30%;
  max-width: 300px;
}
</style>