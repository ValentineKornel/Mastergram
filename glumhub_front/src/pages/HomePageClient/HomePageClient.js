import { useContext, useEffect, useState } from 'react';
import styles from './HomePageClient.module.css'
import userApi from '../../services/userApi';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../layouts/MainLaout';


const HomePageClient = () => {

    const navigate = useNavigate();
    const {user} = useContext(UserContext);

    return(
        <main>
        <h1 id={styles.title}>Upcoming Bookings for {user.firstName}</h1>

        <div id={styles.bookings}>
            <div id={styles.bookingsTitle}>
                <span style={{left: '3%'}}>Date:</span>
                <span style={{left: '17%'}}>Time:</span>
                <span style={{left: '30%'}}>Service:</span>
                <span style={{left: '48%'}}>Location:</span>
                <span style={{left: '73%'}}>Master:</span>
            </div>

            <div class={styles.booking}>
                <span style={{left: '3%'}}>oo month 2024</span>
                <span style={{left: '17%'}}>00:00</span>
                <span style={{left: '30%'}}>Some service</span>
                <span style={{left: '48%'}}>Minsk Lenina str.0</span>
                <img style={{borderRadius: '40px'}} src={user.base64Image} height="40" width="40"/>
                <span style={{left: '77%'}}>Fname Sname</span>
                <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="15" cy="15" r="1.25" stroke="#33363F" stroke-width="2" stroke-linecap="round"/>
                    <circle cx="7.5" cy="15" r="1.25" stroke="#33363F" stroke-width="2" stroke-linecap="round"/>
                    <circle cx="22.5" cy="15" r="1.25" stroke="#33363F" stroke-width="2" stroke-linecap="round"/>
                </svg>
            </div>
        </div>
    </main>
    )
}

export default HomePageClient;