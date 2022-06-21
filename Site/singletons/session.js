export const typeUsers = {
    'ADMINISTRADOR' : 'Administrador',
    'USUÁRIO' : 'Usuário'
}

export let fileName = null;
export let cpf = 0;
export let fullname = "";
export let typeUser = typeUsers.ADMINISTRADOR;

export async function setUser(data) {
    fileName = data['file_name'];
    cpf = data['cpf'];
    fullname = data['full_name'];
    typeUser = data['description'];

    localStorage.setItem('file_name', fileName);
    localStorage.setItem('cpf', cpf);
    localStorage.setItem('full_name', fullname);
    localStorage.setItem('description', typeUser);
}

export async function loadUser() {
    fileName = localStorage.getItem('file_name');
    cpf = localStorage.getItem('cpf');
    fullname = localStorage.getItem('full_name');
    typeUser = localStorage.getItem('description');
}