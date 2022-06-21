import { cpf, loadUser, fileName } from '../../../singletons/session.js';
import { fullname, typeUser, typeUsers } from '../../../singletons/session.js';
import { stringIsEmpty } from '../../../services/string_service.js';

loadUser();

if (cpf == 0) {
    window.location.href = "index.html";
} else {
    $.ajax({
        type: "GET",
        url: "view/shared/menu/menu.html",
        success: function (response) {
            $("#panelMenu").html(response);

            document.getElementById('userFullName').textContent = fullname;
            document.getElementById('userType').textContent = typeUser;
            document.getElementById('photoMenu').setAttribute('src', 'assets/images/img_account.png');
            
            if (fileName != 'null') {
                if (stringIsEmpty(fileName) == false) {
                    document.getElementById('photoMenu').setAttribute('src', fileName);
                }
            }

            if (typeUser != typeUsers.ADMINISTRADOR) {
                const e = document.getElementById("addUsers");
                e.parentElement.removeChild(e);
            }
        },
        error: function(request, status, error) {
            alert(request.responseText);
        }
    });
}