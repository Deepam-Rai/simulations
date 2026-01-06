import {
    bindPausePlay, bindRestart, bindTimeStep
} from "./binders.js";
import {
    generatePoints, inCircle
} from "./utils.js";
import { PLAY } from "./constants.js";

let canvas = document.getElementById("canvas");

let configs = {
    "timeStep": 50,  //ms
    "state": PLAY,
    "diagram": {
        "center": {
            "x": 100,
            "y":100
        },
        "radius": 100,
        "pointColor": 'black',
        "pointRadius": 1,
        "shapeColor": "red"
    }
};
let meta = {
    "canvas": document.getElementById("canvas"),
    "ctx": canvas.getContext('2d'),
    "configs": configs,
    "simulation": null,
    "steps": 0,
    "stats": {
        "inPoints": 0,
        "totalPoints": 0,
    }
}

function resetResolution(){
    const container = document.getElementById("canvas-container");
    meta.canvas.width = container.clientWidth;
    meta.canvas.height = container.clientHeight;
    meta.configs.diagram.center.x = canvas.width/2;
    meta.configs.diagram.center.y = canvas.height/2;
    meta.configs.diagram.radius = canvas.width/4;
    container.style.alignItems = container.scrollHeight > container.offsetHeight ? "flex-start" : "center";
    container.style.justifyContent = container.scrollWidth > container.offsetWidth ? "flex-start" : "center";
}
export function resetCanvas() {
    meta.ctx = meta.canvas.getContext("2d");
    resetResolution();
    drawShapes();
    // since we will be only plotting points now
    meta.ctx.fillStyle =  meta.configs.diagram.pointColor;
    meta.ctx.strokeStyle =  meta.configs.diagram.pointColor;
}

function drawShapes(){
    meta.ctx.beginPath();
    meta.ctx.strokeStyle = meta.configs.diagram.shapeColor;
    meta.ctx.rect(
        meta.configs.diagram.center.x - meta.configs.diagram.radius,
        meta.configs.diagram.center.y - meta.configs.diagram.radius,
        meta.configs.diagram.radius*2,
        meta.configs.diagram.radius*2
    );
    meta.ctx.stroke();
    meta.ctx.beginPath();                        
    meta.ctx.arc(
        meta.configs.diagram.center.x,
        meta.configs.diagram.center.y,
        meta.configs.diagram.radius,
        0, Math.PI * 2
    );
    meta.ctx.stroke();
    
}

bindTimeStep(meta);
bindRestart(meta);
bindPausePlay(meta);



function plotPoint(x, y){
    meta.ctx.beginPath();
    meta.ctx.rect(  // comparatively efficient than ctx.arc
        x,y,
        1, 1
    );
    meta.ctx.stroke();
}

export function resetField() {
    resetCanvas();
    meta.steps = 0;
    meta.stats.totalPoints = 0;
    meta.stats.inPoints = 0;
    document.getElementById("totalPoints").textContent = meta.stats.totalPoints;
    document.getElementById("pi").textContent = " ";
}


export function updateSimulation() {
    const [x,y] = generatePoints(meta.configs.diagram);
    plotPoint(x, y);
    meta.stats.totalPoints += 1;
    if (inCircle(x, y, meta.configs.diagram)){
        meta.stats.inPoints += 1;
    }
    meta.steps++;
    document.getElementById("totalPoints").textContent = meta.stats.totalPoints;
    document.getElementById("inPoints").textContent = meta.stats.inPoints;
    document.getElementById("pi").textContent = 4 * meta.stats.inPoints/meta.stats.totalPoints;
}

resetField();
meta.simulation = setInterval( updateSimulation, meta.configs.timeStep);
