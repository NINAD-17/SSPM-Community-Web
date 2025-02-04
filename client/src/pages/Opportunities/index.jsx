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
      <div className="flex flex-col h-screen mt-20">
        <CategoryFilter setCategory={setCategory} />
        <div className="flex flex-1 justify-center p-4 sm:p-6 md:p-8 lg:p-10">
          <div className="flex max-w-7xl w-full gap-4 bg-white rounded-lg shadow-lg">
            <OpportunityList onSelectOpportunity={setSelectedOpportunity} />
            <OpportunityDetail opportunity={selectedOpportunity} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Opportunities;
