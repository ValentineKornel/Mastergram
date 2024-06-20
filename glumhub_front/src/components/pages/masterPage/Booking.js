import { useEffect, useState } from 'react';
import styles from './Booking.module.css'
import bookingApi from '../../../services/bookingApi';
import { useNavigate } from 'react-router-dom';

const Booking = ({id, setSelectedNav}) => {

    const [booking, setBooking] = useState({});
    const navigate = useNavigate();

    const getBookingInfo = async () => {
        try{
            const response = await bookingApi.getBookingInfo(id);
            if (response.ok) {
                const result = await response.json();
                setBooking(result);
            }
        }catch(error){
            console.log(error);
        }
    }

    useEffect(() => {
        getBookingInfo();
    }, [])

    const onCancelClick = () => {
        setSelectedNav('service');
    }

    const onConfirmClick = async () => {
        try{
            const response = await bookingApi.bookBooking(id);
            if (response.ok) {
                const result = await response.text();
                console.log(result);
                navigate('/home');
            }
        }catch(error){
            console.log(error);
        }
    }

    return (

        <div id={styles.bookingContainer}>
            <h3>Confirm your booking</h3>
            <div id={styles.infoDiv}>
                <div id={styles.labelsContainer}>
                    <span>Date:</span>
                    <span>Time:</span>
                    <span>Master:</span>
                    <span>Location:</span>
                    <span>Service:</span>
                    <button onClick={onCancelClick} id={styles.cancelButton}>cancel</button>
                </div>
                <div id={styles.valuesContaner}>
                    <span>{booking.date}</span>
                    <span>{booking.time}</span>
                    <span>{booking.master}</span>
                    <span>{booking.location}</span>
                    <span>{booking.service}</span>
                    <button onClick={onConfirmClick} id={styles.confirmButton}>confirm</button>
                </div>
            </div>
        </div>
    );
}

export default Booking;