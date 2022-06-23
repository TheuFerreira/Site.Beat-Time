import Menu from "../components/menu/Menu";
import { useContext, useEffect, useState } from 'react';
import Context from '../Context/Context';
import './css/Controls.min.css';
import './css/Body.min.css';
import QuestionDialog from "../dialogs/question_dialog/QuestionDialog";
import TableAllSpots from "./components/table_all_spots/TableAllSpots";
import TableSpots from './components/table_spots/TableSpots';
import Graph from "./components/graph/Graph";

export default function Home() {

    const [usuario] = useContext(Context);
    const [btnContent, setBtnContent] = useState({
        'content': 'Registrar Entrada',
        'type': 1,
    });

    const cpf = usuario.cpf;

    useEffect(() => {
        const currentDate = new Date().toISOString();

        const data = {
            'cpf': cpf,
            'date': currentDate,
        };

        fetch('http://localhost/beat-time/API/routes/spots/get_last_by_cpf.php', {
            method: 'POST',
            body: JSON.stringify(data),
        }).then(async (response) => {
            const json = await response.json();
            console.log(json);
            if (json.length === 0) {
                setBtnContent({
                    'content': 'Registrar Entrada',
                    'type': 1,
                });
            } else {
                if (data['id_type_spot'] === '1') {
                    setBtnContent({
                        'content': 'Registrar Saída',
                        'type': 2,
                    });
                } else {
                    setBtnContent({
                        'content': 'Registrar Entrada',
                        'type': 1,
                    });
                }
            }
        }).catch((error) => {
            console.log(error);
        });
    }, [cpf]);

    const onTapNewSpot = () => {
        const type = btnContent['type'];
        if (type === 1) {
            setSpot();
        } else {
            setSpot();
        }
    }

    function setSpot() {
        let currentDate = new Date().toISOString();
        const data = {
            'cpf': parseInt(cpf),
            'date': currentDate.slice(0, currentDate.length - 5),
            'type_spot': btnContent['type'],
        };

        fetch('http://localhost/beat-time/API/routes/spots/insert_spot.php', {
            method: 'POST',
            body: JSON.stringify(data),
        }).then(async (response) => {
            const json = await response.json();
            console.log(json);
        }).catch((error) => {
            console.log(error);
        });
    }

    return (
        <div>
            <link rel="stylesheet" href="view/shared/question_dialog/question_dialog.css"/>

            <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"/>
            <link rel="preconnect" href="https://fonts.googleapis.com"/>
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true"/>
            <link href="https://fonts.googleapis.com/css2?family=Poppins&display=swap" rel="stylesheet"/>  
            
            <Menu id="panelMenu" fullname={usuario.full_name} description={usuario.description}/>

            <div id="controls">
                <button type="button" id="btnNewSpot" onClick={onTapNewSpot}>{btnContent['content']}</button>
            </div>

            <div id="middle">
                <aside>
                    <Graph/>
                    <TableAllSpots/>
                </aside>
            
                <TableSpots cpf={usuario.cpf}/>
            </div>

            <QuestionDialog id='panelQuestionDialog'/>

            <script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>

            <script type="module" src="view/main/js/main.js"></script>
            <script type="module" src="view/main/js/graph.js"></script>
        </div>
    );
}