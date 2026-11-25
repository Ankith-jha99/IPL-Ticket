
import { useState, useEffect } from "react";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import MatchCard from "./components/MatchCard";
import { supabase } from "./supabase";

import "./App.css";

function App() {

    const [matches, setMatches] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch matches from Supabase
    async function fetchMatches() {

        console.log("Fetching matches...");

        const { data, error } = await supabase
            .from("matches")
            .select("*")
            .order("id", { ascending: true });

        if (error) {
            console.log("FETCH ERROR:", error);
            alert("Unable to load matches: " + error.message);
        } else {
            console.log("MATCHES:", data);
            setMatches(data || []);
        }

        setLoading(false);
    }

    // Fetch matches and subscribe to realtime changes
    useEffect(() => {

        fetchMatches();

        const channel = supabase
            .channel("matches-changes")
            .on(
                "postgres_changes",
                {
                    event: "*",
                    schema: "public",
                    table: "matches"
                },
                (payload) => {
                    console.log("REALTIME CHANGE:", payload);
                    fetchMatches();
                }
            )
            .subscribe((status) => {
                console.log("REALTIME STATUS:", status);
            });

        return () => {
            supabase.removeChannel(channel);
        };

    }, []);

    // Handle ticket booking
    async function handleBooking(booking) {
        console.log("BOOKING FUNCTION STARTED");
alert("Booking function started");

        console.log("BOOKING FUNCTION CALLED");
        console.log("BOOKING DATA:", booking);

        // Find selected match
        const match = matches.find(
            (m) => String(m.id) === String(booking.matchId)
        );

        if (!match) {
            console.log("MATCH NOT FOUND");
            alert("Match not found");
            return;
        }

        const ticketCount = Number(booking.tickets);

        // Validate tickets
        if (!Number.isInteger(ticketCount) || ticketCount <= 0) {
            alert("Please enter a valid number of tickets");
            return;
        }

        if (ticketCount > Number(match.available_seats)) {
            alert("Not enough seats available");
            return;
        }

        if (!booking.userName || !booking.userName.trim()) {
            alert("Please enter your name");
            return;
        }

        const totalPrice = Number(match.price) * ticketCount;

        console.log("MATCH:", match);
        console.log("TOTAL PRICE:", totalPrice);

        // Insert booking into Supabase
        const { data, error } = await supabase
            .from("bookings")
            .insert({
                match_id: match.id,
                tickets: ticketCount,
                total_price: totalPrice,
                user_name: booking.userName.trim()
            })
            .select();

        console.log("INSERT DATA:", data);
        console.log("INSERT ERROR:", error);

        if (error) {
            console.log("BOOKING FAILED:", error);
            alert("Booking failed: " + error.message);
            return;
        }

        // Update available seats
        const { data: updatedMatch, error: updateError } =
            await supabase
                .from("matches")
                .update({
                    available_seats:
                        Number(match.available_seats) - ticketCount
                })
                .eq("id", match.id)
                .select();

        console.log("UPDATED MATCH:", updatedMatch);
        console.log("UPDATE ERROR:", updateError);

        if (updateError || !updatedMatch || updatedMatch.length === 0) {

            console.log("SEAT UPDATE FAILED:", updateError);

            alert(
                "Booking saved, but seat update failed. Check console."
            );

            await fetchMatches();
            return;
        }

        alert("Booking successful!");

        await fetchMatches();
    }

    return (
        <>
            <Navbar />

            <Hero />

            <div className="matches-section">

                <h1>IPL Upcoming Matches</h1>

                {loading ? (

                    <p>Loading matches...</p>

                ) : matches.length === 0 ? (

                    <p>No matches available.</p>

                ) : (

                    <div className="matches-container">

                        {matches.map((match) => (

                            <MatchCard
                                key={match.id}
                                id={match.id}
                                team1={match.team1}
                                team2={match.team2}
                                date={match.date}
                                venue={match.venue}
                                price={match.price}
                                availableSeats={match.available_seats}
                                onBook={handleBooking}
                            />

                        ))}

                    </div>

                )}

            </div>
        </>
    );
}

export default App;
