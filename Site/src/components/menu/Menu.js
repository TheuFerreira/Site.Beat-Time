import './css/Menu.min.css';
import ImageAccount from '../../assets/images/img_account.png';

export default function Menu(props) {

    const showAddUsers = () => {
        if (props.description !== 'Administrador') {
            return;
        }
        
        return (
            <li>
                <a href="usuarios.html">
                    <span className="material-icons">group_add</span>
                    <span>Usuários</span>
                </a>
            </li>
        );
    }

    return (
        <nav className="container" id="menuBar">
            <div id="currentUser">
                <div className="user-field" id="pictureBox">
                    <img src={ImageAccount} id="photoMenu" alt="Foto"/>
                </div>
                <div className="user-field" id="userInfo">
                    <span id="userFullName">{props.fullname}</span>
                    <span id="userType">{props.description}</span>
                </div>

                <div id="userSubMenu">
                    <ul className="container">
                        { showAddUsers() }
                        <li>
                            <a href="perfil.html">
                                <span className="material-icons">account_circle</span>
                                <span>Perfil</span>
                            </a>
                        </li>
                        <li>
                            <a href="index.html">
                                <span className="material-icons">logout</span>
                                <span>Sair</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}