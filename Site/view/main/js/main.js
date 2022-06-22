import { loadControls } from '../js/controls.js';
import { loadGraph } from '../js/graph.js';

function loadEvents() {
    loadControls();
    loadGraph();
}

window.onload = loadEvents;