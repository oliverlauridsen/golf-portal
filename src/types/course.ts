export interface Course {
	id: string;
	name: string;
	country: string;
	par: number;
	difficulty: 1 | 2 | 3 | 4 | 5;
	featured: boolean;
	featuredAt?: number;
	imageUrl?: string;
	createdAt: number;
}

export type CreateCourseInput = Omit<Course, "id" | "createdAt" | "featuredAt">;
export type UpdateCourseInput = CreateCourseInput;
