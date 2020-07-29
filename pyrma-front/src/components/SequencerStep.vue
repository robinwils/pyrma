<template>
    <rect :class="classObject" :x="x" :y="y" width="70" height="60" v-on:click="toggleStep"/>
</template>

<script>
export default {
  name: 'SequencerStep',
  props: {
      x: Number,
      y: Number
  },
  data: function () {
      return {
          isActivated: false
      }
  },
  methods: {
      toggleStep: function () {
          this.isActivated = !this.isActivated
      }      
  },
  computed: {
      classObject: function () {
          return {
              "seq-step": true,
              activated: this.isActivated,
              disabled: !this.isActivated,
          }
      }
  }
}
</script>

<style>
.seq-step {
  width: 70px;
  height: 60px;
}
.disabled {
    fill: rgb(61, 75, 75);
}
.activated {
    fill: rgb(28, 173, 154);
}
</style>
