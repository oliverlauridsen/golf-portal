import type { Course } from "../types/course";

export function sortCourses(courses: Course[]): Course[] {
	return [...courses].sort((a, b) => {
		if (a.featured && b.featured) {
			return (a.featuredAt ?? 0) - (b.featuredAt ?? 0);
		}

		if (a.featured) return -1;
		if (b.featured) return 1;

		return b.createdAt - a.createdAt;
	});
}
