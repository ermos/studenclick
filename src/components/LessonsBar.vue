<template>
  <div class="lessons-bar">
    <v-tooltip
        v-for="lessonType in lessonsType"
        v-bind:key="lessonType.id"
        position="right"
        :message="lessonType.name"
        className="lessons-bar__tooltip"
        class="lessons-bar__item"
        :style="'background-color:' + lessonType.color"
    >
      <i :class="'icon-' + lessonType.icon"></i>
    </v-tooltip>
  </div>
</template>

<script>
export default {
  name: "LessonsBar",
  data () {
    return {
      lessonsType : [
        {
          id: 1,
          icon: "calculator",
          color: "#71bf78",
          name: "Mathématique",
        },
        {
          id: 2,
          icon: "keyboard",
          color: "#e59950",
          name: "Chimie",
        },
        {
          id: 3,
          icon: "music",
          color: "#ae71f1",
          name: "Musique",
        },
      ],
    }
  },
}
</script>

<style>
.lessons-bar {
  position: relative;
  width: 80px;
  height: calc(100vh - var(--title-bar-size));
  background-color: var(--main-color-dark-3);
  overflow-x: hidden;
  overflow-y: scroll;
  overflow: -moz-scrollbars-none;
  -ms-overflow-style: none;
}

.lessons-bar::-webkit-scrollbar {
  width: 0 !important;
}

.lessons-bar__item {
  width: 60px;
  height: 60px;
  background-color: var(--main-color-dark-1);
  border-radius: 50%;
  margin:10px auto 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-color-light-1);
  cursor: pointer;
}

.lessons-bar__tooltip {
  margin-top: -18px;
  margin-left: 20px;
  padding: 10px;
  background: var(--main-color-dark-3);
  color: var(--text-color-light-1);
  border-radius: 5px;
}
</style>