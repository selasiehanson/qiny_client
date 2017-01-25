import moment from 'moment';

export const dateHelpers = {
    fullDate(date) { return moment(date).format('MMM Do YYYY, HH:mm:ss') },
    dateWithHourMinAndAm(date) { return moment(date).format('MMM Do YYYY, h:mm a') },
    dateWithHourMin(date) { return moment(date).format('MMM Do YYYY, h:mm') },
    simpleDate(date) { return moment(date).format("YYYY-MM-DD") },
    simpleHumanDate(date) { return moment(date).format("MMM Do, YYYY") },
    dateAsYYMMDDWithSlahes(date) { return moment(date).format("YYYY/MM/DD") }
};
