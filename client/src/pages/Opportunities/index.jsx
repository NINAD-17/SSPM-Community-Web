import React, { useState } from "react";
import CategoryFilter from "../../components/CategoryFilter";
import OpportunityList from "../../components/OpportunityList";
import OpportunityDetail from "../../components/OpportunityDetail";
import Navbar from "../../components/Navbar";

const Opportunities = () => {
    const [selectedOpportunity, setSelectedOpportunity] = useState(null);
    const [category, setCategory] = useState("All");

    return (
        <>
            <Navbar />
            <div className="flex flex-col min-h-screen mt-20">
                <CategoryFilter setCategory={setCategory} />
                <div className="flex flex-1 justify-center p-4">
                    <div className="flex flex-col md:flex-row max-w-7xl w-full gap-4  rounded-lg shadow-lg">
                        <OpportunityList onSelectOpportunity={setSelectedOpportunity} />
                        <div className="hidden md:block w-full md:w-2/3">
                            <OpportunityDetail opportunity={selectedOpportunity} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Opportunities;
