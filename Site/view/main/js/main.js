import { loadControls } from '../js/controls.js';
import { loadGraph } from '../js/graph.js';
import { loadTableAllSpot } from '../js/table_all_spot.js';

function loadEvents() {
    loadControls();
    loadGraph();
    loadTableAllSpot();
}

window.onload = loadEvents;