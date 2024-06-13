
import { useState } from 'react';
import styles from './Calendar.module.css'

const Months = {
    0: 'January',
    1: 'February',
    2: 'March',
    3: 'April',
    4: 'May',
    5: 'June',
    6: 'July',
    7: 'August',
    8: 'September',
    9: 'October',
    10: 'November',
    11: 'December'
}


const Calendar = ({addNewServiceClick, setChosenDate}) => {
    const daysOfWeek = ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС'];
    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June', 
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const [date, setDate] = useState(new Date());
    const [clickedEl, setClickedEl] = useState({
        cliked: false,
        date: null,
        weekNumber: null
    });

    const addMonth = () =>{
        const newDate = new Date(date);
        newDate.setMonth(newDate.getMonth() + 1);
        setDate(newDate);
    }

    const subtractMonth = () => {
        const newDate = new Date(date);
        newDate.setMonth(newDate.getMonth() - 1);
        setDate(newDate);
    }

    const onDayClick = (date, weekNumber) => {
        if (!clickedEl.cliked || clickedEl.date.getTime() !== date.getTime()) {
            setClickedEl({
                cliked: true,
                date: date,
                weekNumber: weekNumber
            });
        } else {
            setClickedEl({
                cliked: false,
                date: null,
                weekNumber: null
            });
        }
    }

    const onAddNewServiceClick = () => {
        setChosenDate(clickedEl.date);
        addNewServiceClick();
    }

    const renderDaysOfWeek = () => {
        return daysOfWeek.map(day => <th key={day}>{day}</th>);
    };

    const getDaysInMonth = (year, month) => {
        return new Date(year, month + 1, 0).getDate();
    };


    const renderCalendarDays = () => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const firstDayOfMonth = new Date(year, month, 1).getDay();
        const daysInMonth = getDaysInMonth(year, month);
        
        const weeks = [];
        let days = [];
        let dayCount = 1;

        for (let i = 0; i < 5; i++) {
            for (let j = 0; j < 7; j++) {
                if ((i === 0 && j < (firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1)) || dayCount > daysInMonth) {
                    days.push(<td key={`${i}-${j}`}></td>);
                } else {
                    const currentDay = dayCount;
                    days.push(
                        <td key={`${i}-${j}`} onClick={() => onDayClick(new Date(year, month, currentDay), i)}>
                            {dayCount}
                            {
                            //Math.random() > 0.5 && <div>5 services</div>
                            } {/* Для демонстрации */}
                        </td>
                    );
                    dayCount++;
                }
            }
            weeks.push(<tr key={i}>{days}</tr>);
            days = [];
            if(i === clickedEl.weekNumber){
                weeks.push(
                <div id={styles.openConteiner}>
                    <div id={styles.opneDate}>
                        {clickedEl.date.getDate()} {Months[clickedEl.date.getMonth()]}
                    </div>
                    <div id={styles.serviceContainer}>
                        
                        <div id={styles.addButton} onClick={onAddNewServiceClick}><span>add+</span></div>
                    </div>

                </div>
                    );
            }
            
        }
        return weeks;
    };

    return (
        <div className={styles.calendar}>
            <div className={styles.calendarHeader}>
                <button onClick={subtractMonth}>
                    <svg width="30" height="30" viewBox="0 0 31 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11.9596 19.7954L27.0749 9.21463C27.6051 8.84348 28.3337 9.2228 28.3337 9.87002V30.1303C28.3337 30.7775 27.6051 31.1568 27.0749 30.7857L11.9596 20.205C11.8174 20.1054 11.8174 19.8949 11.9596 19.7954Z" fill="#33363F"/>
                    </svg>
                </button>
                <h2>{monthNames[date.getMonth()]} {date.getFullYear()}</h2>
                <button onClick={addMonth}>
                    <svg width="30" height="30" viewBox="0 0 31 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M31.2198 19.7766L9.49143 8.91238C8.95951 8.64642 8.33366 9.03322 8.33366 9.62792V30.3724C8.33366 30.9671 8.95951 31.3539 9.49143 31.0879L31.2198 20.2238C31.404 20.1316 31.404 19.8687 31.2198 19.7766Z" fill="#33363F"/>
                    </svg>
                </button>
            </div>
            <table className={styles.calendarTable}>
                <thead>
                    <tr>
                        {renderDaysOfWeek()}
                    </tr>
                </thead>
                <tbody>
                    {renderCalendarDays()}
                </tbody>
            </table>
        </div>
    );
};

export default Calendar;