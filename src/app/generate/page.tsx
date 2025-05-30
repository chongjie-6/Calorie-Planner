import GenerateButton from "@/components/ui/generateButton";
import { auth0 } from "@/lib/auth0";
import { redirect } from "next/navigation";

export default async function Generate() {
  // Check if user is logged in
  const user = await auth0.getSession();

  if (!user) {
    redirect("/auth/login");
  }

  return (
    <div className="page">
      <GenerateButton></GenerateButton>
    </div>
  );
}
