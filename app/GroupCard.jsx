import React from "react";

const GroupCard = ({ group }) => {
  return (
    <div>
      <p>{group.createdAt.toDateString()}</p>
      <h1>{group.title}</h1>
      <h1>{group.creator.name}</h1>
    </div>
  );
};

export default GroupCard;
