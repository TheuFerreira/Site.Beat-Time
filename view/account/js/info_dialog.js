export function showInfoDialog() {
    document.getElementById("infoDialog").style.transform = "scale(1)";

    $("#okayInfoDialog").click(function (e) { 
        e.preventDefault();
        closeInfoDialog();
    });
}

function closeInfoDialog() {
    $("#okayInfoDialog").off();
    document.getElementById("infoDialog").style.transform = "scale(0)";
}