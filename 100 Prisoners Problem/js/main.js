import { Tokens } from "./tokens.js";
import { drawBar, drawDoughnut } from "./graph.js";
import { getRandomUniqueIntegers } from "./utils.js";
import { PLAY } from "./constants.js";
import { bindRestart, bindPausePlay, bindTimeStep, bindPrisonersCount } from "./binders.js";

Chart.plugins.register(ChartDataLabels);

const meta = {
    "tokens": null,     // The boxes from where prisoners pull tokens
    "configs": {
        "n": 10,        // prisoners count
        "timestep": 50, // ms
        "state": PLAY
    },
    "stats": {
        "A": {
            "buckets": [],      // bucket x value = count of iterations where x prisoners passed
            "allPassCount": 0   // count of iterations where all prisoners passed
        },
        "B": {
            "buckets": [],
            "allPassCount": 0
        }
    },
    "simulation": null,
    "iterations": 0,
}

// --------------------- Dashboard keys Binders -----------------------------------
bindRestart(meta);
bindPausePlay(meta);
bindTimeStep(meta);
bindPrisonersCount(meta);
// --------------------------------------------------------------------------------



export function resetField() {
    meta.stats.A.buckets = Array.from({length: meta.configs.n+1}, (_, i) => 0);
    meta.stats.B.buckets = Array.from({length: meta.configs.n+1}, (_, i) => 0);
    meta.stats.A.allPassCount = 0;
    meta.stats.B.allPassCount = 0;
    meta.iterations = 0;
}

function iterate() {
    // new config of token boxes
    meta.tokens = new Tokens( meta.configs.n);

    let n = meta.configs.n;
    // Group A: Random guess strategy
    let APassCount = 0;
    for(let i=1; i<=n; ++i) {
        const choices = getRandomUniqueIntegers(n/2, n);
        for(const choice of choices){
            if (meta.tokens.getToken(choice) === i) {
                APassCount++;
                break;
            }
        }
    }
    meta.stats.A.buckets[APassCount]++;
    if (APassCount === n) {
        meta.stats.A.allPassCount++;
    }
    // Group B: Cycle-following strategy
    let BPassCount = 0;
    for(let i=1; i<=n ; ++i){
        const triesRequired = meta.tokens.getCycleTries(i);
        const triesPresent = n/2;
        if (triesRequired <= triesPresent){
            BPassCount++;
        }
    }
    meta.stats.B.buckets[BPassCount]++;
    if (BPassCount === n) {
        meta.stats.B.allPassCount++;
    }
}

function updateUi() {
    drawBar("APassCountDistribution", meta.stats.A.buckets, "Pass Count per Iteration Distribution")
    const aPass = meta.stats.A.allPassCount / meta.iterations * 100;
    drawDoughnut("AAllPassDistribution", aPass, 100-aPass, "All Pass Distribution");
    drawBar("BPassCountDistribution", meta.stats.B.buckets, "Pass Count per Iteration Distribution")
    const bPass = meta.stats.B.allPassCount / meta.iterations * 100;
    drawDoughnut("BAllPassDistribution", bPass, 100-bPass, "All Pass Distribution");
    document.getElementById("iteration").textContent = meta.iterations;
}

export function run() {
    iterate();
    meta.iterations++;
    updateUi();
}

resetField();
meta.simulation = setInterval( run, meta.configs.timestep);
