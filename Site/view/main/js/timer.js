import { addDays, getMonday, formatToShortStringDate } from '../../../services/date_service.js';

export function getStringTime(date) {
    const monday = getMonday(date);
    const sunday = addDays(monday, 6);

    const shortMonday = formatToShortStringDate(monday);
    const shortSunday = formatToShortStringDate(sunday);
    let time = `${shortMonday} à ${shortSunday}`;

    return time;
}