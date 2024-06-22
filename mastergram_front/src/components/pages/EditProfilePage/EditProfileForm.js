import { Link, redirect, useNavigate } from "react-router-dom";
import styles from './editProfileForm.module.css';
import { useContext, useEffect, useState } from "react";
import authApi from "../../../services/authApi";
import userApi from "../../../services/userApi";
import { UserContext } from "../../../layouts/MainLaout";


const EditProfileForm = () => {

    const navigate = useNavigate();
    const [message, setMessage] = useState();

    const {user, setUser, isMaster} = useContext(UserContext);

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
    const onChangeCity = (event) => {
        setUser({...user, city:event.target.value});
    }
    const onChangeDescription = (event) => {
        setUser({...user, masterInfo: {...user.masterInfo, description: event.target.value}});
    }
    const onChangeBusinessAddress = (event) => {
        setUser({...user, masterInfo: {...user.masterInfo, businessAddress: event.target.value}});
    }

    const updateUserInfo = async (event) => {
        event.preventDefault();
        try {
            let updateData = {
            id: user.id,
            username: user.username,
            password: user.password,
            base64Image: user.base64Image,
            email: user.email,
            firstName: user.firstName,
            secondName: user.secondName,
            tel: user.tel,
            city: user.city
            }

            if(user.role === 'ROLE_MASTER'){
                updateData = {...updateData,
                    description: user.masterInfo.description,
                    businessAddress: user.masterInfo.businessAddress
                }
            }

            const response = user.role === 'ROLE_CLIENT' ? await userApi.updateClientInfo(updateData) : await userApi.updateMasterInfo(updateData);

            if (response.ok) {
                console.log('updated successfully');
                navigate('/home');
            }else {
                const result = response.text();
                setMessage(result);
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
            {isMaster && (
            <div id={styles.masterDiv}>
                <label>Desctiption</label>
                <textarea onChange={onChangeDescription} value={user.masterInfo.description} placeholder="description"></textarea>
                <label>Business address</label>
                <input onChange={onChangeBusinessAddress} value={user.masterInfo.businessAddress} type="text" placeholder="business address"/>
            </div>
            )}
            <label>Username</label>
            <input onChange={onChangeUsername} value={user.username} type="text" placeholder="username"/>
            <label>First name</label>
            <input onChange={onChangeFirstNname} value={user.firstName} type="text" placeholder="first name"/>
            <label>Second name</label>
            <input onChange={onChangeSecondNname}value={user.secondName} type="text" placeholder="second name"/>
            <label>City</label>
            <input onChange={onChangeCity}value={user.city} type="text" placeholder="city"/>
            <label>Email</label>
            <input onChange={onChangeEmail} value={user.email} type='email' placeholder="email"/>
            <label>Phone number</label>
            <input onChange={onChangeTel} value={user.tel} type='tel' placeholder="phone number"/>
            <button onClick={updateUserInfo} type="submit" id={styles.registerButton}>Save changes</button>
            {
                message !== null ? <label id={styles.messageLabel}>{message}</label> : null
            }
        </form>
    )
}

export default EditProfileForm;