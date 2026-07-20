import type {
	Course,
	CreateCourseInput,
	UpdateCourseInput,
} from "../types/course";

interface CourseService {
	getCourses(): Promise<Course[]>;
	getCourse(id: string): Promise<Course>;
	createCourse(input: CreateCourseInput): Promise<Course>;
	updateCourse(id: string, input: UpdateCourseInput): Promise<Course>;
	deleteCourse(id: string): Promise<void>;
}
const STORAGE_KEY = "courses";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

async function getCourses(): Promise<Course[]> {
	await delay(400);

	// TODO: Read STORAGE_KEY from localStorage. If it is empty, initialize it
	// with seedCourses. Return courses in the required featured ordering.
	throw new Error(`Reading ${STORAGE_KEY} is not implemented yet`);
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

export const courseService: CourseService = {
	getCourses,
	getCourse,
	createCourse,
	updateCourse,
	deleteCourse,
};
