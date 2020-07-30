<template>
    <div >
        <input v-model.number="steps" placeholder="Number of steps" />
        <button @click="togglePlayStop">{{playerStatus}}</button>
        <br/>
        <svg :width="steps * 70" :height="nSamples * 60">
            <SequencerStep v-for="(n, step) in steps * nSamples" :key="step" v-bind:x="step % steps" v-bind:y="~~(step / steps)" @toggle-step="toggleStep"></SequencerStep>
        </svg>
    </div>
</template>

<script>
import SequencerStep from "./SequencerStep.vue";
import * as Tone from "tone";

export default {
    name: "Sequencer",
    data: function () {
        return {
            seqArray: [[]],
            steps: 16,
            nSamples: 3,
            isPlaying: false,
            players: null,
            bpm: 120,
            curStep: 0
        };
    },
    created: function () {

        this.players = new Tone.Players({
			urls: {
				0: "gong_1.mp3",
				1: "crash_2.mp3",
				2: "clap_1.mp3",
			},
			fadeOut: "64n",
			baseUrl: "https://tonejs.github.io/audio/berklee/"
        }).toDestination();

        this.seqArray = new Array(this.nSamples)
        for (let row = 0; row < this.nSamples; row++) {
            this.seqArray[row] = new Array(this.steps)
            for (let step = 0; step < this.steps; step++) {
                this.seqArray[row][step] = false
            }
        }

        Tone.Transport.bpm.value = this.bpm
        Tone.Transport.scheduleRepeat(this.stepCallback, "8n")
    },
    methods: {
        toggleStep: function (...args) {
            const [x,y] = args
            this.seqArray[y][x] = !this.seqArray[y][x]
            
        },
        togglePlayStop: function () {
            if (this.isPlaying) {
                this.stop()
            }
            else {
                this.play()
            }
            this.isPlaying = !this.isPlaying;
        },
        play: function () {
            Tone.Transport.start("+0.1");
        },
        stop: function () {
            Tone.Transport.stop();
        },
        stepCallback: function(time) {
            console.log(time)
            for (let nSample = 0; nSample < this.nSamples; nSample++) {
                const player = this.players.player(nSample)
                if (this.seqArray[nSample][this.curStep]) {
                    console.log(nSample, this.curStep, time)
                    player.start(time, 0, "8n").stop("+0.5")
                }
            }
            this.curStep++;
            if (this.curStep >= this.steps)
                this.curStep = 0;
        }
    },
    computed: {
        playerStatus: function () {
            return this.isPlaying ? "Stop" : "Play"
        }
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
