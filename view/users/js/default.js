import { loadAllUsers } from './table.js';
import { closeAddUser, showAddUser, submitAddUser } from './add_user.js';
import { loadAddUserRules } from './add_user_rules.js';
import { loadInfoDialog } from './info_dialog.js';
import { cpf } from '../../../singletons/session.js';

function loadMenu() {
    if (cpf == null) {
        window.location.href = "index.html";
        return;
    }
}

function loadEvents() {
    loadMenu();

    document.getElementById("btnNewUser").addEventListener("click", showAddUser);
    document.getElementById("btnCancelAddUser").addEventListener("click", closeAddUser);
    document.getElementById('addUser').addEventListener("submit", submitAddUser);

    loadAllUsers();
    loadInfoDialog();
    loadAddUserRules();
}

window.onload = loadEvents;