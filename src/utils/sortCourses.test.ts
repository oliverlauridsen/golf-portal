import { describe, expect, it } from "vitest";

import type { Course } from "../types/course";
import { sortCourses } from "./sortCourses";

function createCourse(overrides: Partial<Course> & Pick<Course, "id">): Course {
	const { id, ...courseOverrides } = overrides;

	return {
		id,
		name: id,
		description: "Course description",
		city: "Copenhagen",
		country: "Denmark",
		par: 72,
		difficulty: 3,
		featured: false,
		createdAt: 0,
		...courseOverrides,
	};
}

describe("sortCourses", () => {
	it("places featured courses first, then sorts regular courses by newest", () => {
		const courses = [
			createCourse({ id: "older-course", createdAt: 100 }),
			createCourse({
				id: "newer-featured-course",
				featured: true,
				featuredAt: 300,
			}),
			createCourse({ id: "newer-course", createdAt: 400 }),
			createCourse({
				id: "older-featured-course",
				featured: true,
				featuredAt: 200,
			}),
		];

		const sortedCourses = sortCourses(courses);

		expect(sortedCourses.map((course) => course.id)).toEqual([
			"older-featured-course",
			"newer-featured-course",
			"newer-course",
			"older-course",
		]);
	});

	it("does not change the original array", () => {
		const courses = [
			createCourse({ id: "older-course", createdAt: 100 }),
			createCourse({ id: "newer-course", createdAt: 200 }),
		];

		sortCourses(courses);

		expect(courses.map((course) => course.id)).toEqual([
			"older-course",
			"newer-course",
		]);
	});
});
