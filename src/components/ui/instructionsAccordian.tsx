"use client"
import { MealProps } from "@/app/types/types";
import { useState } from "react";

export default function InstructionsAccordian({ meal }: { meal: MealProps }) {
  const [accordianActive, setAccordianActive] = useState(false);
  return (
    <div className="flex flex-col">
      <div
        className="accordianTitle"
        onClick={() => setAccordianActive((prev) => !prev)}
      >
        <h2 className="titleText">Instructions</h2>
        {accordianActive ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-chevron-up"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708z"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-chevron-down"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"
            />
          </svg>
        )}
      </div>
      <div className="mt-2">
        {accordianActive &&
          meal.instructions.map((instructions, index) => {
            return (
              <p key={index}>
                <span className="font-semibold">{index + 1}.</span>{" "}
                {instructions}
              </p>
            );
          })}
      </div>
    </div>
  );
}
