import React, { useContext, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import 'date-fns';
import { UserContext } from '../../App';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { Button } from '@material-ui/core';
import Bookings from '../Bookings/Bookings';

const Book = () => {
    const {bedType} = useParams();
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);

    const [selectedDate, setSelectedDate] = useState({
        checkIn : new Date(),
        checkOut : new Date(),
    });
    const handleCheckIn = (date) => {
        const newDates = {...selectedDate};
        newDates.checkIn = date;
        setSelectedDate(newDates);
    };

    const handleCheckOut = (date) => {
        const newDates = {...selectedDate};
        newDates.checkOut = date;
        setSelectedDate(newDates);
    };

    const handleBooking = () => {
        const newBookings = {...loggedInUser, ...selectedDate};
        fetch("http://localhost:4000/addBooking", {
            method: "POST",
            headers: {'Content-type' : 'application/json'},
            body: JSON.stringify(newBookings)
        })
        .then(res => res.json())
        .then(data => {
            if(data){
                console.log(data);
            }
        })
    }

    return (
        <div style={{textAlign: 'center'}}>
            <h1>Hello, {loggedInUser.name}! Let's book a {bedType} Room.</h1>
            <p>Want a <Link to="/home">Different room?</Link> </p>

            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid container justify="space-around">
                    <KeyboardDatePicker
                    disableToolbar
                    variant="inline"
                    format="dd/MM/yyyy"
                    margin="normal"
                    id="date-picker-inline"
                    label="Date picker inline"
                    value={selectedDate.checkIn}
                    onChange={handleCheckIn}
                    KeyboardButtonProps={{
                        'aria-label': 'change date',
                    }}
                    />
                    <KeyboardDatePicker
                    margin="normal"
                    id="date-picker-dialog"
                    label="Date picker dialog"
                    format="dd/MM/yyyy"
                    value={selectedDate.checkOut}
                    onChange={handleCheckOut}
                    KeyboardButtonProps={{
                        'aria-label': 'change date',
                    }}
                    />
                </Grid>
                <Button onClick={handleBooking} variant="contained" color="primary">
                    Book Now
                </Button>
            </MuiPickersUtilsProvider>
            <Bookings />
        </div>
    );
};

export default Book;