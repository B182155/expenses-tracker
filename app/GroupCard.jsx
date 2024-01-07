import React from "react";
import { capitalizeFirstLetter } from "@/app/components/capitalizeFirstLetter";

const GroupCard = ({ group }) => {
  return (
    <div>
      <h1>{capitalizeFirstLetter(group.title)}</h1>

      <p>{group.createdAt.toDateString()}</p>

      <h2>{group.creator.name}</h2>
    </div>
  );
};

export default GroupCard;
