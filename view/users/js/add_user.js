import { loadAllUsers } from './table.js';
import { checkContact } from './add_user_rules.js'

let addedUser = false;

export function showAddUser() {
    resetControls();

    document.getElementById("addUser").style.transform = "scale(1)";
}

function resetControls() {
    const formUser = document.getElementById("addUser");
    formUser.querySelectorAll('input').forEach(clearInput);
    
    document.getElementById("typeUser").value = 1;
}

function clearInput(input) {
    input.value = "";
}

export function closeAddUser() {
    if (addedUser) {
        loadAllUsers();
        addedUser = false;
    }
    
    document.getElementById("addUser").style.transform = "scale(0)";
}

function sendData() {

    if (checkContact() == false) {
        return;
    }

    const formAddUser = document.getElementById('formAddUser');
    const data = new FormData(formAddUser);
    let cpf = data.get('cpf').replace('-', '').split('.').join("");

    $.ajax({
        type: "post",
        url: "routes/users/add.php",
        data: {
            'cpf': cpf,
            'type_user': data.get('type_user'),
            'full_name': data.get('full_name'),
            'birth_date': data.get('birth_date'),
            'gender': data.get('gender'),
            'email': data.get('email'),
            'telephone': data.get('telephone'),
            'cellphone': data.get('cellphone'),
            'salary': data.get('salary'),
            'user_name': data.get('user_name'),
            'password': data.get('password'),
        },
        success: function (response) {
            addedUser = true;
            resetControls();
        },
        error: function(request, status, error) {
            alert(request.responseText);
        }
    });
}

export function submitAddUser(event) {
    event.preventDefault();

    sendData();
}