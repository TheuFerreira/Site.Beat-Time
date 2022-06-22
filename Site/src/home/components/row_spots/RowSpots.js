export default function RowSpots(props) {

    const data = props.data;

    return (
        <tr>
            <td className='icon'>
                <span className='material-icons'>{ data.description === 'Entrada' ? 'login' : 'exit_to_app' }</span>
            </td>
            <td>{data.description}</td>
            <td>{formatToFullStringDate(data.date)}</td>
        </tr>
    );

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
}