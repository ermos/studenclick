<template>
  <div class="v-tooltip__container">
    <div
        v-if="tooltip !== null"
        class="v-tooltip__item"
        :class="tooltip.className ? tooltip.className : ''"
        :style="'top:'+tooltip.top+'px;left:'+tooltip.left+'px;'"
    >
      {{ tooltip.message }}
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: "v-tooltip-wrapper",
  computed: {
    ...mapGetters('tooltip', ['tooltip'])
  }
}
</script>

<style>
.v-tooltip__container {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: none!important;
  pointer-events: none;
  z-index: 1002;
}

.v-tooltip__item {
  position: absolute;
}
</style>