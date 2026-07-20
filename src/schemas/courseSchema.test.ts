import { describe, expect, it } from "vitest";

import { courseSchema } from "./courseSchema";

const validCourse = {
	id: "course-1",
	name: "Pebble Beach Golf Links",
	description: "A renowned coastal golf course.",
	city: "California",
	country: "United States",
	par: 72,
	difficulty: 4,
	featured: true,
	featuredAt: 1000,
	createdAt: 1000,
};

describe("courseSchema", () => {
	it("accepts a valid course and rejects an invalid difficulty", () => {
		expect(courseSchema.safeParse(validCourse).success).toBe(true);

		const invalidCourse = {
			...validCourse,
			difficulty: 6,
		};

		expect(courseSchema.safeParse(invalidCourse).success).toBe(false);
	});
});
