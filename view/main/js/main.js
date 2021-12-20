import { cpf } from '../../../singletons/session.js';
import { loadControls } from '../js/controls.js';
import { loadGraph } from '../js/graph.js';
import { loadTableAllSpot } from '../js/table_all_spot.js';

function loadMenu() {
    if (cpf == null) {
        window.location.href = "index.html";
        return;
    }
}

function loadEvents() {
    loadMenu();
    loadControls();
    loadGraph();
    loadTableAllSpot();
}

window.onload = loadEvents;