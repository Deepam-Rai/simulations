// binds html dashboard values to javascript variables

import { DEF_TIME_STEP, PAUSE, PLAY } from "./constants.js";
import { updateSimulation } from "./main.js";
import { resetField, resetCanvas } from "./main.js";

export function bindRestart(meta){
    const input = document.getElementById("restart");
    input.addEventListener("click", function () {
        clearInterval(meta.simulation); // Stop the current loop
        resetField();
        if(meta.configs.state === PLAY){
            meta.simulation = setInterval(updateSimulation, meta.configs.timeStep); // Restart with new interval
        }
        console.log(`refreshed values.`);
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
            meta.simulation = setInterval(updateSimulation, meta.configs.timeStep); // Restart loop
        }
        console.log(`new pausePlay state:${meta.configs.state}`);
    });
}

// bind time interval between steps
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
        if(meta.configs.state === PLAY){
            clearInterval(meta.simulation); // Stop the current loop
            meta.simulation = setInterval(updateSimulation, meta.configs.timeStep); // Restart with new interval
        }
    });
}