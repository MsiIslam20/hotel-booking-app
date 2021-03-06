import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../App';

const Bookings = () => {
    const [bookings, setBookings] = useState([]);
    const [loggedInUser , setLoggedInUser] = useContext(UserContext);

    useEffect(() => {
        fetch(`https://hotel-booking-app-61229.web.app/bookings?email=${loggedInUser.email}`, {
            headers: { 
                'Content-Type': 'application/json',
                authorization: `Bearer ${sessionStorage.getItem('token')}`
            }
        })
        .then(res => res.json())
        .then(data =>{
            setBookings(data)
        })
    }, [])
  
    return (
        <div>
            <h2>You Have {bookings.length} Bookings!!!</h2>
            {
                bookings.map(book => <li key={book._id}>{book.name} from: {new Date(book.checkIn).toDateString('dd/MM/yyyy')} to: {new Date(book.checkOut).toDateString('dd/MM/yyyy')}</li>)
            }
        </div>
    );
};

export default Bookings;