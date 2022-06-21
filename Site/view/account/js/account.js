import { loadUser } from './save_user.js';
import { loadControls } from './controls.js';
import { loadEditPhoto } from '../../account/js/edit_photo.js';
import { cpf } from '../../../singletons/session.js';

window.onload = loadEvents;

function loadMenu() {
    if (cpf == null) {
        window.location.href = "index.html";
        return;
    }
}

function loadEvents() {
    loadMenu();
    loadUser();
    loadControls();
    loadEditPhoto();
}