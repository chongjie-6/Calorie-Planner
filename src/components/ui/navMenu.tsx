import Link from "next/link";

export default function NavMenu() {
  return (
    <>
      <div className="grid grid-cols-2 max-w-4xl gap-10 mx-auto w-full max-h-1/2 h-full text-balance">
        <Link className="nav_btns hover:bg-violet-500" href={"/generate"}>
          Generate Meal Plan
        </Link>
        <Link className="nav_btns hover:bg-sky-500" href={"/current"}>
          Current Meal Plan
        </Link>
        <Link className="nav_btns hover:bg-rose-500" href={"/previous?page=1"}>
          Previous Meal Plans
        </Link>
        <Link className="nav_btns hover:bg-amber-500" href={"/settings"}>
          Change Macros / Settings
        </Link>
      </div>
    </>
  );
}
