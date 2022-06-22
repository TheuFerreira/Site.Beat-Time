import { useEffect, useState } from "react";
import './css/TableSpot.min.css';

export default function TableSpots(props) {

    const [spots, setSpots] = useState([]);

    const cpf = props.cpf;

    useEffect(() => {
        const data = {
            'cpf': cpf
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
    }, [cpf]);

    const rowTable = (data) => {
        return (
            <tr key={data}>
                <td className='icon'>
                    <span className='material-icons'>{ data.description === 'Entrada' ? 'login' : 'exit_to_app' }</span>
                </td>
                <td>{data.description}</td>
                <td>{formatToFullStringDate(data.date)}</td>
            </tr>
        );
    }

    function formatToFullStringDate(value) {
        const date = new Date(Date.parse(value));
        let currentDate = new Date();
        
        const dateToCompare = new Date(Date.parse(value)).setHours(0, 0, 0, 0);
        currentDate = currentDate.setHours(0, 0, 0, 0);
    
        if (dateToCompare === currentDate) {
            const hour = date.getHours().toString().padStart(2, '0');
            const minute = date.getMinutes().toString().padStart(2, '0');
            return `Hoje às ${hour}:${minute}`;
        } else {
            let value = currentDate - dateToCompare;
            const dayInMinutes = 86400000;
            const previousDays = value / dayInMinutes;
            
            if (previousDays === 1) {
                const hour = date.getHours().toString().padStart(2, '0');
                const minute = date.getMinutes().toString().padStart(2, '0');
                return `Ontem às ${hour}:${minute}`;
            } else if (previousDays >= 2 && previousDays <= 6) {
                const options = {
                    weekday: "long",
                    hour: "numeric",
                    hour12: false,
                    minute: "numeric",
                };
                const dateFormat = new Intl.DateTimeFormat("pt-BR", options);
                return dateFormat.format(date);
            }
        }
    
        const options = {
            month: "numeric",
            day: "2-digit",
            year: "numeric",
            hour: "numeric",
            hour12: false,
            minute: "numeric",
        };
        const dateFormat = new Intl.DateTimeFormat("pt-BR", options);
        return dateFormat.format(date);
    }

    return (
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
                    { spots.map((x) => rowTable(x)) }
                </tbody>
            </table>
        </div>
    );
}