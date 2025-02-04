import React from "react";

const OpportunityListItem = ({ opportunity, onSelectOpportunity }) => {
  return (
    <div
      className="p-4 border-b border-gray-300 cursor-pointer hover:bg-gray-100"
      onClick={() => onSelectOpportunity(opportunity)}
    >
      <h3 className="text-lg font-bold">{opportunity.title}</h3>
      <p className="text-sm text-gray-600">
        {opportunity.description.substring(0, 100)}...
      </p>
      <p className="text-sm text-gray-600">
        Posted by: {opportunity.postedBy.name}
      </p>
    </div>
  );
};

export default OpportunityListItem;
