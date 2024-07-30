import { capitalizeFirstLetter } from "@/app/components/CapitalizeFirstLetter";
import { IndianRupee } from "lucide-react";
import React from "react";

const ContentAccordion = ({ expense, SplittedArrayMap }) => {
  return (
    <>
      <h1 className="text-gray-700 font-serif font-semibold text-base sm:text-lg md:text-xl lg:text-2xl dark:text-slate-300">
        <span>{capitalizeFirstLetter(expense.description)}</span>
        {"  "}
        <span className="text-sm sm:text-base md:text-lg lg:text-xl text-purple-600 dark:text-purple-400">
          {" "}
          <IndianRupee className="inline-block" size="20" /> {expense.amount}{" "}
        </span>
      </h1>
      <div className="flex gap-2 items-center w-8/12">
        <h2 className="text-sm sm:text-base md:text-lg lg:text-xl font-serif font-semibold text-gray-600 dark:text-slate-300">
          {expense.date.toDateString()}
        </h2>
      </div>
      <div className="mt-1">
        <div className="flex flex-col">
          <span>
            <span className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold font-serif">
              {expense?.PaidBy.name}
            </span>{" "}
            paid <IndianRupee className="inline-block" size="20" />
            {expense.amount}
          </span>

          {expense.splits.map((split) => (
            <p
              className="ml-2 border-l-2 text-xs sm:text-sm md:text-base lg:text-lg border-purple-600 dark:border-purple-400  "
              key={split.id}
            >
              <span className="text-purple-700 dark:text-purple-400 ">
                {"--->"}
              </span>
              <span>
                <span className="font-extralight font-sans">
                  {SplittedArrayMap?.get(split.friendId)}
                </span>
                {split.amountOwed < 0 ? (
                  <span>
                    {" "}
                    Lent <IndianRupee className="inline-block" size="18" />{" "}
                    {Math.abs(split.amountOwed)}{" "}
                  </span>
                ) : (
                  <span>
                    {" "}
                    Owe <IndianRupee className="inline-block" size="18" />{" "}
                    {split.amountOwed}{" "}
                  </span>
                )}
              </span>
            </p>
          ))}
        </div>
      </div>
    </>
  );
};

export default ContentAccordion;
