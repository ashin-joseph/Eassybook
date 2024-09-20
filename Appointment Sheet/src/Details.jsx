import React, { useState, useEffect } from 'react';
import axios from "axios";

function Details() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        city: "",
        topic: "",
        calendar: "", // selected date
        duration: 45,
        timeslot: ""  // selected timeslot
    });

    // Set min and max dates for the calendar
    const setDate = () => {
        const today = new Date();
        const minDate = today.toISOString().split("T")[0]; // Today's date
    
        const maxDate = new Date();
        maxDate.setDate(today.getDate() + 7); // 7 days from today
    
        const maxDateFormatted = maxDate.toISOString().split("T")[0]; // Format for HTML input
    
        return { minDate, maxDateFormatted };
    };

    const { minDate, maxDateFormatted } = setDate();  // Get min and max dates

    const [availability, setAvailability] = useState([]);  // Store time slots for the selected date

    // Function to generate available slots for a selected date
    const availableSlots = (selectedDate) => {
        let today = new Date();
        let selectedDay = new Date(selectedDate);
        let timeslots = [];

        let startTime = new Date(selectedDay);
        let endTime = new Date(selectedDay);

        // If the selected date is today
        if (selectedDay.toDateString() === today.toDateString()) {
            startTime.setHours(today.getHours() + 1, 0, 0, 0); // Start 1 hour from now
            endTime.setHours(21, 0, 0, 0); // End at midnight
        } else {
            startTime.setHours(8, 0, 0, 0); // Start at 8 AM
            endTime.setHours(21, 0, 0, 0); // End at midnight
        }

        while (startTime < endTime) {
            let formattedTime = startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

            timeslots.push({
                datetime: new Date(startTime),
                time: formattedTime
            });

            startTime.setMinutes(startTime.getMinutes() + 60);  // 30-minute intervals
        }

        setAvailability(timeslots);
    };

    // Trigger slot regeneration when calendar (selected date) changes
    useEffect(() => {
        if (formData.calendar) {
            availableSlots(formData.calendar);  // Generate new slots for the selected date
        }
    }, [formData.calendar]);

    const handleSlotSelection = (slot) => {
        setFormData({
            ...formData,
            timeslot: slot  // Store selected timeslot in form data
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Post the form data to the server
        axios.post("http://127.0.0.1:8000/api/bookings/", formData)
            .then(response => {
                alert("Booking successful!");
            })
            .catch(error => {
                console.error("Error posting data:", error);
                alert("There was an error with your booking.");
            });
    };

    return (
        <div className="container d-flex flex-wrap mb-5" style={{ backgroundColor: "#f5f8fa" }}>
            <h3>Details</h3>
            <div className="col-12">
                <form onSubmit={handleSubmit}>
                    <div className="row mb-2">
                        <div className="col-4">
                            <label htmlFor="Name" className="form-label ms-2">Name</label>
                            <input
                                type="text"
                                className="form-control brd"
                                id="Name"
                                placeholder="Name"
                                name="name"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                required
                            />
                        </div>
                        <div className="col-4">
                            <label htmlFor="Email" className="form-label ms-2">Email address</label>
                            <input
                                type="email"
                                className="form-control brd"
                                id="Email"
                                placeholder="Email"
                                name="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                required
                            />
                        </div>
                        <div className="col-4">
                            <label htmlFor="Phone" className="form-label ms-2">Phone</label>
                            <input
                                type="tel"
                                className="form-control brd"
                                id="Phone"
                                placeholder="Phone"
                                name="phone"
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                required
                            />
                        </div>
                    </div>
                    <div className="row mb-2">
                        <div className="col-3">
                            <label htmlFor="City" className="form-label ms-2">City</label>
                            <input
                                type="text"
                                className="form-control brd"
                                id="City"
                                placeholder="City"
                                name="city"
                                value={formData.city}
                                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                                required
                            />
                        </div>
                        <div className="col-3">
                            <label htmlFor="Topic" className="form-label ms-2">Topic</label>
                            <input
                                type="text"
                                className="form-control brd"
                                id="Topic"
                                placeholder="Topic"
                                name="topic"
                                value={formData.topic}
                                onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                                required
                            />
                        </div>
                        <div className="col-3">
                            <label htmlFor="calendar" className="form-label ms-2">Calendar</label>
                            <input
                                type="date"
                                className="form-control brd"
                                id="calendar"
                                name="calendar"
                                value={formData.calendar}
                                min={minDate}  // Set minimum date
                                max={maxDateFormatted}  // Set maximum date
                                onChange={(e) => setFormData({ ...formData, calendar: e.target.value })}
                                required
                            />
                        </div>
                        {/* Display selected timeslot */}
                        <div className="col-3">
                            <label htmlFor="timeslot" className="form-label ms-2 m-1"></label>
                            <input
                                type="text"
                                className="form-control mt-2"
                                id="timeslot"
                                name="timeslot"
                                value={formData.timeslot}
                                style={{'backgroundColor':' rgb(245, 248, 250)', 'border': 'none'}}
                                readOnly
                                required
                            />
                        </div>
                    </div>

                    <h3>Time Slot</h3>
                    <div className="row mb-2  px-5">
                        <div className="col-12  px-5">
                            <table className="table table-borderless">
                                <tbody>
                                    <tr >
                                        {availability && availability.length > 0 && (
                                            availability.map((slot, index) => (
                                                <button
                                                    type="button"
                                                    key={index}
                                                    className={formData.timeslot === slot.time ? "col-2 btn btn-cal my-2 mx-2" : "col-2 btn btn-cal my-2 mx-2"}
                                                    onClick={() => handleSlotSelection(slot.time)}
                                                >
                                                    {slot.time}
                                                </button>
                                            ))
                                        )}
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>


                    <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                        <button className="btn btn-success me-md-2 px-5" type="submit">Reserve</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Details;
