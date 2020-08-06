<template>
    <div >
        <p> Number of steps: {{steps}} </p>
        <button @click="changeSteps(true)">*2</button>
        <button @click="changeSteps(false)">/2</button>
        <button @click="togglePlayStop">{{playerStatus}}</button>
        <br/>
        <div></div>
        <svg :width="steps * 70" :height="nSamples * 60">
            <SequencerStep v-for="(n, step) in steps * nSamples"
                           :key="step"
                           v-bind:x="step % steps"
                           v-bind:y="~~(step / steps)"
                           @toggle-step="toggleStep">
            </SequencerStep>
        </svg>
    </div>
</template>

<script>
import SequencerStep from "./SequencerStep.vue";
import * as Tone from "tone";

const clone = require('rfdc')()

export default {
    name: "Sequencer",
    data: function () {
        return {
            seqArray: [[]],
            steps: 16,
            nSamples: 3,
            isPlaying: false,
            players: null,
            transportEventId: -1,
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

        this.initSeqArray()

        Tone.Transport.bpm.value = this.bpm
        this.transportEventId = Tone.Transport.scheduleRepeat(this.stepCallback, "8n")
        console.log("CREATED")
    },
    destroyed: function () {
        if (this.transportEventId !== -1) {
            Tone.Transport.clear(this.transportEventId)
        }
        this.transportEventId = -1
        console.log("DESTROYED")
    },
    updated: function () {
        console.log("UPDATED")
    },
    watch: {
        steps: function () {
            if (this.transportEventId !== -1) {
                Tone.Transport.clear(this.transportEventId)
            }
            this.transportEventId = Tone.Transport.scheduleRepeat(this.stepCallback, "8n")
            this.initSeqArray(true)
        }
    },
    methods: {
        initSeqArray: function(copyOld = false) {
            var old = null
            if (copyOld && typeof this.seqArray !== undefined && this.seqArray.length > 0) {
                old = clone(this.seqArray)
            }
            this.seqArray = new Array(this.nSamples)
            console.log("OLD=", old)
            for (let row = 0; row < this.nSamples; row++) {
                this.seqArray[row] = new Array(this.steps)
                for (let step = 0; step < this.steps; step++) {
                    this.seqArray[row][step] = old === null ? false : this.checkUndefined(old[row][step], false)
                }
            }

        },
        changeSteps: function(mul) {
            this.steps = mul ? this.steps * 2 : this.steps / 2
            if (this.steps < 1) {
                this.steps = 1
            }
            if (this.steps > 32) {
                this.steps = 32
            }
        },
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
            console.log(this.seqArray)
        },
        stop: function () {
            Tone.Transport.stop();
        },
        stepCallback: function(time) {
            for (let nSample = 0; nSample < this.nSamples; nSample++) {
                const player = this.players.player(nSample)
                if (this.seqArray[nSample][this.curStep]) {
                    player.start(time)
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
