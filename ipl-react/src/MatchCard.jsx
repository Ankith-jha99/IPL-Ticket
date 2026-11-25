
import { useState } from "react";

function MatchCard(props) {

    const [showForm, setShowForm] = useState(false);
    const [userName, setUserName] = useState("");
    const [tickets, setTickets] = useState(1);

    function handleSubmit(e) {

        e.preventDefault();

        if (!userName.trim()) {
            alert("Please enter your name");
            return;
        }

        props.onBook({
            matchId: props.id,
            userName: userName.trim(),
            tickets: Number(tickets)
        });
    }

    return (
        <div className="match-card">

            <h2>
                {props.team1} vs {props.team2}
            </h2>

            <p>Date: {props.date}</p>

            <p>Venue: {props.venue}</p>

            <p>Price per ticket: ₹{props.price}</p>

            <p>Available seats: {props.availableSeats}</p>

            <button
                onClick={() => setShowForm(!showForm)}
            >
                {showForm ? "Cancel" : "Book Tickets"}
            </button>

            {showForm && (

                <form onSubmit={handleSubmit}>

                    <input
                        type="text"
                        placeholder="Enter your name"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        required
                    />

                    <input
                        type="number"
                        min="1"
                        max={props.availableSeats}
                        value={tickets}
                        onChange={(e) => setTickets(e.target.value)}
                        required
                    />

                    <p>
                        Total Price: ₹{props.price * Number(tickets)}
                    </p>

                    <button type="submit">
                        Confirm Booking
                    </button>

                </form>

            )}

        </div>
    );
}

export default MatchCard;
