import {
    DEFAULT_ROWS, DEFAULT_COLS, DEFAULT_GRID_SIZE,
    DEFAULT_TIME_STEP, PLAY, DEFAULT_RULE,
    PAUSE
} from "./constants.js";
import { Grids } from "./grids.js";
import {
    bindRows, bindCols, bindGridSize, bindRestart, bindPausePlay, bindTimeStep, bindRule,
    bindCommonPatterns,
} from "./binders.js";
import { populateCommonPatterns } from "./utils.js";

let metas = {
    "canvas": document.getElementById("drawCanvas"),
    "simulation": null,
    "steps": 0,
    "grids": null,
    "configs": {
        "timeStep": DEFAULT_TIME_STEP,
        "state": PLAY,
        "gridSize": DEFAULT_GRID_SIZE,
        "rows": DEFAULT_ROWS,
        "cols": DEFAULT_COLS,
        "rule": DEFAULT_RULE,
    }
};


export function resetCanvas() {
    metas.ctx = metas.canvas.getContext("2d");
    metas.canvas.height = metas.configs.gridSize * metas.configs.rows;
    metas.canvas.width = metas.configs.gridSize * metas.configs.cols;
    const container = document.getElementById("canvas-container");
    container.style.alignItems = container.scrollHeight > container.offsetHeight ? "flex-start" : "center";
    container.style.justifyContent = container.scrollWidth > container.offsetWidth ? "flex-start" : "center";
}

export function resetField() {
    resetCanvas();
    metas.grids = new Grids(metas.canvas, metas.configs);
    metas.steps = 0;
    document.getElementById("stepCount").textContent = metas.steps;
}

export function renewSimulation(prepopulate_map) {
    clearInterval(metas.simulation); // Stop the current loop
    resetField();
    if (prepopulate_map != null){
        console.log("renewing simulation...");
        console.log(`received prepopulate map`);
        metas.grids.prepopulate(prepopulate_map);
    }
    draw();
    metas.simulation = setInterval(updateSimulation, metas.configs.timeStep); // Restart with new interval
    console.log("renewed simulation");
}

export function draw() {
    metas.grids.draw();
}

export function updateSimulation() {
    draw();
    metas.grids.process();
    metas.steps++;
    document.getElementById("stepCount").textContent = metas.steps;
}

export function togglePausePlay() {
    metas.configs.state = metas.configs.state === PLAY ? PAUSE : PLAY;
    document.getElementById("pausePlay").innerText = metas.configs.state === PAUSE ? "▶" : "❚❚";
    if (metas.configs.state === PAUSE) {
        clearInterval(metas.simulation); // Stop the current loop
    } else if(metas.configs.state === PLAY) {
        metas.simulation = setInterval(updateSimulation, metas.configs.timeStep); // Restart loop
    }
    draw();
}


populateCommonPatterns("patternSelect");
// bind control UIs to their functions
bindRestart();
bindPausePlay(metas.configs);
bindRows(metas.configs);
bindCols(metas.configs);
bindGridSize(metas.configs);
bindTimeStep(metas.configs, metas);
bindRule(metas.configs, metas);
bindCommonPatterns();


// user interaction
let isMouseDown = false;
let lastCell = null;


function handleCellInteraction(event) {
    const rect = metas.canvas.getBoundingClientRect();
    const row = Math.floor( (event.clientY - rect.top)/metas.configs.gridSize);
    const col = Math.floor( (event.clientX - rect.left)/metas.configs.gridSize);

    if (row < 0 || row >= metas.configs.rows || col < 0 || col >= metas.configs.cols){
        return;
    }

    const key = `${row},${col}`;

    if (key == lastCell) return;

    lastCell = key;
    metas.grids.toggleCell(row, col);
    draw();
}

metas.canvas.addEventListener("mousedown", (event) => {
    if (event.button !== 0) return;
    isMouseDown = true;
    lastCell = null;
    handleCellInteraction(event);
});
metas.canvas.addEventListener("mousemove", (event) =>  {
    if (isMouseDown) {
        handleCellInteraction(event);
    }
});
metas.canvas.addEventListener("mouseup", (event) => {
    isMouseDown = false;
    lastCell = null;
});

// start the simulation
renewSimulation();