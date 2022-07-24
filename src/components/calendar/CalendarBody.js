import React, {Fragment, useState} from 'react';
import Modal from '../common/Modal';
import ReservationForm from "./ReservationForm";
import CalendarDay from "./CalendarDay";

import classes from './CalendarBody.module.css';

const CalendarBody = (props) => {
    const [isModal, setIsModal] = useState(false);
    const [isFormModal, setIsFormModal] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [selectedDay, setSelectedDay] = useState('');
    const [selectedTime, setSelectedTime] = useState('');
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;
    const [enteredData, setEnteredData] = useState([]);

    const allDays = props.dayNames;
    const dayItems = allDays.map((day) =>
        <li key={day}>{day}</li>
    );

    const modalHandler = (event) => {
        setIsModal(true);
        setSelectedDay(parseInt(event.target.innerText), 10);
    };

    const fullMonth = Array(props.monthDays + (props.startDay - 1))
        .fill(null)
        .map((_, index) => {
            const days = index - (props.startDay - 2);
            const todayClasses = `${(days === props.day && currentYear === props.year && currentMonth === props.monthNumber) ? classes.today : ''}`;
            const expiredClasses = `${(currentYear === props.year && currentMonth > props.monthNumber) || (currentYear > props.year) ? classes.expired : ''}`;
            const upcomingClasses = `${((currentYear === props.year && currentMonth < props.monthNumber) || (currentYear < props.year)) ? classes.coming : ''}`;

            return (
                <li
                    key={index}
                    className={`${todayClasses} ${expiredClasses} ${upcomingClasses}`}
                    onClick={modalHandler}
                >
                    {days > 0 ? days : ''}
                </li>
            );
        })

    const closeHandler = () => {
        setIsModal(false);
        setIsFormModal(false);
        setIsSuccess(false);
        setSelectedDay('');
        setSelectedTime('');
        setEnteredData([]);
    };

    const returnHandler = () => {
        setIsFormModal(false);
        setIsModal(true);
    };

    const calendarDayClickHandler = (selectedTime) => {
        setIsModal(false);
        setIsFormModal(true);
        setSelectedTime(selectedTime);
    }

    const successHandler = (enteredData) => {
        setIsFormModal(false);
        setIsSuccess(true);
        setEnteredData(enteredData);
    }

    const modalContent = <Fragment>
        <ul className={classes.modalContent}>
            <CalendarDay
                year={props.year}
                month={props.monthNumber}
                day={selectedDay}
                currentDay={props.day}
                onClose={closeHandler}
                onClick={calendarDayClickHandler}
            />
        </ul>
    </Fragment>;

    const formModalContent =
        <Fragment>
            <ReservationForm selectedTime={selectedTime} onSuccess={successHandler}/>
        </Fragment>

    const formModalTitle =
        <Fragment>
            <button className={classes.close} onClick={returnHandler}>
                &#8249;
            </button>
            <div className={classes.modalHeaderDate}>
                <div>{new Date(selectedTime).toLocaleString('lt-LT', {
                    year: 'numeric',
                    month: 'numeric',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                })}</div>
            </div>
        </Fragment>

    const successModalContent =
        <Fragment>
            <div className={classes.modalContent}>
                <div className={classes.line}>
                    <span className={classes.title}>Name:</span>
                    <span className={classes.red}>{enteredData.enteredFirstName}</span>
                </div>
                <div className={classes.line}>
                    <span className={classes.title}>Last name:</span>
                    <span className={classes.red}>{enteredData.enteredLastName}</span>
                </div>
                <div className={classes.line}>
                    <span className={classes.title}>Reservation date:</span>
                    <span className={classes.red}>{enteredData.enteredDate}</span>
                </div>
            </div>
        </Fragment>

    return (
        <Fragment>
            {isModal && (
                <Modal title='Select reservation time' onClose={closeHandler}>
                    {modalContent}
                </Modal>
            )}
            {isFormModal && (
                <Modal title={formModalTitle} onClose={closeHandler}>
                    {formModalContent}
                </Modal>
            )}
            {isSuccess && (
                <Modal title='Reservation succeeded' onClose={closeHandler}>
                    {successModalContent}
                </Modal>
            )}
            <ul className={classes.dayNames}>{dayItems}</ul>
            <ul className={classes.calendarBody}>{fullMonth}</ul>
        </Fragment>
    )
};

export default CalendarBody;