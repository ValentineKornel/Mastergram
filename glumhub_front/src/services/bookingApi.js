

const bookingApi = {

    createBooking(servce){
        const token = localStorage.getItem('token');
        return fetch('http://localhost:8080/master/createBooking', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            credentials: 'include',
            body: JSON.stringify(servce),
        });
    },

    getMonthBookings(date){
        const token = localStorage.getItem('token');
        const formattedDate = formatDate(date);
        return fetch(`http://localhost:8080/master/monthBookings?date=${formattedDate}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            credentials: 'include',
        });
    },

    getMonthBookingsClient(id, date){
        const token = localStorage.getItem('token');
        const formattedDate = formatDate(date);
        return fetch(`http://localhost:8080/client/masterMonthBookings?id=${id}&date=${formattedDate}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            credentials: 'include',
        });
    },

    getDayBookings(date){
        const token = localStorage.getItem('token');
        const formattedDate = formatDate(date);
        return fetch(`http://localhost:8080/master/dayBookings?date=${formattedDate}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            credentials: 'include',
        });
    },

    getDayBookingsClient(id, date){
        const token = localStorage.getItem('token');
        const formattedDate = formatDate(date);
        return fetch(`http://localhost:8080/client/masterDayBookings?id=${id}&date=${formattedDate}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            credentials: 'include',
        });
    }
}

function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');//padStart добавляет ведущий ноль, если месяц < 10
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
    }

export default bookingApi;