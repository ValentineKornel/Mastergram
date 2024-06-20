
const postApi = {

    createNewPost(post){
        const token = localStorage.getItem('token');
        return fetch('http://localhost:8080/master/createPost', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            credentials: 'include',
            body: JSON.stringify(post),
        });
    },

    getPosts(){
        const token = localStorage.getItem('token');
        return fetch('http://localhost:8080/master/getPosts', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            credentials: 'include',
        });
    },

    getPosts(id){
        const token = localStorage.getItem('token');
        return fetch(`http://localhost:8080/client/getPosts?id=${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            credentials: 'include',
        });
    },

}

export default postApi;