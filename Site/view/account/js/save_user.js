import { cpf, typeUser } from '../../../singletons/session.js';
import { formatFullStringToShortDate } from '../../../services/date_service.js';
import { showInfoDialog } from './info_dialog.js';
import { stringIsEmpty } from '../../../services/string_service.js';

export async function saveUser() {
    const file = $("#pictureField")[0].files[0];
    const fullName = document.getElementById('fullName').value;
    const cpf = document.getElementById('cpf').value;
    const birthDate = document.getElementById('birthDate').value;
    const gender = document.getElementById('gender').value;

    const email = document.getElementById('email').value;
    const telephone = document.getElementById('telephone').value;
    const cellphone = document.getElementById('cellphone').value;

    const userName = document.getElementById('userName').value;
    const password = document.getElementById('password').value;

    const fData = new FormData();
    fData.append("file", file);
    fData.append("full_name", fullName);
    fData.append("cpf", cpf);
    fData.append("birth_date", birthDate);
    fData.append("gender", gender);
    fData.append("email", email);
    fData.append("telephone", telephone);
    fData.append("cellphone", cellphone);
    fData.append("user_name", userName);
    fData.append("password", password);

    $.ajax({
        cache: false,
        type: "POST",
        url: "routes/users/update.php",
        data: fData,
        dataType: "json",
        processData : false,
        contentType : false,
        success: function (response) {
            showInfoDialog();
        },
        error: function(request, status, error) {
            alert(request.responseText);
        }
    });
}

export function loadUser() {
    $.ajax({
        type: "POST",
        url: "routes/users/get_user.php",
        data: {
            "cpf" : cpf,
        },
        dataType: "json",
        success: function (response) {
            fillAllFields(response[0]);
        }
    });
}

function fillAllFields(data) {
    const fileName = data['file_name'];
    const fullName = data['full_name'];
    const cpf = data['cpf'];
    let birthDate = data['birth_date'];
    const gender = data['gender'];

    const email = data['email'];
    const telephone = data['telephone'];
    const cellphone = data['cellphone'];
    
    const userName = data['user_name'];
    const password = data['password'];

    const totalHours = data['total_hours'];
    const salary = data['salary'];

    birthDate = formatFullStringToShortDate(birthDate);

    if (fileName != null) {
        if (stringIsEmpty(fileName) == false) {
            document.getElementById('photo').setAttribute('src', fileName);
        }
    }

    document.getElementById('fullName').value = fullName;
    document.getElementById('cpf').value = cpf;
    document.getElementById('birthDate').value = birthDate;
    document.getElementById('gender').value = gender;

    document.getElementById('email').value = email;
    document.getElementById('telephone').value = telephone;
    document.getElementById('cellphone').value = cellphone;

    document.getElementById('userName').value = userName;
    document.getElementById('password').value = password;

    document.getElementById('typeUser').value = typeUser;
    document.getElementById('totalHours').value = totalHours + " Horas";
    document.getElementById('salary').value = salary;
}
