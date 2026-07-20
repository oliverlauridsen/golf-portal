import type {
	Course,
	CreateCourseInput,
	UpdateCourseInput,
} from "../types/course";

export interface CourseService {
	getCourses(): Promise<Course[]>;
	getCourse(id: string): Promise<Course>;
	createCourse(input: CreateCourseInput): Promise<Course>;
	updateCourse(id: string, input: UpdateCourseInput): Promise<Course>;
	deleteCourse(id: string): Promise<void>;
}
