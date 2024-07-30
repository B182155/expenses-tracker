import { IndianRupee } from "lucide-react";
import React from "react";
import DeleteExpenseButton from "./DeleteExpense";
import { capitalizeFirstLetter } from "@/app/components/CapitalizeFirstLetter";

const GetDate_Month = ({ date }) => {
  const Date = date.getDate();
  const monthString = date.toLocaleString("default", {
    month: "long",
  });

  return (
    <div className="flex flex-col rounded-md p-2 w-2/12">
      <h1 className="text-sm  sm:text-base md:text-lg  text-gray-500 dark:text-gray-100">
        {monthString.substring(0, 3)}
      </h1>
      <h2 className="text-base sm:text-lg md:text-xl font-e`xtrabold text-gray-700 dark:text-gray-200 font-mono -mt-1">
        {Date}
      </h2>
    </div>
  );
};

const TriggerAccordion = ({ expense, groupCreated }) => {
  return (
    <div className="flex flex-row justify-between items-center w-full ">
      <div className="flex gap-1 md:gap-3 items-center w-full">
        <GetDate_Month date={expense.date} />
        <div className="flex flex-col justify-start items-start">
          <div className="text-gray-700 dark:text-gray-200">
            <h3 className="text-lg sm:text-xl md:text-2xl font-serif font-medium">
              {capitalizeFirstLetter(expense.description)}
            </h3>
          </div>
          <div className="text-gray-600 dark:text-gray-400 text-left">
            <span className="text-sm sm:text-base md:text-lg lg:text-xl font-sans font-medium">
              {expense?.PaidBy.name} paid{" "}
              <IndianRupee className="inline-block" size="18" />
              <span className="text-sm sm:text-base md:text-lg lg:text-xl font-semibold">
                {expense.amount}
              </span>
            </span>
          </div>
        </div>
      </div>
      {groupCreated && (
        <div className="md:mr-3">
          <DeleteExpenseButton expenseId={expense.id} />
        </div>
      )}
    </div>
  );
};

export default TriggerAccordion;
