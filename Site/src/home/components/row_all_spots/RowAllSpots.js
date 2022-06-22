export default function RowAllSpots(props) {
    const data = props.data;

    return (
        <tr>
            <td></td>
            <td>{data.full_name}</td>
            <td>{data.hours} hrs</td>
        </tr>
    );
}