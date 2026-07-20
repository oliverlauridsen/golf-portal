import { useCallback, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AppHeader from "../components/AppHeader";
import CourseCard from "../components/CourseCard";
import DeleteCourseDialog from "../components/DeleteCourseDialog";
import Toast from "../components/Toast";
import { useCourses } from "../hooks/useCourses";
import { useDeleteCourse } from "../hooks/useDeleteCourse";
import type { Course } from "../types/course";

export default function CoursesPage() {
	const location = useLocation();
	const navigate = useNavigate();
	const { data: courses, isPending, isError, error } = useCourses();
	const deleteCourse = useDeleteCourse();
	const [courseToDelete, setCourseToDelete] = useState<Course | null>(null);
	const routeSuccessMessage = (
		location.state as { successMessage?: string } | null
	)?.successMessage;
	const [successMessage, setSuccessMessage] = useState(routeSuccessMessage);
	const dismissSuccessToast = useCallback(() => setSuccessMessage(undefined), []);

	useEffect(() => {
		if (!routeSuccessMessage) return;

		navigate(location.pathname, { replace: true, state: null });
	}, [location.pathname, navigate, routeSuccessMessage]);

	function openDeleteDialog(course: Course) {
		deleteCourse.reset();
		setSuccessMessage(undefined);
		setCourseToDelete(course);
	}

	function confirmDelete() {
		if (!courseToDelete) return;

		deleteCourse.mutate(courseToDelete.id, {
			onSuccess: () => setSuccessMessage("Course deleted successfully."),
		});
		setCourseToDelete(null);
	}

	return (
		<div className='min-h-screen bg-neutral-100'>
			<AppHeader />

			<section className='bg-white px-6 py-7 sm:px-8 lg:px-12'>
				<div className='mx-auto max-w-7xl'>
					<h1 className='text-2xl font-semibold text-neutral-800'>Courses</h1>
					<p className='mt-1 text-sm text-neutral-600'>
						Browse and add golf courses
					</p>
				</div>
			</section>

			<main className='px-6 py-9 sm:px-8 lg:px-12'>
				<div className='mx-auto max-w-7xl'>
					<div className='mb-8 flex justify-end'>
						<Link
							to='/new'
							className='rounded-md bg-trackman-orange px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-trackman-orange/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-trackman-orange'>
							Create a course
						</Link>
					</div>

					{isPending && <p>Loading courses…</p>}

					{isError && (
						<p role='alert' className='text-red-700'>
							{error.message}
						</p>
					)}

					{courses?.length === 0 && <p>No courses found.</p>}

					{courses && courses.length > 0 && (
						<ul className='grid list-none grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
							{courses.map((course) => (
								<li key={course.id}>
									<CourseCard
										course={course}
										onDelete={() => openDeleteDialog(course)}
									/>
								</li>
							))}
						</ul>
					)}
				</div>
			</main>

			{courseToDelete && (
				<DeleteCourseDialog
					courseName={courseToDelete.name}
					isDeleting={deleteCourse.isPending}
					errorMessage={deleteCourse.error?.message}
					onCancel={() => setCourseToDelete(null)}
					onConfirm={confirmDelete}
				/>
			)}

			{deleteCourse.isError && (
				<Toast
					variant='error'
					message={deleteCourse.error.message}
					autoDismissMs={6000}
					onDismiss={() => deleteCourse.reset()}
				/>
			)}

			{successMessage && (
				<Toast
					variant='success'
					message={successMessage}
					autoDismissMs={4000}
					onDismiss={dismissSuccessToast}
				/>
			)}
		</div>
	);
}
