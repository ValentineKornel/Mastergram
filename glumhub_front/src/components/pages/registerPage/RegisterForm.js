import { Link, redirect, useNavigate } from "react-router-dom";
import styles from './RegisterForm.module.css'
import { useState } from "react";
import authApi from "../../../services/authApi";


const RegisterForm = () => {

    const navigate = useNavigate();
    const [username, setUsername] = useState();
    const [firstName, setFirstName] = useState();
    const [secondName, setSecondName] = useState();
    const [password, setPassword] = useState();
    const [email, setEmail] = useState();
    const [tel, setTel] = useState();
    const [message, setMessage] = useState();
    const [city, setCity] = useState();

    const onChangeFirstNname = (event) => {
        setFirstName(event.target.value)
    }
    const onChangeSecondNname = (event) => {
        setSecondName(event.target.value)
    }
    const onChangeUsername = (event) => {
        setUsername(event.target.value)
    }
    const onChangePassword = (event) => {
        setPassword(event.target.value);
    };
    const onChangeEmail = (event) => {
        setEmail(event.target.value);
    };
    const onChangeTel = (event) => {
        setTel(event.target.value);
    };
    const onChangeCity = (event) => {
        setCity(event.target.value);
    }

    const register = async (event) =>{
        event.preventDefault();

        const registerData = {
            username: username,
            password: password,
            email: email,
            firstName: firstName,
            secondName: secondName,
            tel: tel,
            city: city
        };

        try{
            const response = await authApi.signUp(registerData);
            const result = await response.json();

            if(response.ok){
                localStorage.setItem('token', result.token);
                navigate('/');
            } else {
                setMessage(result.message);
            }
        }catch (error) {
            console.error("Error during registration:", error);
        }
    }

    return( 
        <form id={styles.registerForm}>
            <label id={styles.titleLabel}>GlumHub</label>
            <Link id={styles.loginLink} to='/auth/login'>Log in</Link>

            <input onChange={onChangeUsername} type="text" placeholder="username"/>
            <input onChange={onChangeFirstNname} type="text" placeholder="first name"/>
            <input onChange={onChangeSecondNname} type="text" placeholder="second name"/>
            <input onChange={onChangeCity} type="text" placeholder="city"/>
            <input onChange={onChangePassword} type="text" placeholder="password"/>
            <input onChange={onChangeEmail} type='email' placeholder="email"/>
            <input onChange={onChangeTel} type='tel' placeholder="phone number"/>
            <button type="submit" onClick={register} id={styles.registerButton}>REGISTER</button>
            {
                message !== null ? <label id={styles.messageLabel}>{message}</label> : null
            }
        </form>
    )
}

export default RegisterForm;