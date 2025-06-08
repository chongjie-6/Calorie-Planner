
import { auth0 } from "@/lib/auth0";
import RequirementForm from "../../components/ui/requirementForm";
import { redirect } from "next/navigation";

export default async function Settings() {
  // Check if user is logged in 
  const user = await auth0.getSession(); 

  if (!user) {
    redirect("/auth/login")
  }

  return (
    <div className="page min-h-screen">
      <RequirementForm></RequirementForm>
    </div>
  );
}
