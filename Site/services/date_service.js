export function formatToShortStringDate(value) {
    const date = Date.parse(value);
    const options = {
        month: "numeric",
        day: "2-digit",
        year: "numeric",
    };
    const dateFormat = new Intl.DateTimeFormat("pt-BR", options);
    return dateFormat.format(date);
}

export function formatToStringDate(value) {
    const date = Date.parse(value);
    const options = {
        month: "long",
        day: "2-digit",
        year: "numeric",
    };
    const dateFormat = new Intl.DateTimeFormat("pt-BR", options);
    return dateFormat.format(date);
}

export function formatToFullStringDate(value) {
    const date = new Date(Date.parse(value));
    let currentDate = new Date();
    
    const dateToCompare = new Date(Date.parse(value)).setHours(0, 0, 0, 0);
    currentDate = currentDate.setHours(0, 0, 0, 0);

    if (dateToCompare == currentDate) {
        const hour = date.getHours().toString().padStart(2, '0');
        const minute = date.getMinutes().toString().padStart(2, '0');
        return `Hoje às ${hour}:${minute}`;
    } else {
        let value = currentDate - dateToCompare;
        const dayInMinutes = 86400000;
        const previousDays = value / dayInMinutes;
        
        if (previousDays == 1) {
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

export function formatFullStringToShortDate(value) {
    const date = new Date(value);
    const dateString = date.toISOString();
    const arrayDate = dateString.split('T');
    return arrayDate[0];
}

export function getMonday(date) {
    date = new Date(date);
    let day = date.getDay();
    const diff = date.getDate() - day + (day == 0 ? -6:1);
    return new Date(date.setDate(diff));
}

export function addDays(date, days) {
    let d = new Date(date);
    d.setDate(d.getDate() + days);
    return d;
}