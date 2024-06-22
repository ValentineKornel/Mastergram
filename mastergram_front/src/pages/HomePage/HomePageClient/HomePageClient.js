import { useContext, useEffect, useState } from 'react';
import styles from './HomePageClient.module.css'
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../../layouts/MainLaout';
import bookingApi from '../../../services/bookingApi';


const HomePageClient = () => {

    const navigate = useNavigate();
    const {user} = useContext(UserContext);
    const [bookings, setBookings] = useState([]);

    const getBookings = async () => {
        try{
            const response = await bookingApi.getMyBookingsClient();
            if (response.ok) {
                const result = await response.json();
                console.log(result);
                setBookings(result);
            }
        }catch(error){
            console.log(error);
        }
    }

    useEffect(() => {
        getBookings();
    }, [])

    const onMasterClick = (id) => {
        navigate(`/master/${id}`);
    }

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

            {bookings.map(b => (
                        <div class={styles.booking}>
                        <span style={{left: '3%'}}>{b.date}</span>
                        <span style={{left: '17%'}}>{b.time}</span>
                        <span style={{left: '30%'}}>{b.service}</span>
                        <span style={{left: '48%'}}>{b.location}</span>
                        <img onClick={() => onMasterClick(b.masterId)} style={{borderRadius: '40px', cursor:'pointer'}} src={`data:image/jpeg;base64,${b.masterProfileImage}`} height="40" width="40"/>
                        <span style={{left: '77%'}}>{b.masterName}</span>
                        <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="15" cy="15" r="1.25" stroke="#33363F" stroke-width="2" stroke-linecap="round"/>
                            <circle cx="7.5" cy="15" r="1.25" stroke="#33363F" stroke-width="2" stroke-linecap="round"/>
                            <circle cx="22.5" cy="15" r="1.25" stroke="#33363F" stroke-width="2" stroke-linecap="round"/>
                        </svg>
                    </div>
                        ))
            }

        </div>
    </main>
    )
}

export default HomePageClient;