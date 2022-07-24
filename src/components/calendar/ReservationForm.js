import React, {Fragment, useEffect} from "react";
import useInput from "../../hooks/UseInput";
import Button from "../common/Button";
import {useFetch} from "../../hooks/UseFetch";

import classes from './ReservationForm.module.css';

const isNotEmpty = value => value.trim() !== '';

const ReservationForm = (props) => {
    const {
        value: firstNameValue,
        isValid: firstNameIsValid,
        hasError: firstNameHasError,
        valueChangeHandler: firstNameChangeHandler,
        inputBlurHandler: firstNameBlurHandler,
        reset: resetFirstName
    } = useInput(isNotEmpty);
    const {
        value: lastNameValue,
        isValid: lastNameIsValid,
        hasError: lastNameHasError,
        valueChangeHandler: lastNameChangeHandler,
        inputBlurHandler: lastNameBlurHandler,
        reset: resetLastName
    } = useInput(isNotEmpty);

    const updatedListQuery = `mutation {
          bookReservation(reservationInput:{
            firstName: "${firstNameValue}",
            lastName: "${lastNameValue}",
            date: "${new Date(props.selectedTime).toString()}"}){
                 _id
                firstName
                lastName
                date
                createdAt
                updatedAt
            }
        }`;

    const {data, error, fetchData} = useFetch(updatedListQuery);

    let formIsValid = false;

    if (firstNameIsValid && lastNameIsValid) {
        formIsValid = true;
    }

    const selectedTime = props.selectedTime;
    const enteredFirstName = firstNameValue;
    const enteredLastName = lastNameValue;

    const enteredDate = new Date(selectedTime).toLocaleString('lt-LT', {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    })

    useEffect(() => {

        if (data.data) {
            props.onSuccess({enteredFirstName, enteredLastName, enteredDate, props});

            resetFirstName();
            resetLastName();
        }

    }, [data, error, enteredDate, enteredFirstName, enteredLastName, resetFirstName, resetLastName, props])

    const formSubmissionHandler = event => {
        event.preventDefault();

        if (!formIsValid) {
            return;
        }

        fetchData();
    }

    return (
        <Fragment>
            {error && <p className={classes.errorMessage}>Network error!</p>}
            {data.errors && <p className={classes.errorMessage}>{data.errors[0].message}</p>}
            <form onSubmit={formSubmissionHandler}>
                <div className={classes.controlGroup}>
                    <div className={classes.name}>
                        <label htmlFor='firstName'>First Name:</label>
                        <input
                            type='text'
                            id='firstName'
                            value={firstNameValue}
                            onChange={firstNameChangeHandler}
                            onBlur={firstNameBlurHandler}/>
                        {firstNameHasError && <p className={classes.error}>Please enter first name</p>}
                    </div>
                    <div className={classes.name}>
                        <label htmlFor='lastName'>Last Name:</label>
                        <input
                            type='text'
                            id='lastName'
                            value={lastNameValue}
                            onChange={lastNameChangeHandler}
                            onBlur={lastNameBlurHandler}/>
                        {lastNameHasError && <p className={classes.error}>Please enter last name</p>}
                    </div>
                </div>
                <div className={classes.formActions}>
                    <Button type="submit">Submit</Button>
                </div>
            </form>
        </Fragment>

    )
}

export default ReservationForm;