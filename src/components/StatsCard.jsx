import React from "react";

const StatsCard = ({ title, count }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="text-3xl font-bold">{count}</p>
    </div>
  );
};

export default StatsCard;
