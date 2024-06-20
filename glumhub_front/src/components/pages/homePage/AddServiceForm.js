import styles from './AddServiceForm.module.css'
import { Link, redirect, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import authApi from "../../../services/authApi";
import userApi from "../../../services/userApi";
import { UserContext } from "../../../layouts/MainLaout";
import bookingApi from '../../../services/bookingApi';

const TimeTables = {
    DONTREPEAT: 'dontRepeat',
    DAILY: 'daily',
    WEEKLY: 'weekly'
}

const AddServiceForm = ({onBackClick, date}) => {

    const navigate = useNavigate();
    const [message, setMessage] = useState();

    const [service, setService] = useState({
        service: null,
        date: formatDate(date),
        time: '09:00',
        repeat: TimeTables.DONTREPEAT,
        comment: null
    })

    function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');//padStart добавляет ведущий ноль, если месяц < 10
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
    }

    const onChangeService = (event) => {
        setService({...service, service:event.target.value});
        console.log(service.date);
    }

    const onChangeTime = (event) => {
        setService({...service, time:event.target.value});
    }

    const handleOptionChange = (event) => {
        setService({...service, repeat: event.target.value});
    };

    const onChangeComment = (event) => {
        setService({...service, comment:event.target.value});
    }


    const addNewService = async (event) => {
        event.preventDefault();
        try {
        
            const response = await bookingApi.createBooking(service);

            if (response.ok) {
                console.log('created successfully');
                onBackClick();
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
        <form id={styles.newServiceForm}>
            <h3>Add new service</h3>
            <button onClick={onBackClick} id={styles.backButton}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 12L3.29289 11.2929L2.58579 12L3.29289 12.7071L4 12ZM19 13C19.5523 13 20 12.5523 20 12C20 11.4477 19.5523 11 19 11V13ZM9.29289 5.29289L3.29289 11.2929L4.70711 12.7071L10.7071 6.70711L9.29289 5.29289ZM3.29289 12.7071L9.29289 18.7071L10.7071 17.2929L4.70711 11.2929L3.29289 12.7071ZM4 13H19V11H4V13Z" fill="#33363F"/>
                </svg>
            </button>
            <label>Service</label>
            <input onChange={onChangeService} type="text" placeholder="service"/>
            <label>Time</label>
            <input onChange={onChangeTime} type="time" value={service.time}/>
            
            <div id={styles.radioDiv}>
                <label style={{fontWeight:'bold'}}>Repeat</label><br/>

                <input style={{marginTop:'10px'}} type="radio" id="dontRepeat" name="repeat" value="dontRepeat" 
                checked={service.repeat === TimeTables.DONTREPEAT} onChange={handleOptionChange}/>
                <label htmlFor="dontRepeat">dont repeat</label>

                <input type="radio" id="daily" name="repeat" value="daily" 
                checked={service.repeat === TimeTables.DAILY} onChange={handleOptionChange}/>
                <label htmlFor="daily">every day</label>

                <input type="radio" id="weekly" name="repeat" value="weekly" 
                checked={service.repeat === TimeTables.WEEKLY} onChange={handleOptionChange}/>
                <label htmlFor="weekly">every week</label>
            </div>

            <label>Comment</label>
            <textarea placeholder="not requred"></textarea>

            <button onClick={addNewService} type="submit" id={styles.addButton}>Add</button>
            {
                message !== null ? <label id={styles.messageLabel}>{message}</label> : null
            }
        </form>
    )
}

export default AddServiceForm;