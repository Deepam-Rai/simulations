import {
    DEFAULT_TIME_STEP, PLAY, PAUSE, DEFAULT_ROWS, DEFAULT_COLS, DEFAULT_GRID_SIZE, DEFAULT_RULE,
} from "./constants.js";
import { resetCanvas, renewSimulation, togglePausePlay } from "./main.js";


export function bindRestart(){
    const input = document.getElementById("restart");
    input.addEventListener("click", function() {
        console.log(`restarting simulation`);
        renewSimulation();
    })
}


export function bindPausePlay(configs){
    const input = document.getElementById("pausePlay");
    input.innerText = configs.state === PAUSE ? "▶" : "❚❚";
    input.addEventListener("click", function () {
        togglePausePlay();
        console.log(`new pausePlay state:${configs.state}`);
    });
}


export function bindRows(configs){
    const input = document.getElementById("rows");
    configs.rows = DEFAULT_ROWS;
    input.value = configs.rows;
    input.addEventListener("change", function () {
        let value = parseInt(this.value);
        if (isNaN(value) || value < 1) {
            this.value = DEFAULT_ROWS; 
            value = DEFAULT_ROWS;
        }
        configs.rows = value;
        console.log(`new rows count:${value}`);
    });
}


export function bindCols(configs){
    const input = document.getElementById("cols");
    configs.cols = DEFAULT_COLS;
    input.value = configs.cols;
    input.addEventListener("change", function () {
        let value = parseInt(this.value);
        if (isNaN(value) || value < 1) {
            this.value = DEFAULT_COLS; 
            value = DEFAULT_COLS;
        }
        configs.cols = value;
        console.log(`new cols count:${value}`);
    });
}


export function bindGridSize(configs){
    const input = document.getElementById("gridSize");
    configs.gridSize = DEFAULT_GRID_SIZE;
    input.value = configs.gridSize;
    input.addEventListener("change", function () {
        let value = parseInt(this.value);
        if (isNaN(value) || value < 1) {
            this.value = DEFAULT_GRID_SIZE; 
            value = DEFAULT_GRID_SIZE;
        }
        configs.gridSize = value;
        console.log(`new grid size:${value}`);
        resetCanvas();
    });
}


// bind time interval between steps
export function bindTimeStep(configs){
    const timeStepInput = document.getElementById("timeStep");
    configs.timeStep = DEFAULT_TIME_STEP;
    timeStepInput.value = configs.timeStep;
    timeStepInput.addEventListener("change", function () {
        let value = parseInt(this.value);
        if (isNaN(value) || value < 1) {
            this.value = DEFAULT_TIME_STEP; 
            value = DEFAULT_TIME_STEP;
        }
        configs.timeStep = value;
        console.log(`new timeStep:${value}`);
        renewSimulation();
    });
}


export function bindRule(configs){
    const input = document.getElementById("rule");
    configs.rule = DEFAULT_RULE;
    input.value = configs.rule;
    input.addEventListener("change", function (event) {
        configs.rule = event.target.value;
        console.log(`new rule:${event.target.value}`);
        renewSimulation();
    });
}


export function bindCommonPatterns() {
    const input = document.getElementById("patternSelect");
    input.addEventListener("change", function () {
        console.log(`initiating common pattern: ${this.selectedOptions[0].text}`);
        renewSimulation(JSON.parse(this.value));
    })
}