<template>
    <rect :class="classObject" :x="x * 70" :y="y * 60" width="70" height="60" v-on:click="toggleStep" />
</template>

<script>
export default {
    name: "SequencerStep",
    props: {
        x: Number,
        y: Number
    },
    data: function () {
        return {
            isActivated: false,
        };
    },
    methods: {
        toggleStep: function () {
            this.isActivated = !this.isActivated;
            this.$emit('toggle-step', this.x, this.y)
        },
    },
    computed: {
        classObject: function () {
            return {
                activated: this.isActivated,
                disabled: !this.isActivated,
            };
        },
    },
};
</script>

<style>
.disabled {
    fill: rgb(61, 75, 75);
}
.activated {
    fill: rgb(28, 173, 154);
}
</style>
