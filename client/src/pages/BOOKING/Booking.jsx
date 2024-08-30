import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import "./Booking.css"
import useBooking from '../../custom-hooks/useBooking'

const Booking = () => {
  const { user } = useSelector(state => state.auth)
  const { booking } = useSelector(state => state.booking)
  const { reservation } = useBooking()
 
  const data = booking?.payload?.data
 
const [ inputs, setInputs ] = useState({
  "arrival_date" : "",
  "departure_date" : "",
  "guest_number":""
})

const handleChange =(e) => {
 const { name, value } = e.target
 
const newValue = name === "guest_number" ? Number(value) : value
 setInputs({...inputs, [name] : newValue,username: user.username})
 
}

  const handleSubmit = (e) => {
    reservation(inputs)
  }
  return (
    <main className='booking-main'>
      <section className='booking'>
        <h2>Let's find a Reservation for you </h2>
        <div className="main-reservation">
          <label htmlFor="arrivalDate">Check in Date:</label>
          <input type="date" name="arrival_date" id="arrivalDate" onChange={handleChange} />
        </div>
        <div className="main-reservation">
          <label htmlFor="departureDate">Check out Date:</label>
          <input type="date" name="departure_date" id="departureDate" onChange={handleChange} />
        </div>
        <div className="room">
          <label htmlFor="room">Room</label>
          <select name="guest_number" id="rooms" onChange={handleChange} >
            Rooms for number of Person 
            <option value="1">A1</option>
            <option value="1">A2</option>
            <option value="2">A3</option>
            <option value="2">A4</option>
            <option value="4">A5</option>
            <option value="4">A6</option>
            <option value="6">A7</option>
            </select>
        </div>
        <button onClick={handleSubmit}>Make a reservation</button>
        <button>New reservation</button>
      </section>
      { data && <div className="reservation-status">
        <p>Dear {user.username}, for your request there has been made a reservation for the dates between 
        <span>{new Date(data["arrival_date"]).toLocaleDateString("en-US")}</span>
        <span>{new Date(data["departure_date"]).toLocaleDateString("en-US")}</span>
        for <span>{data.night}</span> night with the total amount of <span>{data.totalPrice}</span>
        </p>
      </div> }
    </main>
  )
}

export default Booking