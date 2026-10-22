import { ALIVE, DEAD } from "./constants.js";

export class Grids {
    constructor(canvas, configs) {
        this.canvas = canvas;
        this.configs = configs;
        
        this.cells = null;

        this.rules = null;

        
        this.reset();
    }

    prepopulate(prepopulate_map){
        let mid_y = this.rows/2;
        let mid_x = this.cols/2;
        let start_y = Math.floor(mid_y - prepopulate_map.length/2);
        let start_x = Math.floor(mid_x - prepopulate_map[0].length/2);
        for (let y = 0; y < prepopulate_map.length; y++){
            for (let x = 0; x < prepopulate_map[0].length; x++){
                let cell_state = prepopulate_map[y][x] == 1 ? ALIVE : DEAD;
                this.cells[start_y + y][start_x + x] = cell_state;
            }
        }
    }

    toggleCell(row, col){
        let new_state = this.cells[row][col] == ALIVE ? DEAD : ALIVE;
        this.cells[row][col] = new_state;
    }
    
    reset() {
        // rules
        let rules = this.extractRules(this.configs.rule);
        this.birth_rules = rules.birth;
        this.survival_rules = rules.survival;
        // reset row and column counts
        this.cols = this.configs.cols;
        this.rows = this.configs.rows;
        // reset grid instance
        this.cells = Array.from({length: this.rows}, () => Array(this.cols).fill(DEAD));
    }

    getNeighboursCount(row, col) {
        let radius = 1;
        let start_y = row - radius;
        let start_x = col - radius;
        let end_y = row + radius;
        let end_x = col + radius;
        let count = 0;
        for (let y = start_y; y <= end_y; y++){
            for (let x = start_x; x <= end_x; x++) {
                // skip if out of bounds
                if (
                    y < 0 || x < 0 ||
                    y >= this.rows || x >= this.cols
                ) {
                    continue;
                }
                // count if cell is alive
                if (this.cells[y][x] == ALIVE) {
                    count++;
                }
            }
        }
        if (this.cells[row][col] == ALIVE){
            count--;
        }
        return count;
    }

    getNewState(old_cell_state, neighbours_count) {
        if (old_cell_state == DEAD && this.birth_rules.includes(neighbours_count)) {
            return ALIVE;
        }
        if (old_cell_state == ALIVE && this.survival_rules.includes(neighbours_count)) {
            return ALIVE;
        }
        return DEAD;
    }

    process() {
        let new_state = Array.from({length: this.rows}, () => Array(this.cols).fill(DEAD));
        for (let y = 0; y < this.rows; y++) {
            for (let x = 0; x < this.cols; x++) {
                let neighbours_count = this.getNeighboursCount(y, x);
                new_state[y][x] = this.getNewState(this.cells[y][x], neighbours_count);
            }
        }
        this.cells = new_state;
    }

    draw() {
        let ctx = this.canvas.getContext("2d");
        for (let y = 0; y < this.rows; y++) {
            for (let x = 0; x < this.cols; x++) {
                // for each cell
                // get top-left position
                let posX = Math.floor(x * this.configs.gridSize);
                let posY = Math.floor(y * this.configs.gridSize);
                // get grid size
                let size = Math.floor( this.configs.gridSize);
                // color black if cell alive else white
                ctx.fillStyle = this.cells[y][x] == ALIVE ? 'black' : 'white';
                // draw fill rectange
                ctx.fillRect(posX, posY, size, size);
                // draw grid
                ctx.strokeStyle = 'gray';
                ctx.strokeRect(posX, posY, size, size);
            }
        }
    }

    extractRules(ruleString) {
        // From rulestring B3/S23 returns live numbers [2], [2,3]
        const cleanStr = ruleString.toUpperCase().replace(/\s+/g, '');
        const match = cleanStr.match(/B(\d*)\/S(\d*)/i);
        if (!match) {
            return {
                birth: [],
                survival: [],
            };
        }
        const birth = match[1].split('').map(Number);
        const survival = match[2].split('').map(Number);
        return {birth, survival};
    }
}