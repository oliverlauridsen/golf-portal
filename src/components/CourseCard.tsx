import { Star } from "lucide-react";
import placeholderImage from "../assets/courses/placeholder.svg";
import type { Course } from "../types/course";
import CourseActionsMenu from "./CourseActionsMenu";

export type CourseCardData = Omit<Course, "par" | "difficulty"> & {
	par?: Course["par"];
	difficulty?: Course["difficulty"];
};

interface CourseCardProps {
	course: CourseCardData;
	onDelete?: () => void;
}

export default function CourseCard({ course, onDelete }: CourseCardProps) {
	return (
		<article className='group rounded-3xl bg-white p-4 pb-6 shadow-sm transition-shadow duration-200 hover:shadow-lg'>
			<div className='relative overflow-hidden rounded-lg'>
				<img
					className='aspect-[0.85] w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]'
					src={course.imageUrl ?? placeholderImage}
					alt={`${course.name} golf course`}
					onError={(event) => {
						event.currentTarget.src = placeholderImage;
					}}
				/>

				{course.featured && (
					<span className='absolute top-4 left-4 flex items-center gap-1.5 rounded-md bg-white px-3 py-1.5 text-sm font-semibold tracking-wide text-neutral-700 uppercase shadow-sm'>
						<Star aria-hidden='true' size={16} fill='currentColor' />
						Featured
					</span>
				)}
			</div>

			<div className='px-3 pt-5'>
				<div className='flex items-start justify-between gap-3'>
					<p
						className='flex min-w-0 flex-1 text-base text-neutral-400'
						title={
							[course.city, course.country].filter(Boolean).join(", ") ||
							"Location"
						}>
						{course.city && course.country ? (
							<>
								<span className='min-w-0 truncate'>{course.city}</span>
								<span className='shrink-0'>, {course.country}</span>
							</>
						) : (
							<span className='truncate'>
								{course.city || course.country || "Location"}
							</span>
						)}
					</p>
					{onDelete && (
						<CourseActionsMenu
							courseId={course.id}
							courseName={course.name}
							onDelete={onDelete}
						/>
					)}
				</div>

				<h2
					className='mt-2 truncate text-lg font-semibold text-neutral-700'
					title={course.name}>
					{course.name}
				</h2>

				<div className='mt-2 flex items-center gap-3 text-base text-neutral-500'>
					<span>Par {course.par ?? "—"}</span>
					<span aria-hidden='true' className='text-neutral-500'>
						•
					</span>
					<span>Difficulty: {course.difficulty ?? "—"}/5</span>
				</div>
			</div>
		</article>
	);
}
