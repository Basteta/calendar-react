import React, {useState, useEffect, Fragment} from 'react';
import CalendarHeader from './CalendarHeader';
import CalendarBody from "./CalendarBody";
import {getStartDayOfMonth} from "../../utils/date";

const Calendar = () => {
    const DAYS_NAME = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

    const today = new Date();
    const [date, setDate] = useState(today);
    const [day, setDay] = useState(date.getDate());
    const [month, setMonth] = useState(date.getMonth());
    const [year, setYear] = useState(date.getFullYear());
    const [startDay, setStartDay] = useState(getStartDayOfMonth(date));

    const monthName = date.toLocaleString('default', {month: 'long'});
    const days = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

    useEffect(() => {
        setDay(date.getDate());
        setMonth(date.getMonth());
        setYear(date.getFullYear());
        setStartDay(getStartDayOfMonth(date));
    }, [date]);

    getStartDayOfMonth(date);

    const prevMonthHandler = () => {
        setDate(new Date(year, month - 1, day))
    };

    const nextMonthHandler = () => {
        setDate(new Date(year, month + 1, day))
    };

    return (
        <Fragment>
            <CalendarHeader month={monthName}
                            year={year}
                            onPrevMonthChange={prevMonthHandler}
                            onNextMonthChange={nextMonthHandler}
            />
            <CalendarBody dayNames={DAYS_NAME}
                          monthDays={days}
                          startDay={startDay}
                          day={day}
                          monthNumber={month + 1}
                          year={year}
            />
        </Fragment>
    )
};

export default Calendar;