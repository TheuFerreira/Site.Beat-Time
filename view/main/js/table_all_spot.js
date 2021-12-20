import { getStringTime } from '../js/timer.js';
import { getMonday, addDays, formatFullStringToShortDate } from '../../../services/date_service.js';

let startDate = Date();
let endDate = Date();

export async function loadTableAllSpot() {
    await loadWeek();
    loadSpots(startDate, endDate);
}

async function loadWeek() {
    startDate = getMonday(startDate);
    endDate = addDays(startDate, 6);

    updateTimer();

    $("#timeSpotLeft").click(function (e) { 
        e.preventDefault();
        startDate = addDays(startDate, -7);
        endDate = addDays(startDate, 6);

        updateTimer();
        loadSpots(startDate, endDate);
    });

    $("#timeSpotRight").click(function (e) { 
        e.preventDefault();
        startDate = addDays(startDate, 7);
        endDate = addDays(startDate, 6);

        updateTimer();
        loadSpots(startDate, endDate);
    });
}

function updateTimer() {
    const timeSpotValue = document.getElementById("timeSpotValue");
    timeSpotValue.innerHTML = getStringTime(startDate);
}

async function loadSpots(start, end) {
    start = formatFullStringToShortDate(start);
    end = formatFullStringToShortDate(end);

    await clearTable();
    $.ajax({
        type: "POST",
        url: "routes/spots/get_values_week_all_users.php",
        data: {
            "start_date" : start,
            "end_date": end
        },
        dataType: "JSON",
        success: function (array) {
            array.forEach(element => {
                addRow(element);
            });
        }, 
        error: function(request, state, error) {
            alert(request.responseText);
        }
    });
}

async function clearTable() {
    const tableAll = document.getElementById('tableAll');

    for (let i = 2; i < tableAll.childNodes.length; i++) {
        let child = tableAll.childNodes[i];
        tableAll.removeChild(child);
        i -= 1;
    }

}

function addRow(data) {
    const tableAll = document.getElementById("tableAll");

    const tdIcon = document.createElement("td");
    const tdName = document.createElement("td");
    tdName.textContent = data['full_name'];

    const tdHours = document.createElement("td");
    tdHours.textContent = data['hours'] + ' hrs';

    const tr = document.createElement("tr");
    tr.appendChild(tdIcon);
    tr.appendChild(tdName);
    tr.appendChild(tdHours);

    tableAll.appendChild(tr);
}