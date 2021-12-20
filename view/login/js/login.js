import { stringIsEmpty } from '../../../services/string_service.js';
import { setUser } from '../../../singletons/session.js';

function login(e) {
    e.preventDefault();

    const userName = document.getElementById("userName").value;
    const password = document.getElementById("password").value;
    const loginError = document.getElementById("loginError");

    if (stringIsEmpty(userName) || stringIsEmpty(password)) {
        loginError.style.display = "block";
        return;
    }

    $.ajax({
        type: "POST",
        url: "routes/users/login.php",
        data: {
            "user_name": userName,
            "password": password
        },
        dataType: "JSON",
        success: async function (response) {
            console.log(response);
            if (response.length == 0) {
                loginError.style.display = "block";
            } else {
                const data = response[0];
                await setUser(data);

                window.location.href = "principal.html";
            }
        },
        error: function(request, status, error) {
            console.log(error);
        }
    });
}

function loadEvents() {
    localStorage.clear();

    $("#btnLogin").click(login);
}

window.onload = loadEvents;