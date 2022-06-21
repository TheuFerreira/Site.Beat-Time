import { cpf } from '../../../singletons/session.js'
import { loadQuestionDialog, showQuestionDialog } from '../../shared/question_dialog/question_dialog.js';
import { loadAllSpots } from './table_spot.js';

let idTypeSpot = 0;

export function loadControls(){
    loadQuestionDialog();
    setNewButtonSpot();

    $("#btnNewSpot").click(function (e) { 
        e.preventDefault();
        setEnterSpot();
    });
}

function setNewButtonSpot() {
    const currentDate = new Date().toISOString();

    $.ajax({
        type: "POST",
        url: "routes/spots/get_last_by_cpf.php",
        data: {
            'cpf': cpf,
            'date': currentDate,
        },
        dataType: "json",
        success: function (response) {
            const btnNewSpot = document.getElementById('btnNewSpot');

            if (response.length == 0) {
                btnNewSpot.textContent = "Registrar Entrada";

                idTypeSpot = 1;
            } else {
                const data = response[0];
                if (data['id_type_spot'] == 1) {
                    btnNewSpot.textContent = "Registrar Saída";

                    idTypeSpot = 2;
                } else {
                    btnNewSpot.textContent = "Registrar Entrada";

                    idTypeSpot = 1;
                }
            }

            loadAllSpots();
        },
        error: function (request, state, error) {
            alert(request.responseText);
        }
    });
}

function setEnterSpot() {
    if (idTypeSpot == 1) {
        const title = "Confirmação de Registro de Entrada";
        const description = "Tem certeza de que deseja bater o ponto de entrada?";

        showQuestionDialog(title, description, setSpot, function () {});
    } else {
        const title = "Confirmação de Registro de Saída";
        const description = "Tem certeza de que deseja bater o ponto de saída?";

        showQuestionDialog(title, description, setSpot, function () {});
    }
}

function setSpot() {
    let currentDate = new Date().toISOString();

    $.ajax({
        type: "POST",
        url: "routes/spots/insert_spot.php",
        data: {
            'cpf': cpf,
            'date': currentDate,
            'type_spot': idTypeSpot,
        },
        dataType: "json",
        success: function (response) {
            setNewButtonSpot();
        },
        error: function (request, state, error) {
            alert(request.responseText);
        }
    });
}