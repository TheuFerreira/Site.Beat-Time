import { showAddUser } from './add_user.js';

export function loadControls() {
    $("#btnNewUser").click(function (e) { 
        e.preventDefault();
        showAddUser();
    });
}
