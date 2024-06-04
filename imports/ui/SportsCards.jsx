import React, { useState, useEffect } from 'react';

const SportsCard = ({ sportDetails }) => {
    return (
        <div className="p-4 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">{sportDetails.sportName}</h5>
            <p>Coach: {sportDetails.coachName}</p>
            <p>Venue: {sportDetails.venue}</p>
            <p>Slots available: {sportDetails.slots}</p>
            <button className="mt-4 w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Book Now
            </button>
        </div>
    );
};

export default function SportsCards({ selectedDate }) {
    const [sportsData, setSportsData] = useState([]);

    useEffect(() => {
        // Simulate fetching data based on the selected date
        setSportsData([
            { id: 1, sportName: 'Football', coachName: 'John Doe', venue: 'Stadium A', slots: 12 },
            { id: 2, sportName: 'Tennis', coachName: 'Jane Doe', venue: 'Court 3', slots: 4 },
            // More sports
        ]);
    }, [selectedDate]);

    return (
        <div className="grid grid-cols-3 gap-4">
            {sportsData.map(sport => (
                <SportsCard key={sport.id} sportDetails={sport} />
            ))}
        </div>
    );
}
