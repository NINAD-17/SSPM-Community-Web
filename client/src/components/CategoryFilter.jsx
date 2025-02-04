import React, { useState } from "react";

const categories = [
  "All",
  "Job",
  "Internship",
  "Competition",
  "Program",
  "Event",
  "Workshop",
];

const CategoryFilter = ({ setCategory }) => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setCategory(category);
  };

  return (
    <div className="w-full p-4 flex overflow-x-auto bg-gray-100 ">
      {categories.map((category) => (
        <button
          key={category}
          className={`p-2 m-2 ${
            selectedCategory === category
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-800"
          } rounded-full`}
          onClick={() => handleCategoryClick(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
