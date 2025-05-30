import NavMenu from "@/components/ui/navMenu";
export default function Dashboard() {
  return (
    <div className="page">
      <a href="/auth/login">Login</a>
      <a href="/auth/logout">Logout</a>
      <NavMenu></NavMenu>
    </div>
  );
}
