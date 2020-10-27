<template>
  <div id="app">
    <title-bar/>
    <div id="body">
      <lessons-bar/>
      <lessons-list/>
      <editor class="main"/>
      <v-tooltip-wrapper/>
    </div>
  </div>
</template>

<script>
// import { remote } from 'electron'
export default {
  name: 'Home',
  components: {
    TitleBar: () => import(/* webpackChunkName: "default" */ '@/components/TitleBar'),
    LessonsBar: () => import(/* webpackChunkName: "default" */ '@/components/LessonsBar'),
    LessonsList: () => import(/* webpackChunkName: "default" */ '@/components/LessonsList'),
    VTooltipWrapper: () => import(/* webpackChunkName: "default" */ '@/components/default/v-tooltip-wrapper'),
    Editor: () => import(/* webpackChunkName: "default" */ '@/components/Editor')
  },
  mounted() {
    window.api.send("set-title", "StudenWrite");
    // console.log(remote.getCurrentWindow())
  }
}
</script>

<style lang="scss">

#app {
  display:flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  box-sizing: border-box;
  background-color: var(--main-color);
}

#body {
  flex:1;
  display:flex;
}

.main {
  overflow-x: hidden;
  overflow-y: scroll;
  flex:1;
  box-sizing: border-box;
  height: calc(100vh - var(--title-bar-size));
}
</style>
