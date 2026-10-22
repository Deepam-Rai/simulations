import { COMMON_PATTERNS } from "./constants.js";


export function populateCommonPatterns(domId) {
    const input = document.getElementById(domId);
    COMMON_PATTERNS.forEach(pattern => {
        const option = document.createElement("option");
        option.value = JSON.stringify(pattern.map);
        option.textContent = pattern.label;
        input.appendChild(option);
    })
}