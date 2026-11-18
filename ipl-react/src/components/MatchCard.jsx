
import { useState } from "react";

function MatchCard(props) {

    const [booked, setBooked] = useState(false);

    return (
        <div className="match-card">
            <h2>{props.team1} vs {props.team2}</h2>

            <p>Date: {props.date}</p>

            <p>Venue: {props.venue}</p>

            <button onClick={() => setBooked(!booked)}>
                {booked ? "Ticket Selected!" : "Book Tickets"}
            </button>
        </div>
    );
}

export default MatchCard;
