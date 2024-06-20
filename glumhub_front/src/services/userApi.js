const userApi = {
    getCurrentUserInfo(){

        const token = localStorage.getItem('token');
        return fetch('http://localhost:8080/client/currentUserInfo', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            credentials: 'include'
        });
    },

    updateClientInfo(user){
        const token = localStorage.getItem('token');
        return fetch('http://localhost:8080/client/updateUserInfo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            credentials: 'include',
            body: JSON.stringify(user),
        });
    },

    updateMasterInfo(user){
        const token = localStorage.getItem('token');
        return fetch('http://localhost:8080/master/updateMasterInfo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            credentials: 'include',
            body: JSON.stringify(user),
        });
    },
    searchMasters(searchText){
        const token = localStorage.getItem('token');
        return fetch(`http://localhost:8080/client/searchMasters?searchText=${searchText}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            credentials: 'include'
        });
    },

    getMasterInfo(id){
        console.log(id);
        const token = localStorage.getItem('token');
        return fetch(`http://localhost:8080/client/masterInfo?id=${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            credentials: 'include'
        });
    },
    
}

export default userApi;