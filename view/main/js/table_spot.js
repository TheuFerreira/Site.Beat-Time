import { cpf } from '../../../singletons/session.js'
import { formatToFullStringDate } from '../../../services/date_service.js';
import { TypeSpot } from '../../shared/js/type_spot.js';

async function clearTable(table) {
    for (let i = 2; i < table.childNodes.length; i++) {
        const child = table.childNodes[i];
        table.removeChild(child);
        i = 1;
    }
}

function addTdIcon(description) {
    const span = document.createElement("span");
    span.className = "material-icons";
    if (description == TypeSpot.Entrada) {
        span.textContent = "login";
    } else if (description == TypeSpot.Saída) {
        span.textContent = "exit_to_app";
    }

    const td = document.createElement("td");
    td.className = "icon";
    td.appendChild(span);

    return td;
}

function addTd(text) {
    const td = document.createElement("td");
    td.textContent = text;

    return td;
}

function insertRowInTable(table, data) {
    const description = data['description'];
    let date = data['date'];

    date = formatToFullStringDate(date);

    const tdIcon = addTdIcon(description);
    const tdDescription = addTd(description);
    const tdDate = addTd(date);

    const tr = document.createElement("tr");
    tr.appendChild(tdIcon);
    tr.appendChild(tdDescription);
    tr.appendChild(tdDate);

    table.appendChild(tr);
}

export async function loadAllSpots() {
    const table = document.getElementById("table");

    await clearTable(table);

    $.ajax({
        type: "POST",
        url: "routes/spots/get_all_by_cpf.php",
        data: {
            "cpf": cpf,
        },
        dataType: "json",
        success: function (array) {
            array.forEach(data => {
                insertRowInTable(table, data);
            });
        },
        error: function(request, state, error) {
            alert(request.responseText);
        }
    });
}