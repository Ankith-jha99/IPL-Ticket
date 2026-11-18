function MatchCard(props) {
    return (
        <div className="match-card">
            <h2>{props.team1} vs {props.team2}</h2>
            <p>Date: {props.date}</p>
            <p>Venue: {props.venue}</p>
            <button>Book Tickets</button>
        </div>
    );
}

export default MatchCard;