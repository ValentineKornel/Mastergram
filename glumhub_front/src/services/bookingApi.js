

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
}

export default bookingApi;