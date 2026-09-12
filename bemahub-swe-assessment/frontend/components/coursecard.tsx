import { Course } from "@/lib/types/api";
import { formatMoney, formatNullableNumber } from "@/lib/format";

const courseImages: Record<number, string> = {
  1: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=900&q=80",
  2: "https://images.unsplash.com/photo-1586444248902-2f64eddc13df?auto=format&fit=crop&w=900&q=80",
  3: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=900&q=80",
  4: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=900&q=80",
};

export function CourseCard({ course }: { course: Course }) {
  const image = courseImages[course.id];

  return (
    <article className="group overflow-hidden rounded-2xl border border-border bg-surface shadow-sm transition hover:shadow-md">
      {/* Hero Image */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-accent-soft">
        {image && (
          <img
            src={image}
            alt={course.title}
            className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.02]"
          />
        )}

        {/* Wishlist */}
        <button
          type="button"
          aria-label="Add to wishlist"
          className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-surface text-text-secondary shadow-sm transition hover:text-accent"
        >
          <svg
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.293l1.318-.975a4.5 4.5 0 116.364 6.364L12 21 4.318 13.318a4.5 4.5 0 010-6.364z"
            />
          </svg>
        </button>
      </div>

      {/* Card Content */}
      <div className="p-4 sm:p-5">
        <h3 className="line-clamp-2 min-h-[48px] text-base font-semibold leading-6 text-text-primary">
          {course.title}
        </h3>

        {/* Rating & Enrolments */}
        <div className="mt-4 flex items-center justify-between text-xs">
          <div className="flex items-center gap-1 font-semibold text-text-primary">
            <span className="text-amber-500">★</span>
            <span>{formatNullableNumber(course.averageRating)}</span>
            <span className="font-normal text-text-muted">
              ({formatNullableNumber(course.enrolmentCount)})
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-accent-soft text-[10px] font-bold text-accent">
              {course.instructorName.charAt(0)}
            </div>

            <span className="font-medium text-text-secondary">
              {course.instructorName}
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-4 flex items-center justify-between border-t border-border pt-3">
          <span className="text-base font-bold text-text-primary">
            {formatMoney(course.priceMinor, course.currency)}
          </span>

          <button
            type="button"
            className="flex items-center gap-1 text-xs font-semibold text-accent transition-colors hover:text-accent-hover"
          >
            <span>Enroll Now</span>

            <svg
              className="h-3.5 w-3.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
              />
            </svg>
          </button>
        </div>
      </div>
    </article>
  );
}