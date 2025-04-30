import { resetField, run } from "./main.js";
import { PAUSE, PLAY, DEF_TIME_STEP, DEF_PRISONERS_COUNT } from "./constants.js";

export function bindRestart(meta){
    const input = document.getElementById("restart");
    input.addEventListener("click", function () {
        clearInterval(meta.simulation); // Stop the current loop
        resetField();
        meta.simulation = setInterval(run, meta.configs.timeStep); // Restart loop
        console.log(`restarted simulation.`);
    });
}

export function bindPausePlay(meta){
    const input = document.getElementById("pausePlay");
    input.innerText = meta.configs.state === PAUSE ? "▶" : "❚❚";
    input.addEventListener("click", function () {
        meta.configs.state = meta.configs.state === PLAY ? PAUSE : PLAY;
        input.innerText = meta.configs.state === PAUSE ? "▶" : "❚❚";
        if (meta.configs.state === PAUSE) {
            clearInterval(meta.simulation); // Stop the current loop
        } else if(meta.configs.state === PLAY) {
            meta.simulation = setInterval(run, meta.configs.timeStep); // Restart loop
        }
        console.log(`new pausePlay state:${meta.configs.state}`);
    });
}

export function bindTimeStep(meta){
    const timeStepInput = document.getElementById("timeStep");
    meta.configs.timeStep = DEF_TIME_STEP;
    timeStepInput.value = meta.configs.timeStep;
    timeStepInput.addEventListener("change", function () {
        let value = parseInt(this.value);
        if (isNaN(value) || value < 1) {
            this.value = DEF_TIME_STEP; 
            value = DEF_TIME_STEP;
        }
        console.log(`new timeStep:${value}`);
        meta.configs.timeStep = value;
        clearInterval(meta.simulation); // Stop the current loop
        meta.simulation = setInterval(run, meta.configs.timeStep); // Restart with new interval
    });
}

export function bindPrisonersCount(meta){
    const input = document.getElementById("prisonersCount");
    meta.configs.n = DEF_PRISONERS_COUNT;
    input.value = meta.configs.n;
    input.addEventListener("change", function () {
        let value = parseInt(this.value);
        if (isNaN(value) || value < 1) {
            this.value = DEF_PRISONERS_COUNT; 
            value = DEF_PRISONERS_COUNT;
        }
        console.log(`new prisonersCount:${value}`);
        meta.configs.n = value;
        resetField();
        meta.simulation = setInterval(run, meta.configs.timeStep); // Restart with new interval
    });
}