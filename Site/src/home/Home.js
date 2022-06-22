import Menu from "../components/menu/Menu";
import { useContext, useEffect, useState } from 'react';
import Context from '../Context/Context';
import './css/Controls.min.css';
import './css/Body.min.css';
import './css/Graph.min.css';
import './css/TableSpot.min.css';
import QuestionDialog from "../dialogs/question_dialog/QuestionDialog";
import RowSpots from "./components/row_spots/RowSpots";
import TableAllSpots from "./components/table_all_spots/TableAllSpots";

export default function Home() {

    const [usuario] = useContext(Context);
    const [spots, setSpots] = useState([]);

    useEffect(() => {
        const data = {
            'cpf': usuario.cpf
        };

        fetch('http://localhost/beat-time/API/routes/spots/get_all_by_cpf.php', {
            method: 'POST',
            body: JSON.stringify(data),
        }).then(async (response) => {
            const json = await response.json();
            setSpots(json);
        }).catch((error) => {
            console.log(error);
        });
    }, [usuario.cpf]);

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
            
                    <TableAllSpots/>
                </aside>
            
                <div className="container" id="bgTableSpot">
                    <table id="table">
                        <thead>
                            <tr>
                                <th className="icon"></th>
                                <th>Tipo</th>
                                <th>Data</th>
                            </tr>
                        </thead>

                        <tbody>
                            { spots.map((x) => <RowSpots data={x}/>) }
                        </tbody>
                    </table>
                </div>
            </div>

            <QuestionDialog id='panelQuestionDialog'/>

            <script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>

            <script type="module" src="view/main/js/main.js"></script>
            <script type="module" src="view/main/js/graph.js"></script>
        </div>
    );
}