import Menu from "../components/menu/Menu";
import { useContext, useEffect, useState } from 'react';
import Context from '../Context/Context';
import './css/Controls.min.css';
import './css/Body.min.css';
import './css/Graph.min.css';
import './css/TableAllSpot.min.css';
import './css/TableSpot.min.css';
import QuestionDialog from "../dialogs/question_dialog/QuestionDialog";
import RowSpots from "./components/row_spots/RowSpots";
import RowAllSpots from "./components/row_all_spots/RowAllSpots";

export default function Home() {

    const [usuario] = useContext(Context);
    const [spots, setSpots] = useState([]);
    const [allSpots, setAllSpots] = useState([]);
    const [startDate, setStartDate] = useState(Date());
    const [endDate, setEndDate] = useState(Date());
    const [timeSpot, setTimeSpot] = useState('');

    useEffect(() => {
        setStartDate(getMonday(startDate));
        setEndDate(addDays(startDate, 6));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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

    useEffect(() => {
        const start = formatFullStringToShortDate(startDate);
        const end = formatFullStringToShortDate(endDate);

        const data = {
            "start_date" : start,
            "end_date": end
        };

        fetch('http://localhost/beat-time/API/routes/spots/get_values_week_all_users.php', {
            method: 'POST',
            body: JSON.stringify(data),
        }).then(async (response) => {
            const json = await response.json();
            setAllSpots(json);
        }).catch((error) => {
            console.log(error);
        });
    }, [startDate, endDate]);

    function formatFullStringToShortDate(value) {
        const date = new Date(value);
        const dateString = date.toISOString();
        const arrayDate = dateString.split('T');
        return arrayDate[0];
    }

    useEffect(() => {
        const value = getStringTime(startDate);
        setTimeSpot(value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [startDate]);

    function getStringTime(date) {
        const monday = getMonday(date);
        const sunday = addDays(monday, 6);
    
        const shortMonday = formatToShortStringDate(monday);
        const shortSunday = formatToShortStringDate(sunday);
        let time = `${shortMonday} à ${shortSunday}`;
    
        return time;
    }

    function formatToShortStringDate(value) {
        const date = Date.parse(value);
        const options = {
            month: "2-digit",
            day: "2-digit",
            year: "numeric",
        };
        const dateFormat = new Intl.DateTimeFormat("pt-BR", options);
        return dateFormat.format(date);
    }

    function getMonday(date) {
        date = new Date(date);
        let day = date.getDay();
        const diff = date.getDate() - day + (day === 0 ? -6:1);
        return new Date(date.setDate(diff));
    }

    function addDays(date, days) {
        let d = new Date(date);
        d.setDate(d.getDate() + days);
        return d;
    }

    const onTimeSpotLeft = () => {
        setStartDate(addDays(startDate, -7));
        setEndDate(addDays(startDate, 6));
    }

    const onTimeSpotRight = () => {
        setStartDate(addDays(startDate, 7));
        setEndDate(addDays(startDate, 6));
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
                                    <thead>
                                        <tr>
                                            <th className="icon"></th>
                                            <th>Nome</th>
                                            <th>Horas Trabalhadas</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        { allSpots.map((x) => <RowAllSpots data={x}/>) }
                                    </tbody>
                                </table>
                            </div>

                            <div className="top">
                                <div className="timeValue">
                                    <button id="timeSpotLeft" onClick={onTimeSpotLeft}>
                                        <span className="material-icons">arrow_back_ios</span>
                                    </button>
                                    <span id="timeSpotValue">{timeSpot}</span>
                                    <button id="timeSpotRight" onClick={onTimeSpotRight}>
                                        <span className="material-icons">arrow_forward_ios</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </section>
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

            <script type="module" src="view/shared/menu/menu.js"></script>
            <script type="module" src="view/main/js/main.js"></script>
            <script type="module" src="view/main/js/graph.js"></script>

            <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.mask/1.14.10/jquery.mask.js"></script>
        </div>
    );
}