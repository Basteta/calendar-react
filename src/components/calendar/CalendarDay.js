import React, {useCallback, useEffect, Fragment} from 'react';
import Button from "../common/Button";
import {useFetch} from "../../hooks/UseFetch";
import classes from './CalendarDay.module.css';

const CalendarDay = (props) => {
    const reservationList = `{
            reservations(date: "${props.year} ${props.month} ${props.day}") {
                _id
                date
                reserved
                expired
            }
        }`;
    const {data, error, fetching, fetchData} = useFetch(reservationList);

    useEffect(() => {
        fetchData();
    }, [fetchData])

    const formHandler = useCallback((date) => {
        const selectedTime = date.date;
        props.onClick(selectedTime);
    }, [props]);

    let content;

    if (fetching) {
        content = <p className={classes.tempContent}>Loading...</p>;
    }

    if (error) {
        content = <p>Error!</p>
    }

    if (!fetching && !error) {
        content = data.data.reservations.map((date) =>
            <li key={date.date}>
                <div className={classes.date}>
                    {new Date(date.date).toLocaleString('lt-LT', {
                        year: 'numeric',
                        month: 'numeric',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                    })}
                </div>
                <div className={classes.action}>
                    <Button
                        className={date.expired ? `${classes.expired}` : date.reserved ? `${classes.reserved}` : 'select'}
                        onClick={() => formHandler(date)}>
                        {date.expired ? 'expired' : date.reserved ? 'reserved' : 'select'}
                    </Button>
                </div>
            </li>
        )
    }
    return (
        <Fragment>{content}</Fragment>
    );
};

export default CalendarDay;