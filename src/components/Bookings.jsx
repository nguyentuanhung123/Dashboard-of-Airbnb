import { format } from "date-fns";
import { useEffect, useState } from "react";

const Bookings = () => {
    const [allBookings, setAllBookings] = useState([])

    const fetchAllBookings = async () => {
        try {
            const response = await fetch('http://localhost:4000/allBookings');
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const data = await response.json();
            // Do something with the data
            setAllBookings(data || []);
        } catch (error) {
            console.error('Error:', error.message);
        }
    };

    useEffect(() => {
        fetchAllBookings();
    }, [])

    return(
        <div className='bg-white px-4 pt-3 pb-4 rounded-sm border border-gray-200 flex-1'>
            <strong className="text-gray-700 font-medium">Renters</strong>
            <div className="mt-3">
                <table className="w-full text-gray-700 border-x border-gray-200 rounded-sm">
                    <thead>
                        <tr>
                            <th>ID Booking</th>
                            <th>ID Place</th>
                            <th>ID Renter</th>
                            <th>Check In</th>
                            <th>Check Out</th>
                            <th>Name</th>
                            <th>Phone</th>
                            <th>Price</th>
                            <th>Profit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            allBookings && allBookings.length && (
                                allBookings.map((booking) => {
                                    return(
                                        <tr key={booking._id}>
                                            <td>{booking._id}</td>
                                            <td>{booking.place}</td>
                                            <td>{booking.user}</td>
                                            <td>{format(new Date(booking.checkIn), 'dd/MM/yyyy')}</td>
                                            <td>{format(new Date(booking.checkOut), 'dd/MM/yyyy')}</td>
                                            <td>{booking.name}</td>
                                            <td>{booking.phone}</td>
                                            <td>{booking.price}</td>
                                            <td>{Math.ceil(0.15 * booking.price)}</td>
                                        </tr>
                                    )
                                })
                            )
                        }
                    </tbody>
                </table>    
            </div>
        </div>
    )
}

export default Bookings