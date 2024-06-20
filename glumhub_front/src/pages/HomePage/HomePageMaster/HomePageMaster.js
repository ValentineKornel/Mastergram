import { useContext, useEffect, useState } from 'react';
import styles from './HomePageMaster.module.css'
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../../layouts/MainLaout';
import AddServiceForm from '../../../components/pages/homePage/AddServiceForm';
import CalendarMaster from '../../../components/pages/homePage/CalendarMaster';
import bookingApi from '../../../services/bookingApi';


const HomePageMaster = () => {

    const navigate = useNavigate();
    const {user} = useContext(UserContext);
    const [bookingsPresentation, setBookingsPresentation] = useState('list');
    const [chosenDate, setChosenDate] = useState();
    const [bookings, setBookings] = useState([]);

    const getBookings = async () => {
        try{
            const response = await bookingApi.getMyBookingsMaster();
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

    const onListClick = () => {
        setBookingsPresentation('list');
    }
    const onCalendarClick = () => {
        setBookingsPresentation('calendar');
    }

    const onAddServiceClick = () => {
        setBookingsPresentation('newService')
        console.log(chosenDate);
    }

    return(
        <main>
        <h1 id={styles.title}>Upcoming Services for {user.firstName}</h1>
        <div id={styles.navDiv}>
            <button onClick={onListClick}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="4" y="5" width="16" height="5" rx="1" stroke="#222222" stroke-linejoin="round"/>
                    <rect x="4" y="14" width="16" height="5" rx="1" stroke="#222222" stroke-linejoin="round"/>
                </svg>
                <span>list</span>
            </button>
            <button onClick={onCalendarClick}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="3" y="6" width="18" height="15" rx="2" stroke="#222222"/>
                    <path d="M3 10C3 8.11438 3 7.17157 3.58579 6.58579C4.17157 6 5.11438 6 7 6H17C18.8856 6 19.8284 6 20.4142 6.58579C21 7.17157 21 8.11438 21 10H3Z" fill="#222222"/>
                    <path d="M7 3L7 6" stroke="#222222" stroke-linecap="round"/>
                    <path d="M17 3L17 6" stroke="#222222" stroke-linecap="round"/>
                    <rect x="7" y="12" width="4" height="2" rx="0.5" fill="#222222"/>
                    <rect x="7" y="16" width="4" height="2" rx="0.5" fill="#222222"/>
                    <rect x="13" y="12" width="4" height="2" rx="0.5" fill="#222222"/>
                    <rect x="13" y="16" width="4" height="2" rx="0.5" fill="#222222"/>
                </svg>
                <span>calendar</span>
            </button>
        </div>
        

        {bookingsPresentation === 'list' && (
            <div id={styles.bookings}>
            <div id={styles.bookingsTitle}>
                <span style={{left: '3%'}}>Date:</span>
                <span style={{left: '17%'}}>Time:</span>
                <span style={{left: '30%'}}>Service:</span>
                <span style={{left: '48%'}}>Location:</span>
                <span style={{left: '73%'}}>Client:</span>
            </div>

            {bookings.map(b => (
                        <div class={styles.booking}>
                        <span style={{left: '3%'}}>{b.date}</span>
                        <span style={{left: '17%'}}>{b.time}</span>
                        <span style={{left: '30%'}}>{b.service}</span>
                        <span style={{left: '48%'}}>{b.location}</span>
                        <img style={{borderRadius: '40px', cursor:'pointer'}} src={`data:image/jpeg;base64,${b.clientProfileImage}`} height="40" width="40"/>
                        <span style={{left: '77%'}}>{b.clientName}</span>
                        <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="15" cy="15" r="1.25" stroke="#33363F" stroke-width="2" stroke-linecap="round"/>
                            <circle cx="7.5" cy="15" r="1.25" stroke="#33363F" stroke-width="2" stroke-linecap="round"/>
                            <circle cx="22.5" cy="15" r="1.25" stroke="#33363F" stroke-width="2" stroke-linecap="round"/>
                        </svg>
                    </div>
                        ))
            }
        </div>
        )}
        {bookingsPresentation === 'calendar' && (
            <div id={styles.bookings}>
                <CalendarMaster addNewServiceClick = {onAddServiceClick} setChosenDate = {setChosenDate}/>

            </div>
        )}
        {bookingsPresentation === 'newService' && (
            <AddServiceForm onBackClick={onCalendarClick} date={chosenDate}/>
        )}
    </main>
    )
}

export default HomePageMaster;