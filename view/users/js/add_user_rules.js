import { validCPF } from '../../../services/cpf_service.js';
import { stringIsEmpty } from '../../../services/string_service.js';

function checkCPF() {
    const cpf = document.getElementById('cpf');
    const cpfValue = cpf.value.replace('-', '').split('.').join("");
    const cpfError = document.getElementById('cpfError');
   
    let isValid = validCPF(cpfValue);
    if (isValid == false) {
        cpfError.textContent = "Insira um CPF válido";
        cpfError.style.color = "red";
        cpf.setCustomValidity('Invalid');
        return;
    }

    cpf.setCustomValidity('Invalid');

    cpfError.textContent = "Verificando...";
    cpfError.style.color = "blue";
    cpfError.style.opacity = 1;

    $.ajax({
        type: "POST",
        url: "routes/users/is_valid_cpf.php",
        data: {
            "cpf": cpfValue,
        },
        dataType: "json",
        success: function (response) {
            if (response == 1) {
                cpf.setCustomValidity('');
                cpfError.style.opacity = 0;
            } else {
                cpf.setCustomValidity('Invalid');
            }

            cpfError.textContent = "Insira um CPF válido";
            cpfError.style.color = "red"; 
        },
        error: function(request, status, error) {
            alert(request.responseText);
        }
    });
}

export function checkContact() {
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
        return;
    }

    if (repeatPassword.value == password.value) {
        return;
    }

    repeatPassword.setCustomValidity('Invalid');
}

function checkUserName() {
    const userName = document.getElementById('userName');
    const value = userName.value;
    const userNameError = document.getElementById('userNameError');

    if (stringIsEmpty(value)) {
        userNameError.textContent = "Insira o Nome de Usuário Válido";
        userNameError.style.color = "red";
        userNameError.style.opacity = 1;
        userName.setCustomValidity('Invalid');
        return;
    }

    userName.setCustomValidity('Invalid');

    userNameError.textContent = "Verificando...";
    userNameError.style.color = "blue";
    userNameError.style.opacity = 1;

    $.ajax({
        type: "POST",
        url: "routes/users/is_valid_username.php",
        data: {
            "user_name": value,
        },
        dataType: "json",
        success: function (response) {
            if (response == 1) {
                userName.setCustomValidity('');
                userNameError.style.opacity = 0;
            } else {
                userName.setCustomValidity('Invalid');
            }

            userNameError.textContent = "Insira o Nome de Usuário Válido";
            userNameError.style.color = "red"; 
        },
        error: function(request, status, error) {
            alert(request.responseText);
        }
    });
}

export function loadAddUserRules(){
    $("#cpf").change(function (e) { 
        checkCPF();
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

    $("#userName").change(function (e) { 
        checkUserName();
    });
    
    $("#password").change(function (e) { 
        checkPassword();
    });
    
    $("#repeatPassword").change(function (e) { 
        checkPassword();
    });
}