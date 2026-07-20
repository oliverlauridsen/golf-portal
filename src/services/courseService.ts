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
const failedDeleteAttempts = new Set<string>();

function initializeCourses(): Course[] {
	const courses = [...seedCourses];
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
	const course = readCourses().find((course) => course.id === id);

	if (!course) {
		throw new Error(`Course with id "${id}" was not found`);
	}

	return course;
}

async function createCourse(input: CreateCourseInput): Promise<Course> {
	await delay(400);
	const courses = readCourses();
	const now = Date.now();
	const course: Course = {
		...input,
		id: crypto.randomUUID(),
		createdAt: now,
		featuredAt: input.featured ? now : undefined,
	};

	writeCoursesToLocalStorage([...courses, course]);
	return course;
}

async function updateCourse(
	id: string,
	input: UpdateCourseInput,
): Promise<Course> {
	await delay(400);
	const courses = readCourses();
	const courseIndex = courses.findIndex((course) => course.id === id);

	if (courseIndex === -1) {
		throw new Error(`Course with id "${id}" was not found`);
	}

	const existingCourse = courses[courseIndex];
	const updatedCourse: Course = {
		...existingCourse,
		...input,
		featuredAt: input.featured
			? existingCourse.featured
				? existingCourse.featuredAt
				: Date.now()
			: undefined,
	};
	const updatedCourses = [...courses];
	updatedCourses[courseIndex] = updatedCourse;

	writeCoursesToLocalStorage(updatedCourses);
	return updatedCourse;
}

async function deleteCourse(id: string): Promise<void> {
	await delay(400);
	const courses = readCourses();
	const course = courses.find((course) => course.id === id);

	if (!course) {
		throw new Error(`Course with id "${id}" was not found`);
	}

	if (course.name === "Hidden Canyon" && !failedDeleteAttempts.has(id)) {
		failedDeleteAttempts.add(id);
		throw new Error("Simulated failure: please try deleting the course again");
	}

	writeCoursesToLocalStorage(courses.filter((course) => course.id !== id));
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
