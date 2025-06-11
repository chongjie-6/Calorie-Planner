"use client";
import React, { RefObject } from "react";
import { MealPlanProps } from "@/app/types/types";
import MealPlan from "./mealPlan";

export function Modal({
  modalRef,
  mealPlan,
}: {
  modalRef: RefObject<HTMLDialogElement | null>;
  mealPlan: MealPlanProps | undefined;
}) {
  const checkClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    if (!modalRef.current) {
      return;
    }
    // Check if mouse click was outside the modal
    const dialogDimensions = modalRef.current?.getBoundingClientRect();
    if (
      e.clientX < dialogDimensions.left ||
      e.clientX > dialogDimensions.right ||
      e.clientY > dialogDimensions?.bottom ||
      e.clientY < dialogDimensions?.top
    ) {
      closeModal();
    }
  };
  const closeModal = () => {
    if (!modalRef.current) {
      return;
    }
    modalRef.current.scrollTo(0, 0);
    modalRef.current.close();
    document.body.style.overflow = "";
  };

  return (
    <dialog
      ref={modalRef}
      data-modal
      id="modal"
      onClick={(e) => {
        checkClick(e);
      }}
      className="modal_container sm:animate-fade-in overflow-y-auto animate-fade-in-and-up"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        fill="currentColor"
        className="bi bi-x-lg fixed z-50 top-3 right-3 text-gray-400 hover:bg-blue-500 transition-colors duration-200 p-1 rounded-full cursor-pointer"
        viewBox="0 0 16 16"
        onClick={() => closeModal()}
        aria-label="Close Button"
      >
        <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
      </svg>
      <div className="flex justify-center">
        <MealPlan mealPlan={mealPlan}></MealPlan>
      </div>
    </dialog>
  );
}
