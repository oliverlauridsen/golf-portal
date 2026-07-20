import { seedCourses } from "../data/seedCourses";
import { sortCourses } from "../utils/sortCourses";
import type { CourseService } from "./courseService.types";

import type {
	Course,
	CreateCourseInput,
	UpdateCourseInput,
} from "../types/course";

const STORAGE_KEY = "courses";
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

function initializeCourses(): Course[] {
	const courses = seedCourses.map((course) => ({ ...course }));
	writeCoursesToLocalStorage(courses);
	return courses;
}

function readCourses(): Course[] {
	const storedCourses = localStorage.getItem(STORAGE_KEY);

	if (!storedCourses) {
		return initializeCourses();
	}

	try {
		const courses: unknown = JSON.parse(storedCourses);

		if (!Array.isArray(courses)) {
			return initializeCourses();
		}

		return courses as Course[];
	} catch {
		return initializeCourses();
	}
}

async function getCourses(): Promise<Course[]> {
	await delay(400);
	return sortCourses(readCourses());
}

async function getCourse(id: string): Promise<Course> {
	await delay(400);

	// TODO: Find the course by id and throw a useful error if it is missing.
	throw new Error(`Reading course ${id} is not implemented yet`);
}

async function createCourse(input: CreateCourseInput): Promise<Course> {
	await delay(400);

	// TODO: Generate the id and timestamps, persist the course, and return it.
	throw new Error(`Creating ${input.name} is not implemented yet`);
}

async function updateCourse(
	id: string,
	input: UpdateCourseInput,
): Promise<Course> {
	await delay(400);

	// TODO: Update featuredAt according to the featured state transition,
	// persist the updated course, and return it.
	throw new Error(`Updating ${input.name} (${id}) is not implemented yet`);
}

async function deleteCourse(id: string): Promise<void> {
	await delay(400);

	// TODO: Add an observable failure path, remove the course, and persist.
	throw new Error(`Deleting course ${id} is not implemented yet`);
}

function writeCoursesToLocalStorage(courses: Course[]): void {
	localStorage.setItem(STORAGE_KEY, JSON.stringify(courses));
}

export const courseService: CourseService = {
	getCourses,
	getCourse,
	createCourse,
	updateCourse,
	deleteCourse,
};
