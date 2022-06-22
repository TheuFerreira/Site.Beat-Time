import Menu from "../components/menu/Menu";
import { useContext } from 'react';
import Context from '../Context/Context';
import './css/Controls.min.css';
import './css/Body.min.css';
import './css/Graph.min.css';
import './css/TableAllSpot.min.css';
import './css/TableSpot.min.css';

export default function Home() {

    const [usuario] = useContext(Context);

    console.log(usuario);

    return (
        <div>
            <link rel="stylesheet" href="view/shared/question_dialog/question_dialog.css"/>

            <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"/>
            <link rel="preconnect" href="https://fonts.googleapis.com"/>
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true"/>
            <link href="https://fonts.googleapis.com/css2?family=Poppins&display=swap" rel="stylesheet"/>  
            
            <Menu id="panelMenu" fullname={usuario.full_name} description={usuario.description}/>

            <div id="controls">
                <button type="button" id="btnNewSpot"></button>
            </div>

            <div id="middle">
                <aside>
                    <section>
                        <div className="container">
                            <div id="local_chart"></div>

                            <div className="top">
                                <div className="timeValue">
                                    <button id="timeLeft"><span className="material-icons">arrow_back_ios</span></button>
                                    <span id="timeValue"></span>
                                    <button id="timeRight"><span className="material-icons">arrow_forward_ios</span></button>
                                </div>
            
                                <div id="bg-option">
                                    <button id="buttonGraphOptions">
                                        <span className="material-icons">more_vert</span>
                                    </button>
                                    <div className="background" id="graphOptions">
                                        <div className="container">
                                            <ul id="ulGraphOptions"></ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
            
                    <section>
                        <div className="container">
                            <div id="bgTableAllSpot">
                                <table id="tableAll">
                                    <tr>
                                        <th className="icon"></th>
                                        <th>Nome</th>
                                        <th>Horas Trabalhadas</th>
                                    </tr>
                                </table>
                            </div>

                            <div className="top">
                                <div className="timeValue">
                                    <button id="timeSpotLeft"><span className="material-icons">arrow_back_ios</span></button>
                                    <span id="timeSpotValue"></span>
                                    <button id="timeSpotRight"><span className="material-icons">arrow_forward_ios</span></button>
                                </div>
                            </div>
                        </div>
                    </section>
                </aside>
            
                <div className="container" id="bgTableSpot">
                    <table id="table">
                        <tr>
                            <th className="icon"></th>
                            <th>Tipo</th>
                            <th>Data</th>
                        </tr>
                    </table>
                </div>
            </div>

            <div id="panelQuestionDialog"></div>

            <script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>

            <script type="module" src="view/shared/menu/menu.js"></script>
            <script type="module" src="view/main/js/main.js"></script>
            <script type="module" src="view/main/js/graph.js"></script>

            <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.mask/1.14.10/jquery.mask.js"></script>
        </div>
    );
}