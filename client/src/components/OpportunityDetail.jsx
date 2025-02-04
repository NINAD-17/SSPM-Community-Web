import React from "react";

const OpportunityDetail = ({ opportunity }) => {
  if (!opportunity) {
    return (
      <div className="w-2/3 p-4">Select an opportunity to see details</div>
    );
  }

  return (
    <div className="w-2/3 p-4">
      <h2 className="text-2xl font-bold">{opportunity.title}</h2>
      <p className="text-sm text-gray-600">
        Posted by: {opportunity.postedBy.name}
      </p>
      <p className="text-lg mt-4">{opportunity.description}</p>
      {opportunity.applicationLink && (
        <a
          href={opportunity.applicationLink}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500"
        >
          Visit
        </a>
      )}
      <div className="flex flex-wrap mt-4">
        {opportunity.tags?.map((tag, index) => (
          <span
            key={index}
            className="bg-blue-200 text-blue-800 rounded-full px-3 py-1 m-1"
          >
            {tag}
          </span>
        ))}
      </div>
      <p className="text-sm text-gray-600 mt-4">
        Last date: {new Date(opportunity.date).toLocaleDateString()}
      </p>
    </div>
  );
};

export default OpportunityDetail;
