import Link from "next/link";
import { useMemo } from "react";
export default function Pagination({
  current_page,
  total_count,
  PAGE_LIMIT,
}: {
  current_page: number;
  total_count: number;
  PAGE_LIMIT: number;
}) {
  const total_pages = useMemo(
    () => Math.ceil(total_count / PAGE_LIMIT),
    [total_count, PAGE_LIMIT]
  );

  return (
    <div className="inline-flex space-x-5">
      {Array.from({ length: total_pages }, (_, i) => (
        <Link
          className={`${i + 1 === current_page && `font-bold`}`}
          key={i}
          href={`/previous?page=${i + 1}`}
        >
          {i + 1}
        </Link>
      ))}
    </div>
  );
}
