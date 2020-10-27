<template>
  <div :id="'v-tooltip-' + _uid" class="v-tooltip">
    <slot></slot>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: "v-tooltip",
  props: {
    position: {
      type: String,
      default: "right"
    },
    className: {
      type: String
    },
    message: {
      type: String
    }
  },
  mounted() {
    let tooltip = document.querySelector("#v-tooltip-" + this._uid)
    tooltip.addEventListener("mouseenter", () => {
      let pos = tooltip.getBoundingClientRect()
      console.log(pos)

      this.setToolTip(Object.assign({
        message: this.message,
        className: this.className
      }, this.setPosition(pos)))
    })
    tooltip.addEventListener("mouseleave", () => {
      this.unsetToolTip()
    })
  },
  methods: {
    ...mapActions('tooltip', ['setToolTip', 'unsetToolTip']),
    setPosition (pos) {
      switch (this.position) {
        case "top":
          return {
            top: pos.top,
            left: pos.left+(pos.width/2),
          }
        case "bottom":
          return {
            top: pos.top+pos.height,
            left: pos.left+(pos.width/2),
          }
        case "left":
          return {
            top: pos.top+(pos.height/2),
            left: pos.left-(pos.width),
          }
        case "right":
          return {
            top: pos.top+(pos.height/2),
            left: pos.left+(pos.width),
          }
      }
    }
  }
}
</script>

<style scoped>

</style>