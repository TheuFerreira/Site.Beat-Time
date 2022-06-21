import { showQuestionDialog } from '../../shared/question_dialog/question_dialog.js';
import { openInfoDialog } from './info_dialog.js';
import { formatToFullStringDate } from '../../../services/date_service.js'

function getTdPicture() {
    const img = document.createElement("img");
    img.src = "./assets/images/img_account.png";
    img.height = "23";

    const span = document.createElement("span");
    span.className = "icon";
    span.appendChild(img);

    const td = document.createElement("td");
    td.id = "icon";
    td.appendChild(span);

    return td;
}

function getTd(content, className = "") {
    const td = document.createElement("td");
    td.className = className;
    td.textContent = content;

    return td;
}

function getTdInfo(cpf) {
    const span = document.createElement("span");
    span.className = "material-icons";
    span.textContent = "info";

    const button = document.createElement("button");
    button.className = "icon";
    button.addEventListener("click", function(e) {
        openInfoDialog(cpf);
    });
    button.appendChild(span);

    const td = document.createElement("td");
    td.id = "icon";
    td.appendChild(button);

    return td;
}

function getTdDel(cpf, fullName) {
    const span = document.createElement("span");
    span.className = "material-icons";
    span.textContent = "delete_forever";

    const button = document.createElement("button");
    button.className = "icon";
    button.addEventListener("click", function() {
        showQuestionDialog("Confirmação de Exclusão", `Tem certeza de que deseja excluir o funcionário ${fullName}? Esta ação não poderá ser desfeita!`, function (){
            
            $.ajax({
                type: "POST",
                url: "routes/users/delete.php",
                data: {
                    "cpf":cpf,
                },
                dataType: "json",
                success: function (response) {
                    loadAllUsers();
                }
            });
        }, function() {});
    });
    button.appendChild(span);

    const td = document.createElement("td");
    td.id = "icon";
    td.appendChild(button);

    return td;
}

function addNewRowToTable(table, data) {
    const cpf = data["cpf"];
    const fullName = data["full_name"];
    let lastAccess = data["last_access"];

    if (lastAccess != "N/A")
        lastAccess = formatToFullStringDate(lastAccess);

    const tdIconImg = getTdPicture();
    const tdTypeUser = getTd(data["type_user"], "type-user");
    const tdFullName = getTd(fullName);
    const tdContact = getTd(data["contact"]);
    const tdLastAccess = getTd(lastAccess, "last-access"); 
    const tdInfo = getTdInfo(cpf);
    const tdDel = getTdDel(cpf, fullName);

    const tr = document.createElement("tr");
    tr.appendChild(tdIconImg);
    tr.appendChild(tdTypeUser);
    tr.appendChild(tdFullName);
    tr.appendChild(tdContact);
    tr.appendChild(tdLastAccess);
    tr.appendChild(tdInfo);
    tr.appendChild(tdDel);

    table.appendChild(tr);
}

async function removeRowsFromTable(table) {
    for (let index = 2; index < table.childNodes.length; index++) {
        const element = table.childNodes[index];
        table.removeChild(element);
        index = 1;
    }
}

export async function loadAllUsers() {
    const table = document.getElementById("table");

    await removeRowsFromTable(table);

    $.ajax({
        type: "GET",
        url: "routes/users/load_all.php",
        dataType: "json",
        success: function (response) {
            response.forEach(data => {
                addNewRowToTable(table, data);
            });
        },
        error: function(request, status, error) {
            alert(request.responseText);
        }
    });
}