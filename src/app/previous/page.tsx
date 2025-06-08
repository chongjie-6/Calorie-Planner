const PAGE_LIMIT = 5;
import { auth0 } from "@/lib/auth0";
import { redirect } from "next/navigation";
import { MealPlanProps } from "../types/types";
import { fetchAllMealPlan } from "../actions/fetchAllMealPlans";
import AllMealsCards from "@/components/ui/allMealsCard";
import Pagination from "@/components/ui/pagination";

export default async function PreviousMealPlan(props: {
  searchParams?: Promise<{
    page?: string;
  }>;
}) {
  // Check if user is logged in
  const user = await auth0.getSession();

  if (!user) {
    redirect("/auth/login");
  }

  // Fetch all meal plans from Dynamodb
  const response = await fetchAllMealPlan();

  // For pagination, we need the number of pages and total count
  const pageNum = Number((await props.searchParams)?.page) || 1;
  const count = response.Items?.length || 0;

  // Parse as JSON
  const allMealPlans = response.Items?.map((plan) => {
    return {
      date_time: plan.date_time,
      meal: JSON.parse(plan.meal),
    };
  });

  const startIndex = (pageNum - 1) * PAGE_LIMIT;
  const endIndex = startIndex + PAGE_LIMIT;
  const paginatedMealPlans = allMealPlans?.slice(startIndex, endIndex);

  return (
    <div className="page">
      {paginatedMealPlans?.map((plan, index) => (
        <AllMealsCards
          key={index}
          mealPlan={plan.meal as MealPlanProps}
          date_time={new Date(plan.date_time).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        />
      ))}
      <Pagination
        current_page={pageNum}
        total_count={count}
        PAGE_LIMIT={PAGE_LIMIT}
      ></Pagination>
    </div>
  );
}
