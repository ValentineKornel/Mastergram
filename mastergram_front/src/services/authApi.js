


const authApi = {

    login(username, password){

        const loginRequest = {
            username: username,
            password: password
        };

        return fetch('http://localhost:8080/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginRequest),
        })
    },
    
    signUp(registerData){
        
        return fetch('http://localhost:8080/auth/sign-up',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(registerData)
        });
    }
}

export default authApi;