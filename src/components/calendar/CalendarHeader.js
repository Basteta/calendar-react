import React, {useCallback} from 'react';
import classes from './CalendarHeader.module.css';

const CalendarHeader = (props) => {

    const { onPrevMonthChange, onNextMonthChange } = props;

    const prevMonthHandler = useCallback(event => {
        onPrevMonthChange()
    }, [onPrevMonthChange])

    const nextMonthHandler = useCallback(event => {
        onNextMonthChange()
    }, [onNextMonthChange])

    return (
        <div className={classes.header}>
            <button onClick={prevMonthHandler}>&#8249;</button>
            <div>{props.month} {props.year} </div>
            <button onClick={nextMonthHandler}>&#8250;</button>
        </div>

    )
};

export default CalendarHeader;