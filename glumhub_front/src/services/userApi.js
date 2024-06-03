const userApi = {
    getCurrentUserInfo(){

        const token = localStorage.getItem('token');
        return fetch('http://localhost:8080/currentUserInfo', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            credentials: 'include'
        });
    },

    updateUserInfo(user){
        const token = localStorage.getItem('token');
        return fetch('http://localhost:8080/updateUserInfo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            credentials: 'include',
            body: JSON.stringify(user),
        });
    } 
}

export default userApi;