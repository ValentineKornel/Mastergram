import { Link, redirect, useNavigate } from "react-router-dom";
import styles from './editProfileForm.module.css';
import { useContext, useEffect, useState } from "react";
import authApi from "../../../services/authApi";
import userApi from "../../../services/userApi";
import { UserContext } from "../../../layouts/MainLaout";


const EditProfileForm = () => {

    const navigate = useNavigate();
    const [message, setMessage] = useState();

    const {user, setUser} = useContext(UserContext);

    const onChangeFirstNname = (event) => {
        setUser({...user, firstName:event.target.value});
    }
    const onChangeSecondNname = (event) => {
        setUser({...user, secondName:event.target.value});
    }
    const onChangeUsername = (event) => {
        setUser({...user, username:event.target.value});
    }
    const onChangeEmail = (event) => {
        setUser({...user, email:event.target.value});
    };
    const onChangeTel = (event) => {
        setUser({...user, tel:event.target.value});
    };
    const onChangeImage = (event) => {
        const file = event.target.files[0];

        const reader = new FileReader();
        reader.onload = (e) => {
        const profileImageBase64 = e.target.result;
        setUser((prevUser) => ({ ...prevUser, base64Image: profileImageBase64 }));
        };
        reader.readAsDataURL(file);
        
    }

    const updateUserInfo = async (event) => {
        event.preventDefault();
        try {
            const response = await userApi.updateUserInfo(user);
            if (response.ok) {
                console.log('updated successfully');
                navigate('/');
            } else {
                const result = response.text();
                setMessage(result);
                console.log(result);
            }
        } catch (error) {
            console.error("Error during rquest:", error);
            navigate('/error');
        }
    }

    return( 
        <form id={styles.editProfileForm}>

            <div id={styles.changeAvatarDiv}>
            <div id={styles.avatarDiv}>
                {user.base64Image && user.base64Image.length > 30 ? (
                    <img id="avatar" className={styles.avatar} src={user.base64Image} alt='user'/>
                ) : (
                    <img id="avatar" className={styles.avatar} src={`${process.env.PUBLIC_URL}/defaultUser.png`} alt='user'/>
                )}
            </div>
            
            <label id={styles.changeAvatarButton} htmlFor="fileInput">Load image</label>
            <input onChange={onChangeImage} style={{visibility:'hidden'}} id="fileInput" type="file" accept="image/*"/>
            </div>

            <input onChange={onChangeUsername} value={user.username} type="text" placeholder="username"/>
            <input onChange={onChangeFirstNname} value={user.firstName} type="text" placeholder="first name"/>
            <input onChange={onChangeSecondNname}value={user.secondName} type="text" placeholder="second name"/>
            <input onChange={onChangeEmail} value={user.email} type='email' placeholder="email"/>
            <input onChange={onChangeTel} value={user.tel} type='tel' placeholder="phone number"/>
            <button onClick={updateUserInfo} type="submit" id={styles.registerButton}>Save changes</button>
            {
                message !== null ? <label id={styles.messageLabel}>{message}</label> : null
            }
        </form>
    )
}

export default EditProfileForm;