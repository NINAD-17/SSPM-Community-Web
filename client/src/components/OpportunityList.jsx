import React, { useState, useEffect } from "react";
import OpportunityListItem from "./OpportunityListItem";

const OpportunityList = ({ onSelectOpportunity }) => {
    const [opportunities, setOpportunities] = useState([]);

    useEffect(() => {
        // Demo data
        const demoOpportunities = [
            {
                _id: 1,
                title: "Software Engineer Intern",
                description: "Work on exciting projects...",
                postedBy: { name: "John Doe" },
            },
            {
                _id: 2,
                title: "Hackathon",
                description: "Participate in our annual hackathon...",
                postedBy: { name: "Jane Smith" },
            },
            {
                _id: 3,
                title: "Workshop on AI",
                description: "Join our workshop on Artificial Intelligence...",
                postedBy: { name: "Alice Johnson" },
            },
            {
                _id: 1,
                title: "Software Engineer Intern",
                description: "Work on exciting projects...",
                postedBy: { name: "John Doe" },
            },
            {
                _id: 2,
                title: "Hackathon",
                description: "Participate in our annual hackathon...",
                postedBy: { name: "Jane Smith" },
            },
            {
                _id: 3,
                title: "Workshop on AI",
                description: "Join our workshop on Artificial Intelligence...",
                postedBy: { name: "Alice Johnson" },
            },
            {
                _id: 1,
                title: "Software Engineer Intern",
                description: "Work on exciting projects...",
                postedBy: { name: "John Doe" },
            },
            {
                _id: 2,
                title: "Hackathon",
                description: "Participate in our annual hackathon...",
                postedBy: { name: "Jane Smith" },
            },
            {
                _id: 3,
                title: "Workshop on AI",
                description: "Join our workshop on Artificial Intelligence...",
                postedBy: { name: "Alice Johnson" },
            },
        ];
        setOpportunities(demoOpportunities);
    }, []);

    return (
        <div className="w-full md:w-1/3 max-h-[calc(100vh-12rem)] overflow-y-auto border-r border-gray-300">
            {opportunities.map((opportunity) => (
                <OpportunityListItem
                    key={opportunity._id}
                    opportunity={opportunity}
                    onSelectOpportunity={onSelectOpportunity}
                />
            ))}
        </div>
    );
};

export default OpportunityList;
