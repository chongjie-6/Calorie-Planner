"use client";
import { MealPlanProps } from "@/app/types/types";
import { Modal } from "./modal";
import { useRef } from "react";

export default function AllMealsCards({
  mealPlan,
  date_time,
  index,
}: {
  mealPlan: MealPlanProps | undefined;
  date_time: string | undefined;
  index: number;
}) {
  const modalRef = useRef<HTMLDialogElement>(null);

  const handleModalOpen = () => {
    modalRef.current?.close();
    document.body.style.overflow = "hidden";
    modalRef.current?.showModal();
  };

  return (
    <>
      <Modal
        modalRef={modalRef}
        mealPlan={mealPlan}
      ></Modal>
      <div
        className="flex flex-col max-w-3xl w-full mt-2 animate-fade-in cursor-pointer"
        style={{
          animationDelay: `${index * 350}ms`,
        }}
        onClick={() => handleModalOpen()}
      >
        <div className="accordianTitle bg-cyan-700 rounded-b-none border-none">
          <h2 className="titleText px-2">{date_time}</h2>
          <p>{mealPlan?.total_calories} kcal</p>
        </div>
        <div className="bg-zinc-600">
          {mealPlan?.meals.map((meal, index) => (
            <p
              className="px-3 text-sm text-gray-900 last:rounded-b-md last:pb-2"
              key={index}
            >
              {meal.meal_name}
            </p>
          ))}
        </div>
      </div>
    </>
  );
}
