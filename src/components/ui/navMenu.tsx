import Link from "next/link";

export default function NavMenu() {
  return (
    <>
      <Link
        className="nav_btns absolute max-w-sm max-h-52 hover:bg-violet-500"
        href={"/generate"}
      >
        Generate Meal Plan
      </Link>
      <div className="grid grid-cols-2 max-w-4xl gap-10 mx-auto w-full max-h-1/2 h-full text-balance">
        <Link className="nav_btns hover:bg-sky-500" href={"/current"}>
          Current Meal Plan
        </Link>
        <Link className="nav_btns hover:bg-rose-500" href={"/previous"}>
          Previous Meal Plans
        </Link>
        <Link className="nav_btns hover:bg-lime-500" href={"/recipes"}>
          Recipes
        </Link>
        <Link className="nav_btns hover:bg-amber-500" href={"/settings"}>
          Change Macros / Settings
        </Link>
      </div>
    </>
  );
}
