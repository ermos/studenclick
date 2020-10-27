<template>
  <div class="title-bar">
    <div class="title-bar__menu">
      <img alt="StudenWrite" src="/static/images/favicon.png" class="title-bar__icon"/>
    </div>
    <nav class="title-bar__action">
      <button @click="winAction('minimize-app')" class="action__item">
        <i class="icon-minimize" style="display:block;padding-bottom: 8px;"></i>
      </button>
      <button @click="winAction('maximize-app')" class="action__item">
        <i class="icon-maximize"></i>
      </button>
      <button @click="winAction('close-app')" class="action__item close">
        <i class="icon-close"></i>
      </button>
    </nav>
  </div>
</template>

<script>


export default {
  name: "TitleBar",
  methods: {
    winAction (name) {
      // console.log(window.api, name)
      window.api.send(name, "some data");
    }
  },
  mounted() {

  }
}
</script>

<style>
.title-bar {
  width: 100%;
  height: var(--title-bar-size);
  background-color: var(--main-color-dark-4);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  -webkit-user-select: none;
  -webkit-app-region: drag;
  border-bottom: 4px solid var(--main-color-light-1);
}

.title-bar__menu {
  display: flex;
  align-items: center;
  height: var(--title-bar-size);
  margin: 0 10px;
}

.title-bar__icon {
  width: 25px;
}

.title-bar__action {
  display: flex;
}

.action__item {
  -webkit-app-region: no-drag;
  box-sizing: border-box;
  width: var(--title-bar-size);
  height:var(--title-bar-size);
  background-color: transparent;
  outline:none;
  cursor:pointer;
  border:none;
  color: var(--text-color);
}

.action__item:hover {
  background-color: var(--main-color-light-1);
}

.action__item.close:hover {
  background-color: rgba(227, 87, 79, 0.5);
}

</style>