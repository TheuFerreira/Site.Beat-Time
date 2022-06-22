import { useEffect, useState } from "react";
import './css/TableAllSpot.min.css';

export default function TableAllSpots(props) {

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

    const rowTable = (data) => {
        return (
            <tr key={data}>
                <td></td>
                <td>{data.full_name}</td>
                <td>{data.hours} hrs</td>
            </tr>
        );
    }

    return (
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
                            { allSpots.map((x) => rowTable(x)) }
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
    );
}