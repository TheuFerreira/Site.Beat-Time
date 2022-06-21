import { saveUser } from './save_user.js';
import { loadQuestionDialog, showQuestionDialog } from './../../shared/question_dialog/question_dialog.js';
import { stringIsEmpty } from '../../../services/string_service.js';

export function loadControls() {
    loadQuestionDialog();

    $("#btnSave").click(function (e) { 
        e.preventDefault();
        
        if (checkContact() == false) {
            return;
        }

        if (checkPassword() == false) {
            return;
        }

        showQuestionDialog("Atualização dos Dados do Usuário", "Tem certeza de que Deseja atualizar os seus dados?", saveUser, function(){});
    });

    $("#email").change(function (e) { 
        checkContact();
    });

    $("#telephone").change(function (e) { 
        checkContact();
    });

    $("#cellphone").change(function (e) { 
        checkContact();
    });

    $("#password").change(function (e) { 
        checkPassword();
    });
    
    $("#repeatPassword").change(function (e) { 
        checkPassword();
    });
}

function checkContact() {
    const contactError = document.getElementById("contactError");
    contactError.style.color = "red";

    const email = document.getElementById("email").value;
    const telephone = document.getElementById("telephone").value;
    const cellphone = document.getElementById("cellphone").value; 

    if (stringIsEmpty(email) && stringIsEmpty(telephone) && stringIsEmpty(cellphone)) {
        contactError.style.opacity = 1;
        return false;
    }

    contactError.style.opacity = 0;
    return true;
}

function checkPassword() {
    const password = document.getElementById('password');
    const repeatPassword = document.getElementById('repeatPassword');

    if (repeatPassword.value == '') {
        return false;
    }

    if (repeatPassword.value == password.value) {
        return true;
    }

    repeatPassword.setCustomValidity('Invalid');
    return false;
}
