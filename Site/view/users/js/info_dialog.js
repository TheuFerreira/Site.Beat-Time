import { formatToCPF } from '../../../services/cpf_service.js';
import { formatToStringDate } from '../../../services/date_service.js';
import { formatToBRL } from '../../../services/number_service.js';

export function openInfoDialog(cpf) {
    document.getElementById("infoDialog").style.transform = "scale(1)";

    $.ajax({
        type: "POST",
        url: "routes/users/get_user.php",
        data: {
            "cpf": cpf,
        },
        dataType: "json",
        success: function (response) {
            showValues(response[0]);
        },
        error: function(request, status, error) {
            alert(request.responseText);
        }
    });
}

function showValues(data) {
    const fullName = data['full_name'];
    let cpf = data['cpf'];
    let birthDate = data['birth_date'];
    const gender = data['gender'];
    let email = data['email'];
    let telephone = data['telephone'];
    let cellphone = data['cellphone'];
    let entryDate = data['entry_date'];
    const hours = data["total_hours"] + " Horas";
    let salary = data['salary'];

    if (email == "") {
        email = "Sem E-mail";
    }

    if (telephone == "") {
        telephone = "Sem Telefone";
    }

    if (cellphone == "") {
        cellphone = "Sem Celular";
    }

    cpf = formatToCPF(cpf);

    birthDate = formatToStringDate(birthDate);
    entryDate = formatToStringDate(entryDate);

    salary = formatToBRL(salary);

    document.getElementById("infoFullName").textContent = fullName;
    document.getElementById("infoCPF").textContent = cpf;
    document.getElementById("infoBirthDate").textContent = birthDate;
    document.getElementById("infoGender").textContent = gender;
    document.getElementById("infoEmail").textContent = email;
    document.getElementById("infoTelephone").textContent = telephone;
    document.getElementById("infoCellphone").textContent = cellphone;
    document.getElementById("infoEntryDate").textContent = entryDate;
    document.getElementById("infoHours").textContent = hours;
    document.getElementById("infoSalary").textContent = salary;
}

export function loadInfoDialog() {
    document.getElementById("closeInfoDialog").addEventListener("click", closeInfoDialog);
}

function closeInfoDialog() {
    document.getElementById("infoDialog").style.transform = "scale(0)";
}
