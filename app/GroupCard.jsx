import React from "react";

const GroupCard = ({ group }) => {
  return (
    <div>
      <h1>{group.title}</h1>

      <p>{group.createdAt.toDateString()}</p>

      <h2>{group.creator.name}</h2>
    </div>
  );
};

export default GroupCard;
