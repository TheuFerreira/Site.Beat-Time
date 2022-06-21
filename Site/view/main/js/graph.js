import { getStringTime } from '../js/timer.js';
import { addDays, getMonday, formatFullStringToShortDate } from '../../../services/date_service.js';
import { cpf } from '../../../singletons/session.js';

export function loadGraph() {
    google.charts.load('current', {'packages':['bar']});
    google.charts.load('current', {'packages':['corechart']});
    google.charts.setOnLoadCallback(loadTimer);

    loadOptions();

    $("#buttonGraphOptions").click(function (e) { 
        e.preventDefault();
        onOptionsClick();
    });
}

let isOn = false;
let date = new Date();

function loadTimer() {
    updateTimer();
    getValuesOfChart();

    $("#timeLeft").click(function (e) { 
        e.preventDefault();
        date = addDays(date, -7);
        updateTimer();
        getValuesOfChart();
    });

    $("#timeRight").click(function (e) { 
        e.preventDefault();
        date = addDays(date, 7);
        updateTimer();
        getValuesOfChart();
    });
}

function updateTimer() {
    const timeValue = document.getElementById("timeValue");
    timeValue.innerHTML = getStringTime(date);
}

function getValuesOfChart() {
    const monday = formatFullStringToShortDate(getMonday(date));
    
    $.ajax({
        type: "POST",
        url: "routes/spots/get_values_week_by_cpf.php",
        data: {
            "cpf": cpf,
            "date": monday, 
        },
        dataType: "json",
        success: function (response) {
            const values = response[0];

            let data = google.visualization.arrayToDataTable([
                ['Dias da Semana', 'Horas Trabalhadas'],
                ['Segunda', parseInt(values[0])],
                ['Terça', parseInt(values[1])],
                ['Quarta', parseInt(values[2])],
                ['Quinta', parseInt(values[3])],
                ['Sexta', parseInt(values[4])],
                ['Sábado', parseInt(values[5])],
                ['Domingo', parseInt(values[6])]
            ]);

            drawChart(data);
        },
        error: function (request, state, error) {
            alert(error);
            console.log('erro');
        }
    });
    

}

function onOptionsClick() {
    isOn = !isOn;

    const graphOptions = document.getElementById("graphOptions");
    graphOptions.style.display = isOn ? "block" : "none";
}

let graphSelected = 0;

function loadOptions() {

    const ul = document.getElementById("ulGraphOptions");
    types.forEach((e) => {
        const icon = document.createElement("span");
        icon.innerText = e.icon;
        icon.className = "material-icons";

        const title = document.createElement("span");
        title.innerText = e.title;

        let index = types.indexOf(e);
        const input = document.createElement("input");
        input.style.all = "unset;"
        input.style.width = "0px";
        input.style.height = "0px";
        input.style.border = "none";
        input.type = "checkbox";
        $(input).prop("checked", graphSelected == index);

        const li = document.createElement("li");
        li.appendChild(input);
        li.appendChild(icon);
        li.appendChild(title);

        li.addEventListener("click", function (e) {
            graphSelected = index;

            unselectAllInputs(ul);
            selectTypeGraph(this);
            onOptionsClick();
            getValuesOfChart();
        });

        ul.appendChild(li);
    });

}

function unselectAllInputs(ul) {
    ul.childNodes.forEach((li) => {
        const input = li.childNodes[0];
        $(input).prop("checked", false);
    });
}

function selectTypeGraph(li) {
    const input = li.childNodes[0];
    $(input).prop("checked", true);
}

function drawChart(data) {
    if (graphSelected == 0) {
        drawColumn(data);
    } else if (graphSelected == 1) {
        drawPie(data);
    } else if (graphSelected == 2) {
        drawBar(data);
    } else if (graphSelected == 3) {
        drawLine(data);
    }
}

function drawColumn(data) {
    var options = {
        legend: { position: 'none' },
    };

    var chart = new google.charts.Bar(document.getElementById('local_chart'));

    chart.draw(data, google.charts.Bar.convertOptions(options));
}

function drawPie(data) {
    var options = {
        title: 'Dias da Semana',
    };

    var chart = new google.visualization.PieChart(document.getElementById('local_chart'));

    chart.draw(data, options);
}

function drawBar(data) {
    var view = new google.visualization.DataView(data);
    
    var options = {
      title: "Dias da Semana",
      legend: { position: "none" },
    };
    var chart = new google.visualization.BarChart(document.getElementById("local_chart"));
    chart.draw(view, options);
}

function drawLine(data) {
    var options = {
      title: 'Dias da Semana',
      curveType: 'function',
      legend: { position: 'none' }
    };

    var chart = new google.visualization.LineChart(document.getElementById('local_chart'));

    chart.draw(data, options);
}

const types = 
[
    {
        "icon": "bar_chart",
        "title": "Gráfico de Colunas"
    },
    {
        "icon": "donut_large",
        "title": "Gráfico de Pizza"
    },
    {
        "icon": "align_horizontal_left",
        "title": "Gráfico de Barras"
    },
    {
        "icon": "show_chart",
        "title": "Gráfico de Linhas"
    }
];