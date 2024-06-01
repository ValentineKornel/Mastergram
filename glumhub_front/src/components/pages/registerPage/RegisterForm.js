import { Link, redirect } from "react-router-dom";
import styles from './RegisterForm.module.css'
import { useState } from "react";


const RegisterForm = () => {


    const [message, setMessage] = useState();

    const register = async (event) =>{

        event.preventDefault();

        const registerRequest = {
            username: "eva",
            password: "12345",
            email: "val@gmail.com",
            firstName: "eva",
            secondName: "eva",
            tel: "+375445514885"
        };

        try{
            const response = await fetch('http://localhost:8080/auth/sign-up',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(registerRequest)
            });

            if(response.ok){
                const result = await response.json();
                alert(result.token);
                localStorage.setItem('token', result.token);

            } else {
                console.error("Unexpected error:", response.statusText);
                setMessage(response.statusText);
            }
        }catch (error) {
            console.error("Error during registration:", error);
        }
    }


    return( 
        <form>
            <label id={styles.titleLabel}>GlumHub</label>
            <Link id={styles.loginLink} to='/login'>Log in</Link>

            <input type="text" placeholder="username"/>
            <input type="text" placeholder="first name"/>
            <input type="text" placeholder="second name"/>
            <input type="password" placeholder="password"/>
            <input type='email' placeholder="email"/>
            <input type='tel' placeholder="phone number"/>
            <button onClick={register} id={styles.registerButton}>REGISTER</button>
            {
                message !== null ? <label id={styles.messageLabel}>{message}</label> : null
            }
        </form>
    )
}

export default RegisterForm;