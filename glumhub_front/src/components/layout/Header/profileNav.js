import { Link, useNavigate } from 'react-router-dom';
import styles from './profileNav.module.css'

const ProfileNav = (user) => {

    const navigete = useNavigate();

    const editProfileNavigate = () => {
        navigete('/editProfile');
    }

    const logOutNavigate = () => {
        navigete('/auth/login');
    }

    return(
        <div id={styles.nav}>

            {user.user.base64Image && user.user.base64Image.length > 30 ? (
                <img id={styles.avatar} src={user.user.base64Image} alt='user'/>
            ) : (
                <img id={styles.avatar} src={`${process.env.PUBLIC_URL}/defaultUser.png`} alt='user'/>
            )}
            <div id={styles.name}>Fname Sname</div>
            <div onClick={editProfileNavigate} className={styles.buttonClass}>Edit profile</div>
            <div className={styles.buttonClass}>Settings</div>
            <div onClick={logOutNavigate} className={styles.buttonClass}>Log Out</div>
        </div>
    )
}

export default ProfileNav;