
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import MatchCard from "./components/MatchCard";
import "./App.css";

function App() {

    const matches = [
        {
            id: 1,
            team1: "RCB",
            team2: "CSK",
            date: "20 April 2026",
            venue: "Bengaluru"
        },
        {
            id: 2,
            team1: "MI",
            team2: "KKR",
            date: "22 April 2026",
            venue: "Mumbai"
        },
        {
            id: 3,
            team1: "SRH",
            team2: "RR",
            date: "25 April 2026",
            venue: "Hyderabad"
        }
    ];

    return (
        <>
            <Navbar />

            <Hero />

            <div className="matches-section">
                <h1>IPL Upcoming Matches</h1>

                <div className="matches-container">
                    {matches.map((match) => (
                        <MatchCard
                            key={match.id}
                            team1={match.team1}
                            team2={match.team2}
                            date={match.date}
                            venue={match.venue}
                        />
                    ))}
                </div>
            </div>
        </>
    );
}

export default App;
