<template>
    <div>
        <input v-model.number="steps" placeholder="Number of steps" />
        <br/>
        <svg :width="steps * 70" height="110">
            <SequencerStep v-for="step in steps" :key="step" v-bind:x="step * 70" v-bind:y="0"></SequencerStep>
        </svg>
    </div>
</template>

<script>
import SequencerStep from "./SequencerStep.vue";

export default {
    name: "Sequencer",
    data: function () {
        return {
            seqArray: [[]],
            steps: 16
        };
    },
    components: {
        SequencerStep,
    },
};
</script>

<style>
.seq-container {
    display: flex;
}
</style>
