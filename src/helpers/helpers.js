import axios from 'axios'
import moment from 'moment'

export function buildHeaders(accessToken) {
    return { Atid: accessToken }
}

export function displayDate(dateStr) {
    return dateStr ? moment(dateStr).format("dddd, DD.MM.YYYY, kk:mm:ss") : '';
}
