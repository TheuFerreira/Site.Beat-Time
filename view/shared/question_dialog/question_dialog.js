export function loadQuestionDialog() {
    $.ajax({
        type: "GET",
        url: "view/shared/question_dialog/question_dialog.html",
        success: function (response) {
            $("#panelQuestionDialog").html(response);
        }
    });
}

export function showQuestionDialog(title, description, yes, no) {
    document.getElementById("questionDialog").style.transform = "scale(1)";

    document.getElementById("popupTitle").textContent = title;
    document.getElementById("popupDescription").textContent = description;

    $("#yesQuestionDialog").click(function (e) { 
        e.preventDefault();
        
        yes();
        closeQuestionDialog();
    });

    $("#noQuestionDialog").click(function (e) { 
        e.preventDefault();
        
        no();
        closeQuestionDialog();
    });
}

function closeQuestionDialog() {
    $("#yesQuestionDialog").off();
    $("#noQuestionDialog").off();
    document.getElementById("questionDialog").style.transform = "scale(0)";
}
