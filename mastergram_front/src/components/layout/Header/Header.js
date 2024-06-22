
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styles from './Header.module.css';
import ProfileNav from './profileNav';
import { useContext, useEffect, useRef, useState } from 'react';
import { UserContext } from '../../../layouts/MainLaout';
import MastsersBar from './MastersBar';
import userApi from '../../../services/userApi';

const Header = (user) => {
    const navigate = useNavigate();
    const [navProfileVisible, setNavProfileVisibility] = useState(false);
    const [mastersBarVisible, setMastersBarBisibility] = useState(false);
    const [searchText, setSearchText] = useState('');

    const {isMaster, setIsMaster} = useContext(UserContext);

    const [masters, setMasters] = useState([]);

    const search = async () => {
        if(searchText === null || searchText === undefined || searchText === ''){
            return;
        }
        try {
            const response = await userApi.searchMasters(searchText);
            if (response.ok) {
                const result = await response.json();
                console.log(result);
                setMasters(result);
            
            } else {
                //navigate('/auth/login');
            }
        } catch (error) {
            console.error("Error during rquest:", error);
            navigate('/error');
        }
    }

    const onSearchTextChange = (event) => {
        setSearchText(event.target.value);
        search(event.target.value);
    }

    const cleanSearchText = () => {
        setSearchText('');
    }

    const onSearchFocus = () =>{
        setMastersBarBisibility(true);
    }

    const onOverlayClick = () => {
        setMastersBarBisibility(false);
    }

    const openNavProfile = () => {
        if(navProfileVisible === false){
            setNavProfileVisibility(true)
        }else{
            setNavProfileVisibility(false);
        }
    }

    const enableMaster = () => {
        if(isMaster){
            setIsMaster(false);
        }else{
            setIsMaster(true);
        }
    }

    return(
        <header>
        <Link id={styles.iconLink} to='/home'>
            <div id={styles.iconDiv}>
                <p id={styles.icon}>Mastegram</p>
            </div>
        </Link>
        <div id={styles.searchDiv}>
            <input id={styles.searchInput} onChange={onSearchTextChange} onFocus={onSearchFocus}  value={searchText} type="text" placeholder="Search"/>
        <svg onClick={cleanSearchText} id={styles.cleanSearchButton} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 24C18.5647 24 24 18.5529 24 12C24 5.43529 18.5529 0 11.9882 0C5.43529 0 0 5.43529 0 12C0 18.5529 5.44706 24 12 24ZM7.84706 17.1294C7.31765 17.1294 6.88235 16.6824 6.88235 16.1412C6.88235 15.8824 6.98824 15.6471 7.16471 15.4588L10.6118 12.0118L7.16471 8.56471C6.98824 8.37647 6.88235 8.14118 6.88235 7.88235C6.88235 7.34118 7.31765 6.91765 7.84706 6.91765C8.12941 6.91765 8.35294 7.01177 8.52941 7.2L11.9882 10.6471L15.4824 7.18824C15.6824 6.98824 15.8941 6.89412 16.1529 6.89412C16.6824 6.89412 17.1176 7.32941 17.1176 7.85882C17.1176 8.12941 17.0353 8.34118 16.8353 8.55294L13.3765 12.0118L16.8235 15.4471C17.0118 15.6471 17.1059 15.8706 17.1059 16.1412C17.1059 16.6824 16.6706 17.1294 16.1294 17.1294C15.8588 17.1294 15.6235 17.0118 15.4353 16.8353L11.9882 13.3882L8.56471 16.8353C8.37647 17.0235 8.12941 17.1294 7.84706 17.1294Z" fill="#3C3C43" fill-opacity="0.6"/>
        </svg>
        </div>

        {user.user.role === "ROLE_MASTER" && (
            <div id={styles.toggleDiv}>
            <div  className={styles.switchToggle}>
                    <input onClick={enableMaster} type="checkbox" checked={isMaster} id='toggle'/>
                    <label id={styles.mLabel} htmlFor="toggle"><span>master</span></label>
                </div>
            </div>
        )}
        

        <div id={styles.avatarDiv}>

            {user.user.base64Image && user.user.base64Image.length > 30 ? (
                <img onClick={openNavProfile} id={styles.avatar} src={user.user.base64Image} alt='user'/>
            ) : (
                <img onClick={openNavProfile} id={styles.avatar} src={`${process.env.PUBLIC_URL}/defaultUser.png`} alt="User Avatar" />
            )}
        </div>
        {navProfileVisible && (
            <div id={styles.profileNavDiv}>
            <ProfileNav user={user.user}></ProfileNav>
        </div>
        )}

        {mastersBarVisible && (
            <div>
                <div className={styles.overlay} onClick={onOverlayClick}></div>
                <div id={styles.mastersBarContainer}>
                <MastsersBar searchText = {searchText} masters={masters} onOverlayClick = {onOverlayClick} cleanSearchText = {cleanSearchText}></MastsersBar>
            </div>
            </div>
        )

        }

        

    </header>
    )
}

export default Header;